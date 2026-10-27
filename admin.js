/* 閃耀之星初選平台 · 後台（只限管理員；權限由資料庫強制，此頁只是介面） */
(function(){
const API=window.GEF_API;const $=id=>document.getElementById(id);
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pct=(n,N)=>N?Math.round(n/N*100):0;
const med=a=>{if(!a.length)return null;const b=[...a].sort((x,y)=>x-y),m=b.length>>1;return b.length%2?b[m]:(b[m-1]+b[m])/2;};
const TIERS={A:"優先入圍",B:"考慮",C:"暫不考慮"};
const S3="以下只列人數和百分比，供委員會會議討論；章程沒有配額，入圍由委員會決定。";
const GROUPS=["語言","邏輯數學","人際關係","空間","音樂","身體動覺","全面","未勾選"],CORE=["語言","邏輯數學","人際關係","空間","音樂","身體動覺"],ECR6=["智力","學科","獨創思考","視覺及表演藝術","領導同輩","競技機械體能"],SUP=["綜援","書簿費全免","書簿費半免","無","未勾選"],QK=["hot","cre","psc","per","res","car"],STK=["科學","科技","工程","藝術","數學"];
const AX={t:CORE,q:["高層次思維","創造力","個人及社交能力","堅毅","責任與承擔","仁愛與同理"],st:STK,e:ECR6};
const FAM=[["t","才能"],["q","素質"],["st","STEAM"],["e","六個資優範疇"]];
let D={},TAB="progress",F={show:"picked",sort:"raw",q:""};
function toast(m){const t=$("toast");t.textContent=m;t.classList.add("show");clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove("show"),1800);}
function gate(msg){$("gate").classList.remove("hidden");$("gate").innerHTML=`<div class="gate-card"><div class="brand" style="font-size:18px">閃耀之星第十六屆初選 · 後台</div><div class="small muted" style="margin:4px 0 20px">只限管理員</div>
 <label class="small">帳號<input id="gU" autocomplete="username" autocapitalize="none"></label><label class="small">密碼<input id="gP" type="password" autocomplete="current-password"></label>
 <button class="btn primary" id="gGo" style="width:100%;justify-content:center;margin-top:8px">登入</button><div id="gMsg" class="small" style="margin-top:10px;color:var(--bad)">${esc(msg||"")}</div></div>`;
 const go=async()=>{try{$("gGo").disabled=true;await API.login($("gU").value.trim(),$("gP").value);await start();}catch(e){if(!$("gGo"))return gate(e.message);$("gGo").disabled=false;$("gMsg").textContent=/Invalid login|invalid_grant|400/.test(e.message)?"帳號或密碼不正確":e.message;}};
 $("gGo").onclick=go;$("gP").onkeydown=e=>{if(e.key==="Enter")go();};}
function poolRow(s){const c=s.cls||{};const q=c.qualities||{};const sex=s.student.sex==="女"||s.student.sex==="男"?s.student.sex:"—";
 return {id:s.id,name:s.student.name,school:s.student.school,groups:s.nomination.groups||[],top_talent:s.student.top_talent,ecr6_has:s.ecr6_has||[],sex,support:s.finance.support||"未勾選",grade_norm:s.student.grade_norm,school_type:s.student.school_type,best5:s.derived.best5,watch_n:(s.watch||[]).length,
  lv:{t:CORE.map(k=>((c.talent||{})[k]||{}).level||0),q:QK.map(k=>(q[k]||{}).level||0),st:STK.map(k=>((c.steam||{})[k]||{}).level||0),e:ECR6.map(k=>((c.ecr6||{})[k]||{}).level||0)}};}
async function load(){
 const [profiles,studs,decs,com,set,meta,audit]=await Promise.all([API.selectAll("profiles","select=*&order=username.asc"),API.selectAll("students","select=id,data&order=id.asc"),API.selectAll("decisions","select=*"),API.selectAll("committee","select=*"),API.req("settings?select=*"),API.selectAll("meta","select=key,value"),API.req("audit_log?select=*&order=at.desc&limit=300")]);
 const M=Object.fromEntries(meta.map(r=>[r.key,r.value]));
 D={me:D.me,profiles,students:studs.map(r=>poolRow(r.data)),decs,com:Object.fromEntries(com.map(r=>[r.student_id,r])),settings:(set||[])[0]||{},meta:M.meta||{},audit:audit||[],loadedAt:new Date()};}
async function start(){
 const s=API.session();const me=(await API.req(`profiles?select=*&user_id=eq.${s.user.id}`)||[])[0];
 if(!me||me.role!=="admin"||!me.active){$("gate").innerHTML=`<div class="gate-card"><p>此帳號沒有後台權限。</p><p style="margin-top:12px"><a class="btn" href="index.html">回到評審頁</a> <button class="btn" id="lo">登出</button></p></div>`;$("lo").onclick=()=>{API.logout();location.reload();};return;}
 D.me=me;$("gate").innerHTML=`<div class="gate-card"><p class="small muted">載入中…</p></div>`;
 await load();$("gate").classList.add("hidden");render();}
/* ---------- 計算 ---------- */
function compute(){
 const judges=D.profiles.filter(p=>p.active&&(p.role==="judge"||D.decs.some(d=>d.user_id===p.user_id)));
 const byJ={};judges.forEach(j=>byJ[j.user_id]={});D.decs.forEach(d=>{if(byJ[d.user_id])byJ[d.user_id][d.student_id]=d;});
 const Acount={};judges.forEach(j=>Acount[j.user_id]=Object.values(byJ[j.user_id]).filter(d=>d.tier==="A").length);
 const rows=D.students.map(s=>{const per=judges.map(j=>byJ[j.user_id][s.id]||{});let raw=0,eq=0,a=0,b=0,c=0;const reasons={};
  per.forEach((d,i)=>{const j=judges[i],w=Number(j.weight)||0;if(d.tier==="A"){a++;raw+=w;eq+=Acount[j.user_id]?100*w/Acount[j.user_id]:0;}else if(d.tier==="B")b++;else if(d.tier==="C")c++;(d.reasons||[]).forEach(r=>reasons[r]=(reasons[r]||0)+1);});
  return {s,per,a,b,c,raw:Math.round(raw*100)/100,eq:Math.round(eq*10)/10,reasons,divergent:a>0&&c>0};});
 const rank=(key)=>{const sorted=[...rows].filter(r=>r[key]>0).sort((x,y)=>y[key]-x[key]);let prev=null,rk=0;sorted.forEach((r,i)=>{if(r[key]!==prev){rk=i+1;prev=r[key];}r[key+"Rank"]=rk;});};
 rank("raw");rank("eq");rows.forEach(r=>{r.gap=r.rawRank&&r.eqRank?Math.abs(r.rawRank-r.eqRank):0;});
 return {judges,byJ,Acount,rows};}
/* ---------- 版面 ---------- */
function render(){const v=$("view");
 $("tabs").innerHTML=[["progress","進度及權重"],["sum","匯總及委員會決定"],["portrait","名單畫像"],["audit","操作紀錄"],["settings","鎖定及匯出"]].map(([k,l])=>`<button class="${TAB===k?"on":""}" data-t="${k}">${l}</button>`).join("");
 $("tabs").querySelectorAll("[data-t]").forEach(b=>b.onclick=()=>{TAB=b.dataset.t;render();});
 $("who").textContent=`${D.me.display_name}（${D.me.username}）· 資料時間 ${D.loadedAt.toLocaleTimeString("zh-HK",{hour12:false})}`;
 const C=compute();({progress:vProgress,sum:vSum,portrait:vPortrait,audit:vAudit,settings:vSettings})[TAB](v,C);}
function vProgress(v,C){const N=D.students.length;
 v.innerHTML=`<h1>進度及權重</h1><p class="lead">評分權重預設 1；由鄭校長決定是否調整。權重只影響後台匯總，不影響評審看到的報告。${D.settings.locked?' <span class="chip bad">評審已鎖定</span>':""}</p>
 <div class="tscroll"><table class="t"><thead><tr><th>帳號</th><th>名稱</th><th>角色</th><th>啟用</th><th>評分權重</th><th>已分層</th><th>優先</th><th>考慮</th><th>暫不</th><th>最後活動</th></tr></thead><tbody>
 ${D.profiles.map(p=>{const ds=D.decs.filter(d=>d.user_id===p.user_id);const t=k=>ds.filter(d=>d.tier===k).length;const last=ds.reduce((m,d)=>d.updated_at>m?d.updated_at:m,"");const done=ds.filter(d=>d.tier).length;
  return `<tr><td class="mono">${esc(p.username)}</td><td>${esc(p.display_name)}</td><td>${p.role==="admin"?"管理員":"評審"}</td><td><input type="checkbox" data-act="${p.user_id}" ${p.active?"checked":""} ${p.user_id===D.me.user_id?"disabled":""}></td>
  <td><input type="number" min="0" max="10" step="0.1" value="${p.weight}" data-w="${p.user_id}" style="width:70px;border:1px solid var(--line);border-radius:6px;padding:3px 6px;background:var(--panel2)"></td>
  <td><div style="display:flex;align-items:center;gap:6px"><div class="pbar" style="width:80px"><i style="width:${pct(done,N)}%"></i></div>${done}／${N}</div></td><td class="num">${t("A")}</td><td class="num">${t("B")}</td><td class="num">${t("C")}</td><td class="small muted">${last?new Date(last).toLocaleString("zh-HK",{hour12:false}):"—"}</td></tr>`;}).join("")}
 </tbody></table></div><p class="micro muted" style="margin-top:8px">改權重或啟用狀態後即時儲存；每次改動記入操作紀錄。後備帳號未指派前請保持停用。</p>`;
 v.querySelectorAll("[data-w]").forEach(i=>i.onchange=async()=>{try{await API.patch("profiles",`user_id=eq.${i.dataset.w}`,{weight:Number(i.value)});toast("已更新權重");await load();render();}catch(e){toast("未能更新："+e.message);}});
 v.querySelectorAll("[data-act]").forEach(i=>i.onchange=async()=>{try{await API.patch("profiles",`user_id=eq.${i.dataset.act}`,{active:i.checked});toast(i.checked?"已啟用":"已停用");await load();render();}catch(e){toast("未能更新："+e.message);}});}
function vSum(v,C){const {judges,rows}=C;
 let list=rows.filter(r=>F.show==="all"||(F.show==="picked"&&(r.a||r.b))||(F.show==="div"&&r.divergent)||(F.show==="gap"&&r.gap>=10)||(F.show==="com"&&D.com[r.s.id]&&D.com[r.s.id].decision));
 if(F.q)list=list.filter(r=>(r.s.id+r.s.name+r.s.school).includes(F.q));
 const sk={raw:r=>-r.raw,eq:r=>-r.eq,id:r=>r.s.id}[F.sort];list.sort((x,y)=>{const a=sk(x),b=sk(y);return a<b?-1:a>b?1:(y.a-x.a)||x.s.id.localeCompare(y.s.id);});
 const cnt=k=>Object.values(D.com).filter(c=>c.decision===k).length;
 v.innerHTML=`<h1>匯總及委員會決定</h1>
 <div class="notebox small" style="margin-bottom:12px"><b>兩種排序並排（只供會議討論，最終由委員會決定）</b><br>① <b>原始人次</b>：每位評審選一位「優先入圍」計 1 票 × 該評審權重。② <b>均等權重</b>：每位評審的優先名單合共分配「100 × 權重」分，名單愈長每人分到愈少。兩種排名相差 10 名以上標「差異」；有人優先、有人暫不標「分歧」。</div>
 <div class="filters"><select id="fShow">${[["picked","被選優先或考慮"],["all","全部 229 人"],["div","只看分歧"],["gap","只看兩種排序差異大"],["com","只看已有委員會決定"]].map(([k,l])=>`<option value="${k}" ${F.show===k?"selected":""}>${l}</option>`).join("")}</select>
  <select id="fSort">${[["raw","按原始人次"],["eq","按均等權重"],["id","按編號"]].map(([k,l])=>`<option value="${k}" ${F.sort===k?"selected":""}>${l}</option>`).join("")}</select>
  <input id="fQ" placeholder="編號／姓名／學校" value="${esc(F.q)}" style="width:160px"><span class="small muted">${list.length} 人 · 委員會決定：入圍 <b>${cnt("入圍")}</b> · 後備 <b>${cnt("後備")}</b> · 不入圍 ${cnt("不入圍")}（章程約 25 名）</span>
  <span style="flex:1"></span><button class="btn sm" id="csv1">匯出 CSV（各評審名單）</button><button class="btn sm" id="csv2">匯出 CSV（匯總及決定）</button></div>
 <div class="tscroll" style="max-height:calc(100vh - 300px)"><table class="t"><thead><tr><th>編號</th><th>姓名</th><th>學校</th>${judges.map(j=>`<th title="權重 ${j.weight}">${esc(j.display_name)}</th>`).join("")}<th>優先</th><th>考慮</th><th>暫不</th><th>原始人次</th><th>排名①</th><th>均等權重</th><th>排名②</th><th>標示</th><th>理由共識</th><th>委員會決定</th><th>備註</th></tr></thead><tbody>
 ${list.map(r=>{const cm=D.com[r.s.id]||{};return `<tr><td class="mono"><a href="index.html#${r.s.id}" target="_blank" rel="noopener">${r.s.id}</a></td><td>${esc(r.s.name)}</td><td class="small">${esc(r.s.school)}</td>
  ${r.per.map(d=>`<td>${d.tier?`<span class="chip" style="--c:var(--t${d.tier})">${d.tier==="A"?"優先":d.tier==="B"?"考慮":"暫不"}</span>`:'<span class="muted">—</span>'}</td>`).join("")}
  <td class="num"><b>${r.a}</b></td><td class="num">${r.b}</td><td class="num">${r.c}</td><td class="num">${r.raw}</td><td class="num">${r.rawRank||"—"}</td><td class="num">${r.eq}</td><td class="num">${r.eqRank||"—"}</td>
  <td>${r.divergent?'<span class="chip bad">分歧</span>':""}${r.gap>=10?'<span class="chip warn">差異</span>':""}</td>
  <td class="small">${Object.entries(r.reasons).sort((a,b)=>b[1]-a[1]).map(([k,n])=>`${k} ${n}`).join("、")}</td>
  <td><select data-com="${r.s.id}">${["","入圍","後備","不入圍"].map(k=>`<option ${cm.decision===k||(!cm.decision&&!k)?"selected":""} value="${k}">${k||"—"}</option>`).join("")}</select></td>
  <td><input data-note="${r.s.id}" value="${esc(cm.note||"")}" style="width:140px;border:1px solid var(--line);border-radius:6px;padding:3px 6px;background:var(--panel2)"></td></tr>`;}).join("")}</tbody></table></div>`;
 v.querySelector("#fShow").onchange=e=>{F.show=e.target.value;render();};v.querySelector("#fSort").onchange=e=>{F.sort=e.target.value;render();};
 v.querySelector("#fQ").oninput=e=>{F.q=e.target.value.trim();render();const q=$("fQ");q.focus();q.setSelectionRange(q.value.length,q.value.length);};
 const saveCom=async(id,patch)=>{const cur=D.com[id]||{student_id:id,decision:null,note:""};const row=Object.assign({student_id:id,decision:cur.decision||null,note:cur.note||""},patch);if(row.decision==="")row.decision=null;
  try{await API.upsert("committee",[{student_id:id,decision:row.decision,note:row.note,updated_by:D.me.user_id}],"student_id");D.com[id]=row;toast("已儲存委員會決定");}catch(e){toast("未能儲存："+e.message);}};
 v.querySelectorAll("[data-com]").forEach(s=>s.onchange=()=>saveCom(s.dataset.com,{decision:s.value}));
 v.querySelectorAll("[data-note]").forEach(i=>i.onchange=()=>saveCom(i.dataset.note,{note:i.value}));
 v.querySelector("#csv1").onclick=()=>{const lists=judges.map(j=>rows.filter(r=>(C.byJ[j.user_id][r.s.id]||{}).tier==="A").map(r=>r.s.id));const mx=Math.max(0,...lists.map(l=>l.length));const lines=[judges.map(j=>j.display_name)];for(let k=0;k<mx;k++)lines.push(lists.map(l=>l[k]||""));dl("各評審優先入圍名單_"+today()+".csv",lines);};
 v.querySelector("#csv2").onclick=()=>{const lines=[["申請編號","姓名","學校",...judges.map(j=>j.display_name+"（權重"+j.weight+"）"),"優先人次","考慮人次","暫不人次","原始人次（加權）","排名①","均等權重分","排名②","分歧","差異","委員會決定","委員會備註"]];
  [...rows].sort((a,b)=>a.s.id.localeCompare(b.s.id)).forEach(r=>{const cm=D.com[r.s.id]||{};lines.push([r.s.id,r.s.name,r.s.school,...r.per.map(d=>d.tier?TIERS[d.tier]:""),r.a,r.b,r.c,r.raw,r.rawRank||"",r.eq,r.eqRank||"",r.divergent?"是":"",r.gap>=10?"是":"",cm.decision||"",cm.note||""]);});dl("初選匯總及委員會決定_"+today()+".csv",lines);};}
function tri(rows,sets,P){const m=Math.max(1,...rows.map(r=>Math.max(...sets.map((L,i)=>L.length?r[i+1]/L.length:0),r[sets.length+1]/P)));const cols=["var(--pMine)","var(--pMine2)","var(--l3)"];
 return rows.map(r=>`<div class="pb"><div class="row"><div class="l">${esc(r[0])}</div><div class="bars">${sets.map((L,i)=>`<i style="width:${(L.length?r[i+1]/L.length:0)/m*100}%;background:${cols[i]}"></i>`).join("")}<i style="width:${(r[sets.length+1]/P)/m*100}%;background:var(--pPool)"></i></div><div class="v">${sets.map((L,i)=>`<div>${r[i+1]}／${L.length}（${pct(r[i+1],L.length)}%）</div>`).join("")}<div>${r[sets.length+1]}／${P}（${pct(r[sets.length+1],P)}%）</div></div></div></div>`).join("");}
const cntBy=(L,fn)=>{const m={};L.forEach(s=>{const v=fn(s);(Array.isArray(v)?v:[v]).forEach(k=>m[k]=(m[k]||0)+1);});return m;};
const avgLv=(L,f,i)=>L.length?Math.round(L.reduce((a,s)=>a+(s.lv[f][i]||0),0)/L.length*10)/10:null;
function miniRadar(vals,cmp,labels,size=150){const pad=60,Wd=size+pad*2,Ht=size+24,cx=Wd/2,cy=Ht/2,r=size/2-6,n=labels.length;const ang=i=>-Math.PI/2+i*2*Math.PI/n;const pt=(i,v)=>[cx+Math.cos(ang(i))*r*(v||0)/5,cy+Math.sin(ang(i))*r*(v||0)/5];
 const ring=[1,2,3,4,5].map(k=>`<polygon points="${labels.map((l,i)=>pt(i,k).join(",")).join(" ")}" fill="none" stroke="var(--grid)"/>`).join("");
 const lab=labels.map((l,i)=>{const [x,y]=pt(i,6.2);const c=Math.cos(ang(i));return `<text x="${x}" y="${y+4}" font-size="10" text-anchor="${Math.abs(c)<.2?"middle":c>0?"start":"end"}">${l}</text>`;}).join("");
 return `<svg viewBox="0 0 ${Wd} ${Ht}" width="100%" style="max-width:${Wd}px;display:block;margin:0 auto">${ring}<polygon points="${cmp.map((v,i)=>pt(i,v).join(",")).join(" ")}" fill="none" stroke="var(--pMine2)" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="${vals.map((v,i)=>pt(i,v).join(",")).join(" ")}" fill="var(--pMine)" fill-opacity=".14" stroke="var(--pMine)" stroke-width="2"/>${lab}</svg>`;}
function vPortrait(v,C){const {judges,rows}=C;const P=D.students;const half=Math.max(1,Math.ceil(judges.length/2));
 const L1=rows.filter(r=>r.a>=1).map(r=>r.s),Lh=rows.filter(r=>r.a>=half).map(r=>r.s),Lc=P.filter(s=>(D.com[s.id]||{}).decision==="入圍");
 const sets=[L1,Lh,Lc];const lab=["被選 ≥1 人次",`被選 ≥${half} 人次（過半）`,"委員會入圍"];
 const dims=[["提名組別（人次）",GROUPS,s=>s.groups.length?s.groups:["未勾選"]],["最強才能範疇",[...CORE,"無獎項紀錄"],s=>s.top_talent],["六範疇有紀錄",ECR6,s=>s.ecr6_has],["性別",["女","男","—"],s=>s.sex],["資助狀況",SUP,s=>s.support],["年級",["P.4","P.5","P.6"],s=>s.grade_norm],["學校類型",["官立","資助","直資","私立","其他","未對照"],s=>s.school_type]];
 const ent=[...judges.map(j=>[j.display_name,rows.filter(r=>(C.byJ[j.user_id][r.s.id]||{}).tier==="A").map(r=>r.s)]),[lab[1],Lh],[lab[2],Lc],["全體申請人",P]];
 const cols=FAM.flatMap(([f,l])=>AX[f].map((a,i)=>[l,a,f,i]));
 const LC=D.meta.last_cohort;
 v.innerHTML=`<h1>名單畫像</h1><p class="fixed small" style="font-weight:600">${S3}</p>
 <h2>合併名單輪廓</h2><div class="legend"><span><i style="background:var(--pMine)"></i>${lab[0]}（${L1.length}）</span><span><i style="background:var(--pMine2)"></i>${lab[1]}（${Lh.length}）</span><span><i style="background:var(--l3)"></i>${lab[2]}（${Lc.length}）</span><span><i style="background:var(--pPool)"></i>全體申請人（${P.length}）</span></div>
 <div class="grid g2">${dims.map(([t,ord,fn])=>{const cs=sets.map(L=>cntBy(L,fn)),cp=cntBy(P,fn);return `<div class="panel"><h3 class="small">${t}</h3>${tri(ord.filter(k=>cp[k]||cs.some(c=>c[k])).map(k=>[k,...cs.map(c=>c[k]||0),cp[k]||0]),sets,P.length)}</div>`;}).join("")}</div>
 <h2>各評審名單畫像</h2><p class="small muted">每位評審「優先入圍」名單的平均級別（0–5，實線），與全體申請人平均（虛線）並排；用來了解各評審看重的方向，不是評分，也沒有對錯。</p>
 <div class="grid g3" style="margin-top:8px">${ent.map(([j,L])=>`<div class="panel"><h3 class="small">${esc(j)}（${L.length} 人）</h3>${L.length?`<div class="grid g2" style="gap:4px">${[["t","才能"],["q","素質"]].map(([f,l])=>`<div><div class="micro muted" style="text-align:center">${l}</div>${miniRadar(AX[f].map((a,i)=>avgLv(L,f,i)),AX[f].map((a,i)=>avgLv(P,f,i)),AX[f].map(x=>x.slice(0,2)))}</div>`).join("")}</div>`:'<p class="micro muted">沒有名單</p>'}</div>`).join("")}</div>
 <h3 class="small" style="margin-top:16px">全部指標（平均級別 0–5）</h3>
 <div class="tscroll"><table class="t"><thead><tr><th>名單</th><th>人數</th><th>最佳五項中位數</th><th>全免＋綜援</th><th>有多看一眼標籤</th>${cols.map(c=>`<th>${c[0]}·${c[1]}</th>`).join("")}</tr></thead><tbody>
 ${ent.map(([j,L])=>`<tr><td><b>${esc(j)}</b></td><td>${L.length}</td><td>${med(L.map(s=>s.best5))??"—"}</td><td>${L.length?pct(L.filter(s=>s.support==="書簿費全免"||s.support==="綜援").length,L.length)+"%":"—"}</td><td>${L.length?pct(L.filter(s=>s.watch_n>0).length,L.length)+"%":"—"}</td>${cols.map(c=>`<td class="num">${avgLv(L,c[2],c[3])??"—"}</td>`).join("")}</tr>`).join("")}</tbody></table></div>
 ${LC?`<h2>與上屆對照</h2><div class="panel"><p class="micro muted">上屆資料來源：${esc(LC.source)}</p><div class="tscroll" style="margin-top:8px"><table class="t"><thead><tr><th>項目</th><th>上屆得獎者</th><th>${lab[1]}</th><th>委員會入圍</th><th>本屆全體申請人</th></tr></thead><tbody>
  ${["女","男"].map(k=>{const f=L=>`${cntBy(L,s=>s.sex)[k]||0}／${L.length}（${pct(cntBy(L,s=>s.sex)[k]||0,L.length)}%）`;return `<tr><td>性別 · ${k}</td><td>${LC.sex[k]}／${LC.n}（${pct(LC.sex[k],LC.n)}%）</td><td>${f(Lh)}</td><td>${f(Lc)}</td><td>${f(P)}</td></tr>`;}).join("")}
  ${[["資助","資助"],["官立","官立"],["私立／直資",null]].map(([k,mk])=>{const f=L=>{const n=mk?(cntBy(L,s=>s.school_type)[mk]||0):((cntBy(L,s=>s.school_type)["私立"]||0)+(cntBy(L,s=>s.school_type)["直資"]||0));return `${n}／${L.length}（${pct(n,L.length)}%）`;};return `<tr><td>學校類型 · ${k}</td><td>${LC.school_type[k]}／${LC.n}（${pct(LC.school_type[k],LC.n)}%）</td><td>${f(Lh)}</td><td>${f(Lc)}</td><td>${f(P)}</td></tr>`;}).join("")}
 </tbody></table></div><p class="micro muted" style="margin-top:6px">上屆才華領域（小冊子原分類，不作對應）：${LC.talent_areas.map(([k,n])=>`${k} ${n}`).join("、")}</p></div>`:""}`;}
function vAudit(v){const name=Object.fromEntries(D.profiles.map(p=>[p.user_id,p.display_name]));
 const desc=a=>{const d=a.detail||{};if(a.action.startsWith("decisions"))return d.tier?TIERS[d.tier]:"取消分層";if(a.action.startsWith("committee"))return d.decision||"清除決定";if(a.action.startsWith("profiles"))return `${d.display_name}：權重 ${d.weight}，${d.active?"啟用":"停用"}`;if(a.action.startsWith("settings"))return d.locked?"鎖定評審":"解除鎖定";return "";};
 v.innerHTML=`<h1>操作紀錄</h1><p class="lead">最近 300 項改動（評審分層、委員會決定、權重、鎖定）。</p><div class="tscroll" style="max-height:calc(100vh - 220px)"><table class="t"><thead><tr><th>時間</th><th>帳號</th><th>類別</th><th>編號</th><th>內容</th></tr></thead><tbody>
 ${D.audit.map(a=>`<tr><td class="small">${new Date(a.at).toLocaleString("zh-HK",{hour12:false})}</td><td>${esc(name[a.user_id]||"系統")}</td><td class="small">${({"decisions":"評審分層","committee":"委員會決定","profiles":"帳號設定","settings":"鎖定設定"})[a.action.split(":")[0]]||esc(a.action)}</td><td class="mono">${esc(a.student_id||"")}</td><td class="small">${esc(desc(a))}</td></tr>`).join("")||'<tr><td colspan="5" class="muted">暫無紀錄</td></tr>'}</tbody></table></div>`;}
function vSettings(v){const L=!!D.settings.locked;
 v.innerHTML=`<h1>鎖定及匯出</h1><div class="grid g2"><div class="panel"><h3>評審期</h3><p class="small" style="margin:8px 0">現時：<b>${L?"已鎖定（評審只能閱讀，不能改分層）":"開放中"}</b></p><button class="btn ${L?"":"primary"}" id="lockBtn">${L?"解除鎖定":"鎖定評審"}</button><div id="lockConfirm"></div></div>
 <div class="panel"><h3>匯出</h3><p class="small muted" style="margin:8px 0">在「匯總及委員會決定」頁有兩個 CSV：各評審名單（對齊主辦方評分表）及匯總連委員會決定。</p><button class="btn" id="goSum">前往匯總頁</button></div></div>`;
 v.querySelector("#goSum").onclick=()=>{TAB="sum";render();};
 v.querySelector("#lockBtn").onclick=()=>{v.querySelector("#lockConfirm").innerHTML=`<div class="warnbox" style="margin-top:10px">確定${L?"解除鎖定":"鎖定"}？${L?"評審可再修改分層。":"鎖定後評審不能再改分層。"} <button class="btn sm" id="lkY">確定</button> <button class="btn sm" id="lkN">取消</button></div>`;
  v.querySelector("#lkN").onclick=()=>v.querySelector("#lockConfirm").innerHTML="";v.querySelector("#lkY").onclick=async()=>{try{await API.patch("settings","id=eq.1",{locked:!L});await load();render();toast(L?"已解除鎖定":"已鎖定");}catch(e){toast("未能更新："+e.message);}};};}
function today(){return new Date().toISOString().slice(0,10).replace(/-/g,"");}
function dl(name,lines){const csv="﻿"+lines.map(r=>r.map(c=>`"${String(c??"").replace(/"/g,'""')}"`).join(",")).join("\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv;charset=utf-8"}));a.download=name;document.body.appendChild(a);a.click();a.remove();}
$("refresh").onclick=async()=>{await load();render();toast("已更新");};
$("logout").onclick=()=>{API.logout();location.reload();};
let theme="light";try{theme=localStorage.getItem("gef16_admin_theme")||"light";}catch(e){}document.documentElement.dataset.theme=theme;
$("themeBtn").onclick=()=>{theme=theme==="dark"?"light":"dark";document.documentElement.dataset.theme=theme;try{localStorage.setItem("gef16_admin_theme",theme);}catch(e){}};
(async()=>{if(API.session()){try{await start();return;}catch(e){API.logout();}}gate("");})();
})();
