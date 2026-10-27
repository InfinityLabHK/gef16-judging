/* 閃耀之星初選平台 · 評審端啟動：登入 → 下載資料 → 合併本機未同步改動 → 啟動報告 → 即時同步 */
(function(){
const API=window.GEF_API;
const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let UID=null,PROF=null,LOCKED=false;
function loginView(msg){
  $("gate").classList.remove("hidden");
  $("gate").innerHTML=`<div class="gate-card">
   <div class="brand" style="font-size:18px">資優教育基金 · 閃耀之星第十六屆初選</div>
   <div class="small muted" style="margin:4px 0 20px">AI 輔助初選平台 · 只供初選委員使用</div>
   ${API.configured()?"":'<div class="warnbox" style="margin-bottom:12px">網站尚未完成設定（config.js）。</div>'}
   <label class="small">帳號<input id="gU" autocomplete="username" autocapitalize="none" spellcheck="false"></label>
   <label class="small">密碼<input id="gP" type="password" autocomplete="current-password"></label>
   <button class="btn primary" id="gGo" style="width:100%;justify-content:center;margin-top:8px">登入</button>
   <div id="gMsg" class="small" style="margin-top:10px;color:var(--bad)">${esc(msg||"")}</div>
   <p class="micro muted" style="margin-top:16px">本平台載有學生個人資料，只供獲授權的初選委員使用。請勿把帳號借給他人。</p></div>`;
  const go=async()=>{const u=$("gU").value.trim(),p=$("gP").value;if(!u||!p){$("gMsg").textContent="請輸入帳號及密碼";return;}
    $("gGo").disabled=true;$("gGo").textContent="登入中…";
    try{await API.login(u,p);await start();}catch(e){$("gGo").disabled=false;$("gGo").textContent="登入";$("gMsg").textContent=/Invalid login|invalid_grant|400/.test(e.message)?"帳號或密碼不正確":e.message;}};
  $("gGo").onclick=go;$("gP").onkeydown=e=>{if(e.key==="Enter")go();};$("gU").focus();}
function loading(t){$("gate").classList.remove("hidden");$("gate").innerHTML=`<div class="gate-card"><div class="brand">閃耀之星第十六屆初選</div><p class="small muted" style="margin-top:12px">${esc(t)}</p></div>`;}
function decFromRow(r){return {tier:r.tier,reasons:r.reasons||[],override:r.override||{},note:r.note||"",updatedAt:r.updated_at,blindAtDecision:false};}
async function start(){
  const s=API.session();UID=s.user.id;
  loading("正在載入 229 位學生資料，請稍候…");
  const prof=(await API.req(`profiles?select=*&user_id=eq.${UID}`)||[])[0];
  if(!prof||!prof.active){API.logout();loginView("此帳號未啟用，請聯絡 Scarlett");return;}
  PROF=prof;
  const [metaRows,studs,photos,decs,stRows,setRows]=await Promise.all([
    API.selectAll("meta","select=key,value"),
    API.selectAll("students","select=id,data&order=id.asc"),
    API.selectAll("student_photos","select=id,photo"),
    API.selectAll("decisions",`select=*&user_id=eq.${UID}`),
    API.req(`judge_state?select=*&user_id=eq.${UID}`),
    API.req("settings?select=*")]);
  const M=Object.fromEntries(metaRows.map(r=>[r.key,r.value]));
  const ph=Object.fromEntries(photos.map(r=>[r.id,r.photo]));
  window.GEF={meta:M.meta,quality:M.quality||[],students:studs.map(r=>Object.assign({},r.data,{photo:ph[r.id]||null}))};
  LOCKED=!!(setRows&&setRows[0]&&setRows[0].locked);
  window.GEF_KEY="gef16_web_"+prof.username;window.GEF_WEB=true;window.GEF_USER=prof.display_name+"（"+prof.username+"）";window.GEF_ROLE=prof.role;window.GEF_LOCKED=LOCKED;
  // 合併：伺服器為準；本機有較新而未同步的改動則保留並補傳
  let local=null;try{local=JSON.parse(localStorage.getItem(window.GEF_KEY)||"null");}catch(e){}
  const server={};decs.forEach(r=>server[r.student_id]=decFromRow(r));
  const merged=Object.assign({},server);const dirty=[];
  if(local&&local.decisions)for(const [id,d] of Object.entries(local.decisions)){if(!d)continue;const sv=server[id];
    const meaningful=d.tier||(d.reasons&&d.reasons.length)||d.note||(d.override&&Object.keys(d.override).length);
    if((!sv&&meaningful)||(sv&&d.updatedAt&&sv.updatedAt&&new Date(d.updatedAt)>new Date(sv.updatedAt))){merged[id]=d;dirty.push(id);}}
  const st=(stRows||[])[0]||{};const prefs=st.prefs||{};
  window.GEF_SERVER={judge:prof.display_name,decisions:merged,order:(local&&local._orderDirty)?local.order:(st.priority_order||[]),calibration:st.calibration||{},seen:Object.assign({},st.seen||{},local&&local.seen||{}),
    theme:prefs.theme||(local&&local.theme)||"light",fontLarge:!!prefs.fontLarge,showAI:!!prefs.showAI,showProfile:prefs.showProfile!==false};
  SYNC.init(server,st);dirty.forEach(id=>SYNC.markDirty(id));
  $("gate").classList.add("hidden");
  window.BOOT();
  if(LOCKED)banner("評審期已由管理員鎖定：你仍可閱讀，但改動不會儲存。");
  if(dirty.length)SYNC.flush();
  const h=(location.hash||"").replace("#","");if(/^\d{3}$/.test(h)&&window.OPEN_CARD)window.OPEN_CARD(h);
}
function banner(t){let b=$("webBanner");if(!b){b=document.createElement("div");b.id="webBanner";b.className="webbanner";document.body.insertBefore(b,document.body.firstChild.nextSibling);}b.textContent=t;}
/* ---------- 即時同步 ---------- */
const SYNC=(function(){
  let synced={},stateSynced="",timer=null,busy=false,again=false,forced=new Set();
  const pack=d=>JSON.stringify([d.tier||null,d.reasons||[],d.override||{},d.note||""]);const EMPTY=pack({});
  function stateOf(S){return JSON.stringify({o:S.order||[],c:S.calibration||{},s:S.seen||{},p:{theme:S.theme,fontLarge:!!S.fontLarge,showAI:!!S.showAI,showProfile:S.showProfile!==false}});}
  function init(server,st){synced={};for(const [id,d] of Object.entries(server))synced[id]=pack(d);
    stateSynced=JSON.stringify({o:st.priority_order||[],c:st.calibration||{},s:st.seen||{},p:Object.assign({theme:"light",fontLarge:false,showAI:false,showProfile:true},st.prefs||{})});}
  function status(t,cls){const e=$("syncSt");if(e){e.textContent=t;e.className="syncst "+(cls||"");}}
  function schedule(){clearTimeout(timer);status("● 未儲存","warn");timer=setTimeout(flush,700);}
  async function flush(){if(busy){again=true;return;}const S=window.S_REF&&window.S_REF();if(!S)return;
    if(LOCKED){status("已鎖定","bad");return;}
    busy=true;status("同步中…","");
    try{
      const rows=[];for(const [id,d] of Object.entries(S.decisions||{})){if(!d)continue;const p=pack(d);if(synced[id]===undefined&&p===EMPTY&&!forced.has(id))continue;if(synced[id]!==p||forced.has(id))rows.push({user_id:UID,student_id:id,tier:d.tier||null,reasons:d.reasons||[],override:d.override||{},note:d.note||""});}
      if(rows.length){await API.upsert("decisions",rows,"user_id,student_id");rows.forEach(r=>{synced[r.student_id]=pack(r);forced.delete(r.student_id);});}
      const so=stateOf(S);if(so!==stateSynced){const x=JSON.parse(so);await API.upsert("judge_state",[{user_id:UID,priority_order:x.o,calibration:x.c,seen:x.s,prefs:x.p}],"user_id");stateSynced=so;}
      status("✓ 已儲存","ok");
    }catch(e){
      if(e.status===401||e.status===403||e.code==="42501"){LOCKED=true;window.GEF_LOCKED=true;banner("評審期已由管理員鎖定，或登入已失效：改動未能儲存。請重新整理頁面。");status("未能儲存","bad");}
      else{status("離線：稍後重試","warn");setTimeout(flush,15000);}
    }finally{busy=false;if(again){again=false;flush();}}}
  return {init,schedule,flush,markDirty:id=>forced.add(id),pending:()=>{const S=window.S_REF&&window.S_REF();if(!S)return false;return Object.entries(S.decisions||{}).some(([id,d])=>d&&!(synced[id]===undefined&&pack(d)===EMPTY)&&synced[id]!==pack(d));}};
})();
window.GEF_SYNC=()=>SYNC.schedule();
window.GEF_LOGOUT=()=>{API.logout();location.reload();};
window.addEventListener("beforeunload",e=>{if(SYNC.pending()){e.preventDefault();e.returnValue="";}});
window.addEventListener("online",()=>SYNC.flush());
document.addEventListener("visibilitychange",()=>{if(document.visibilityState==="hidden")SYNC.flush();});
// 啟動
(async()=>{if(API.session()){try{await start();return;}catch(e){API.logout();loginView("登入已失效，請重新登入");return;}}loginView("");})();
})();
