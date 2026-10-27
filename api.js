/* 閃耀之星初選平台 · 極簡 Supabase 用戶端（只用瀏覽器內建 fetch，無外部程式庫）
   登入：Supabase Auth（GoTrue）帳號密碼；資料：PostgREST。權限由資料庫列級權限強制。 */
(function(){
const C=window.GEF_CONFIG||{};
const BASE=(C.SUPABASE_URL||"").replace(/\/$/,"");
const KEY=C.SUPABASE_ANON_KEY||"";
const SK="gef16_session";
let sess=null;
try{sess=JSON.parse(sessionStorage.getItem(SK)||"null");}catch(e){}
function store(s){sess=s;try{s?sessionStorage.setItem(SK,JSON.stringify(s)):sessionStorage.removeItem(SK);}catch(e){}}
function toEmail(u){u=String(u||"").trim().toLowerCase();return u.includes("@")?u:u+"@"+(C.EMAIL_DOMAIN||"gef16.invalid");}
async function auth(body,grant){
  const r=await fetch(`${BASE}/auth/v1/token?grant_type=${grant}`,{method:"POST",headers:{"apikey":KEY,"Content-Type":"application/json"},body:JSON.stringify(body)});
  const j=await r.json().catch(()=>({}));
  if(!r.ok)throw new Error(j.error_description||j.msg||j.message||("登入失敗 "+r.status));
  store({access_token:j.access_token,refresh_token:j.refresh_token,expires_at:Date.now()+(j.expires_in||3600)*1000,user:{id:j.user&&j.user.id,email:j.user&&j.user.email}});
  return sess;}
async function login(username,password){return auth({email:toEmail(username),password},"password");}
async function refresh(){if(!sess||!sess.refresh_token)throw new Error("未登入");return auth({refresh_token:sess.refresh_token},"refresh_token");}
async function token(){if(!sess)throw new Error("未登入");if(Date.now()>sess.expires_at-60000)await refresh();return sess.access_token;}
async function req(path,{method="GET",body=null,headers={},range=null}={}){
  const h={"apikey":KEY,"Authorization":"Bearer "+await token(),...headers};
  if(body!=null)h["Content-Type"]="application/json";
  if(range)h["Range-Unit"]="items",h["Range"]=range;
  let r=await fetch(`${BASE}/rest/v1/${path}`,{method,headers:h,body:body==null?undefined:JSON.stringify(body)});
  if(r.status===401){await refresh();h.Authorization="Bearer "+sess.access_token;r=await fetch(`${BASE}/rest/v1/${path}`,{method,headers:h,body:body==null?undefined:JSON.stringify(body)});}
  if(!r.ok){const j=await r.json().catch(()=>({}));const e=new Error(j.message||("伺服器錯誤 "+r.status));e.status=r.status;e.code=j.code;throw e;}
  if(r.status===204)return null;const t=await r.text();return t?JSON.parse(t):null;}
async function selectAll(table,query="select=*",page=500){
  const out=[];for(let from=0;;from+=page){const rows=await req(`${table}?${query}`,{range:`${from}-${from+page-1}`});out.push(...(rows||[]));if(!rows||rows.length<page)break;}return out;}
async function upsert(table,rows,onConflict){
  return req(`${table}?on_conflict=${onConflict}`,{method:"POST",body:rows,headers:{"Prefer":"resolution=merge-duplicates,return=minimal"}});}
async function patch(table,filter,body){return req(`${table}?${filter}`,{method:"PATCH",body,headers:{"Prefer":"return=minimal"}});}
async function del(table,filter){return req(`${table}?${filter}`,{method:"DELETE",headers:{"Prefer":"return=minimal"}});}
function logout(){store(null);}
window.GEF_API={login,logout,refresh,req,selectAll,upsert,patch,del,session:()=>sess,configured:()=>!!(BASE&&KEY)};
})();
