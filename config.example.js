/* 複製成 config.js 後填寫。這兩項是 Supabase 設計上可公開的「anon」設定，不是密鑰；
   真正的權限由資料庫列級權限控制。service_role 密鑰絕對不可放在這裡。 */
window.GEF_CONFIG = {
  SUPABASE_URL: "https://你的專案.supabase.co",
  SUPABASE_ANON_KEY: "Supabase → Project Settings → API → anon public",
  EMAIL_DOMAIN: "gef16.invalid"   // 帳號 j01 會以 j01@gef16.invalid 登入；須與 supa_admin 的 EMAIL_DOMAIN 一致
};
