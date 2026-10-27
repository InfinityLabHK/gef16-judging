-- 閃耀之星第十六屆初選平台 · 資料庫結構及權限（Supabase / PostgreSQL）
-- 在 Supabase 專案的 SQL Editor 執行一次。不含任何學生資料、密碼或密鑰。
-- 權限原則：所有讀寫由列級權限（RLS）在資料庫強制，前端程式不能繞過。

create extension if not exists pgcrypto;

-- ---------- 資料表 ----------
create table if not exists public.profiles (
  user_id      uuid primary key references auth.users(id) on delete cascade,
  username     text unique not null,
  display_name text not null,
  role         text not null check (role in ('judge','admin')),
  weight       numeric not null default 1 check (weight >= 0 and weight <= 10),
  active       boolean not null default true,
  created_at   timestamptz not null default now()
);

create table if not exists public.students (
  id    text primary key,
  data  jsonb not null
);

create table if not exists public.student_photos (
  id     text primary key references public.students(id) on delete cascade,
  photo  text
);

create table if not exists public.meta (
  key   text primary key,
  value jsonb not null
);

create table if not exists public.decisions (
  user_id     uuid not null references public.profiles(user_id) on delete cascade,
  student_id  text not null references public.students(id) on delete cascade,
  tier        text check (tier in ('A','B','C')),
  reasons     text[] not null default '{}',
  override    jsonb not null default '{}'::jsonb,
  note        text not null default '',
  updated_at  timestamptz not null default now(),
  primary key (user_id, student_id)
);

create table if not exists public.judge_state (
  user_id        uuid primary key references public.profiles(user_id) on delete cascade,
  priority_order text[] not null default '{}',
  calibration    jsonb not null default '{}'::jsonb,
  seen           jsonb not null default '{}'::jsonb,
  prefs          jsonb not null default '{}'::jsonb,
  updated_at     timestamptz not null default now()
);

create table if not exists public.committee (
  student_id  text primary key references public.students(id) on delete cascade,
  decision    text check (decision in ('入圍','後備','不入圍')),
  note        text not null default '',
  updated_by  uuid references public.profiles(user_id),
  updated_at  timestamptz not null default now()
);

create table if not exists public.settings (
  id      int primary key default 1 check (id = 1),
  locked  boolean not null default false,
  method_note text not null default '',
  updated_at timestamptz not null default now()
);
insert into public.settings (id) values (1) on conflict do nothing;

create table if not exists public.audit_log (
  id          bigserial primary key,
  user_id     uuid,
  action      text not null,
  student_id  text,
  detail      jsonb,
  at          timestamptz not null default now()
);

-- ---------- 輔助函數（security definer：只讀自己的角色，不外洩資料） ----------
create or replace function public.is_active_user() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.active);
$$;

create or replace function public.is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.profiles p where p.user_id = auth.uid() and p.active and p.role = 'admin');
$$;

create or replace function public.is_locked() returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce((select locked from public.settings where id = 1), false);
$$;

-- 自動更新時間
create or replace function public.touch_updated_at() returns trigger
language plpgsql as $$ begin new.updated_at := now(); return new; end $$;

drop trigger if exists trg_dec_touch on public.decisions;
create trigger trg_dec_touch before insert or update on public.decisions for each row execute function public.touch_updated_at();
drop trigger if exists trg_state_touch on public.judge_state;
create trigger trg_state_touch before insert or update on public.judge_state for each row execute function public.touch_updated_at();
drop trigger if exists trg_com_touch on public.committee;
create trigger trg_com_touch before insert or update on public.committee for each row execute function public.touch_updated_at();

-- 操作紀錄（評審分層、委員會決定、權重、鎖定）
create or replace function public.log_change() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.audit_log (user_id, action, student_id, detail)
  values (
    auth.uid(),
    tg_table_name || ':' || lower(tg_op),
    case tg_op when 'DELETE' then to_jsonb(old)->>'student_id' else to_jsonb(new)->>'student_id' end,
    case tg_op when 'DELETE' then to_jsonb(old) else to_jsonb(new) end
  );
  return coalesce(new, old);
end $$;

drop trigger if exists trg_dec_log on public.decisions;
create trigger trg_dec_log after insert or update or delete on public.decisions for each row execute function public.log_change();
drop trigger if exists trg_com_log on public.committee;
create trigger trg_com_log after insert or update or delete on public.committee for each row execute function public.log_change();
drop trigger if exists trg_prof_log on public.profiles;
create trigger trg_prof_log after update on public.profiles for each row execute function public.log_change();
drop trigger if exists trg_set_log on public.settings;
create trigger trg_set_log after update on public.settings for each row execute function public.log_change();

-- 管理員只可改權重、顯示名稱、啟用狀態；不可改角色、帳號（防止誤操作提升權限）
create or replace function public.guard_profile_update() returns trigger
language plpgsql as $$
begin
  if new.role is distinct from old.role or new.username is distinct from old.username or new.user_id is distinct from old.user_id then
    raise exception '角色及帳號名稱不可在網站上更改';
  end if;
  return new;
end $$;
drop trigger if exists trg_prof_guard on public.profiles;
create trigger trg_prof_guard before update on public.profiles for each row execute function public.guard_profile_update();

-- ---------- 列級權限 ----------
alter table public.profiles    enable row level security;
alter table public.students    enable row level security;
alter table public.meta        enable row level security;
alter table public.student_photos enable row level security;
alter table public.decisions   enable row level security;
alter table public.judge_state enable row level security;
alter table public.committee   enable row level security;
alter table public.settings    enable row level security;
alter table public.audit_log   enable row level security;

drop policy if exists p_profiles_select on public.profiles;
create policy p_profiles_select on public.profiles for select to authenticated
  using (user_id = auth.uid() or public.is_admin());
drop policy if exists p_profiles_admin_update on public.profiles;
create policy p_profiles_admin_update on public.profiles for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists p_students_select on public.students;
create policy p_students_select on public.students for select to authenticated using (public.is_active_user());

drop policy if exists p_photos_select on public.student_photos;
create policy p_photos_select on public.student_photos for select to authenticated using (public.is_active_user());

drop policy if exists p_meta_select on public.meta;
create policy p_meta_select on public.meta for select to authenticated using (public.is_active_user());

drop policy if exists p_dec_select on public.decisions;
create policy p_dec_select on public.decisions for select to authenticated
  using ((user_id = auth.uid() and public.is_active_user()) or public.is_admin());
drop policy if exists p_dec_insert on public.decisions;
create policy p_dec_insert on public.decisions for insert to authenticated
  with check (user_id = auth.uid() and public.is_active_user() and not public.is_locked());
drop policy if exists p_dec_update on public.decisions;
create policy p_dec_update on public.decisions for update to authenticated
  using (user_id = auth.uid() and public.is_active_user() and not public.is_locked())
  with check (user_id = auth.uid());
drop policy if exists p_dec_delete on public.decisions;
create policy p_dec_delete on public.decisions for delete to authenticated
  using (user_id = auth.uid() and public.is_active_user() and not public.is_locked());

drop policy if exists p_state_select on public.judge_state;
create policy p_state_select on public.judge_state for select to authenticated
  using ((user_id = auth.uid() and public.is_active_user()) or public.is_admin());
drop policy if exists p_state_insert on public.judge_state;
create policy p_state_insert on public.judge_state for insert to authenticated
  with check (user_id = auth.uid() and public.is_active_user());
drop policy if exists p_state_update on public.judge_state;
create policy p_state_update on public.judge_state for update to authenticated
  using (user_id = auth.uid() and public.is_active_user()) with check (user_id = auth.uid());

drop policy if exists p_com_admin on public.committee;
create policy p_com_admin on public.committee for all to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists p_set_select on public.settings;
create policy p_set_select on public.settings for select to authenticated using (public.is_active_user());
drop policy if exists p_set_update on public.settings;
create policy p_set_update on public.settings for update to authenticated
  using (public.is_admin()) with check (public.is_admin());

drop policy if exists p_audit_select on public.audit_log;
create policy p_audit_select on public.audit_log for select to authenticated using (public.is_admin());

-- ---------- 存取授權（anon 一律不可讀資料） ----------
revoke all on all tables in schema public from anon;
grant usage on schema public to authenticated;
grant select on public.profiles, public.students, public.student_photos, public.meta, public.settings, public.audit_log to authenticated;
grant update (display_name, weight, active) on public.profiles to authenticated;
grant select, insert, update, delete on public.decisions to authenticated;
grant select, insert, update on public.judge_state to authenticated;
grant select, insert, update, delete on public.committee to authenticated;
grant update (locked, method_note) on public.settings to authenticated;
grant execute on function public.is_active_user(), public.is_admin(), public.is_locked() to authenticated;
