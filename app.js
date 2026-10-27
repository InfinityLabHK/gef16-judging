/* 閃耀之星初選平台 · 報告程式（由 build_site.py 產生，請勿手改） */
window.BOOT=function(){
/* ============ 基本 ============ */
const D=window.GEF,ST=D.students,META=D.meta,POOL=META.pool;
const KEY=window.GEF_KEY||"gef16_review_v1";
const ITEMS=[["potential","①潛能表現成績",15],["vision","②願景",10],["adversity","③處理逆境",10],["need","④發展需要",10],["recommendation","推薦人評語",30],["finance","經濟、家境和需要（暫定）",25]];
const REASONS=["才華","願景","逆境","需要","推薦","家境"];
const TIERS={A:"優先入圍",B:"考慮",C:"暫不考慮"};
const DOMS=["語言","邏輯數學","人際關係","空間","音樂","身體動覺","綜合學業","其他"];
const GROUPS=["語言","邏輯數學","人際關係","空間","音樂","身體動覺","全面"];
const CORE6=["語言","邏輯數學","人際關係","空間","音樂","身體動覺"];
const STEAM5=["科學","科技","工程","藝術","數學"];
const ECR6=["智力","學科","獨創思考","視覺及表演藝術","領導同輩","競技機械體能"];
const ECR_TITLE="教育統籌委員會《第四號報告書》(1990) 六個資優範疇";
const SUPORD=["綜援","書簿費全免","書簿費半免","無","未勾選"];
const SUPSHORT={"綜援":"綜援","書簿費全免":"全免","書簿費半免":"半免","無":"無","未勾選":"未勾選"};
const QUAL=[["hot","高層次思維"],["cre","創造力"],["psc","個人及社交能力"],["per","堅毅"],["res","責任與承擔"],["car","仁愛與同理"]];
const VALUES12=["堅毅","尊重他人","責任感","國民身份認同","承擔精神","誠信","仁愛","守法","同理心","勤勞","孝親","團結"];
const WATCH=[["W1","素質證據強、獎項指數低於中位數"],["W2","獨創或領導有紀錄、獎項指數低於中位數"],["W3","另類才華"],["W4","校內紀錄為主"],["W5","人數較少的提名組別"],["W6","小四申請人"],["W7","創造力有具體事例"]];
const LOOK={
 A:["看申請表所列獎項和活動落在七組才能的哪幾組，以及最強的一組。","不是評分；軸長反映紀錄多少，不反映天分高低，校內機會少的學生軸會較短。"],
 B:["看文章和評語裡有具體事例的是哪幾種素質，事例愈多愈具體軸愈長。","不是品格評分；沒亮的軸只代表申請表沒寫到，不代表學生沒有。"],
 C:["看獎項和活動按賽事性質歸入科學、科技、工程、藝術、數學的分布。","不是 STEAM 能力評估；由程式按賽事名稱推算，非 STEAM 項目另計。"],
 D:["看紀錄對應教統會 1990 年六個資優範疇的哪幾個。","不是資優鑑定；只是把申請表紀錄放到官方框架上看一眼。"],
 E:["看能力、創造力、工作熱忱三個現成數據放進 Renzulli 三環後的形狀。","不是三環理論的正式評估；創造力普遍低分是申請表性質所致。"],
 F:["看每個範疇有多少獎項、最高到哪一層級、多少活動。","不是排名；層級按主辦及賽事名稱判斷，未核實是否代表香港。"],
 G:["看文章或評語裡有具體事例的價值觀是哪幾個。","沒亮不代表沒有，只是申請表未提供事例。"],
 H:["看獎項按年份的分布、有沒有持續、層級有沒有上升。","不是進步評分；年份寫法不一已正規化，認不出的年份不計。"],
 I:["看基層學生（右方）的獎項紀錄是否整體偏低。","偏低不代表才華低，可能是參賽機會少；點可點開卡片。"],
 J:["看 229 人整體的形狀，作為看個人雷達時的參照。","不是標準線；個人雷達高於或低於平均都不是分數。"],
 K:["琥珀深淺＝獎項層級（校內→國際）；七色＝才能範疇；石板藍深淺＝資助狀況（無→綜援）。","顏色只幫你快速辨認，每處都有文字，不用靠顏色記。"],
 L:["看申請人池的性別組成。","性別由文章及評語代名詞推斷，推斷不到顯示「—」；不是評審依據。"],
 M:["看學校提名時勾選了哪些組別（可多選，按人次）。","不是申請人才能分布；勾選由學校決定。"],
 N:["看申請人池的政府資助狀況。","經濟分屬評分項，但此圖只是人數。"],
 O:["看小四、小五、小六各有多少人。","年級低者紀錄自然較少，比較時請留意。"],
 P:["看每位申請人紀錄最強的範疇合起來是什麼形狀。","不是提名組別；由獎項分數和決定，無獎項者列「無獎項紀錄」。"],
 Q:["看每個官方範疇有多少申請人留下紀錄。","一人可計入多個範疇；不是入選建議。"],
 R:["看不同組別的紀錄或分數中位數有沒有明顯差距。","人數少於 10 的組不作比較；差距本身不是結論。"]
};
const S1="章程沒有配額；此處只讓你看見自己名單的形狀，是否調整由你決定。";
const S2="尚未勾選優先入圍；勾選後這裡會顯示名單的形狀。";
const S2b="名單少於 5 人，比例只供參考。";
const S4="標籤由資料條件產生，不加分、不排序；只提醒你多看一眼。";
const WATCH_INTRO="229 份申請表逐份看完，有些學生的特點不在獎項欄，容易被略過。下面七個標籤由資料條件自動產生，只提醒你多看一眼，不加分、不排序。";
const byId=Object.fromEntries(ST.map(s=>[s.id,s]));
const esc=s=>String(s??"").replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const hasAI=s=>!!(s.ai&&s.ai.final);
const RM=window.matchMedia&&matchMedia("(prefers-reduced-motion: reduce)").matches;
const STY=s=>META.has_school_type?s.student.school_type:"";
function setTier(id,t){if(window.GEF_LOCKED){toast("評審期已鎖定，改動不會儲存");return dec(id).tier;}const d=dec(id);d.tier=d.tier===t?null:t;if(d.tier==="A"&&!S.order.includes(id))S.order.push(id);if(d.tier!=="A")S.order=S.order.filter(x=>x!==id);touch(id);syncHeader();if(typeof renderBbar==="function")renderBbar();return d.tier;}
function bkBtns(id){const t=dec(id).tier;return `<span class="bk"><button data-bk="A" data-id="${id}" class="A ${t==="A"?"on":""}" aria-pressed="${t==="A"}" data-tip="${t==="A"?"再按一下移出":"放入優先入圍籃子"}">${t==="A"?"★":"☆"} 優先</button><button data-bk="B" data-id="${id}" class="B ${t==="B"?"on":""}" aria-pressed="${t==="B"}" data-tip="${t==="B"?"再按一下移出":"放入考慮籃子"}">${t==="B"?"◆":"◇"} 考慮</button>${t==="C"?'<span class="micro muted">暫不</span>':""}</span>`;}
function domVar(n){const i={"語言":1,"邏輯數學":2,"人際關係":3,"空間":4,"音樂":5,"身體動覺":6,"綜合學業":7,"全面":7}[n];return `var(--d${i||8})`;}
function lvVar(l){return l>=1&&l<=5?`var(--l${l})`:"var(--grid)";}
function supVar(k){return {"無":"var(--s0)","書簿費半免":"var(--s1)","書簿費全免":"var(--s2)","綜援":"var(--s3)"}[k]||"var(--s9)";}
const LVL={1:"校內",2:"地區／學界",3:"全港",4:"全國",5:"國際"};
function lvChip(l){return l>=1?`<span class="chip" style="--c:${lvVar(l)}">${l===5?"★ ":""}${l} ${LVL[l]}</span>`:'<span class="chip plain">—</span>';}
function domChip(d){return d?`<span class="chip" style="--c:${domVar(d)}">${esc(d)}</span>`:"";}
function supDot(k){k=k||"未勾選";return `<span class="dot ${k==="未勾選"?"dash":""}" style="--c:${supVar(k)}"></span>${esc(k)}`;}
function pct(n,N){return N?Math.round(n/N*100):0;}
function median(a){if(!a.length)return null;const b=[...a].sort((x,y)=>x-y),m=b.length>>1;return b.length%2?b[m]:(b[m-1]+b[m])/2;}
function hash(s){let h=0;for(const c of String(s))h=(h*31+c.charCodeAt(0))|0;return Math.abs(h);}

/* ============ 狀態 ============ */
let S=load();
function load(){const base={judge:"",blind:false,showAI:false,showProfile:true,theme:"light",fontLarge:false,decisions:{},order:[],seen:{},calibration:{},tab:"guide",expandAI:{}};
 let j=null;try{j=JSON.parse(localStorage.getItem(KEY)||"null");}catch(e){}
 const o=Object.assign(base,j&&j.decisions?j:{});if(window.GEF_SERVER)Object.assign(o,window.GEF_SERVER);o.blind=false;Object.values(o.decisions||{}).forEach(d=>{if(d)d.blindAtDecision=false;});return o;}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}if(window.GEF_SYNC)window.GEF_SYNC();}
window.S_REF=()=>S;
function toast(m){const t=document.getElementById("toast");t.textContent=m;t.classList.add("show");clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove("show"),1800);}
function dec(id){return S.decisions[id]||(S.decisions[id]={tier:null,reasons:[],override:{},note:"",updatedAt:null,blindAtDecision:false});}
function touch(id){const d=dec(id);d.updatedAt=new Date().toISOString();d.blindAtDecision=false;save();}
function tierDot(id){const t=dec(id).tier;return t?`<span class="dot" style="--c:var(--t${t})" data-tip="${TIERS[t]}"></span><b class="small">${t}</b>`:`<span class="dot hollow" data-tip="未分層"></span>`;}
function nomRole(s){const r=s.nomination.nominator_role;return !r||r==="未知"?"職位未填":r;}
function nomName(s){const n=s.nomination.nominator_name;if(!n)return "提名人姓名未填";return n;}
function sexTxt(s){return s.student.sex==="女"||s.student.sex==="男"?s.student.sex:"—";}
function flagsOf(s){const f=[];if(s.recommendation.missing)f.push("欠學校推薦");if(hasAI(s)&&s.ai.incomplete)f.push("資料不足");if(hasAI(s)&&s.ai.review_needed)f.push("需人手覆核");if(hasAI(s)&&s.ai.edge)f.push("入圍邊緣帶");
 if(/□/.test((s.essay.text||"")+(s.recommendation.text||"")+s.awards.map(a=>a.event+a.organiser+a.honour).join("")+s.activities.map(a=>a.activity+a.org).join("")+(s.student.name||"")))f.push("待人工核字");
 if(s.essay.confidence==="low"||s.recommendation.confidence==="low")f.push("讀取信心低");if(s.file.pages<4)f.push("缺頁");
 if(s.xlsx.groups_match===false)f.push("組別與評分表不符");if(s.xlsx.support_match===false)f.push("資助與評分表不符");
 if(s.nomination.groups_confidence==="low"||s.finance.support_confidence==="low")f.push("勾選待核");if((s.finance.support||"未勾選")==="未勾選")f.push("資助未勾選");
 if(s.essay.lang==="en")f.push("英文文章");if(s.signatures&&Object.values(s.signatures).some(v=>v===false))f.push("簽署不全");
 if(s.derived.dup_level==="偏多")f.push("重複填寫偏多");else if(s.derived.dup_count)f.push(`疑重複填寫 ×${s.derived.dup_count}`);return f;}
const ATTN=f=>["欠學校推薦","待人工核字","缺頁","資助與評分表不符","勾選待核","資助未勾選"].includes(f)||f.startsWith("疑重複")||f==="重複填寫偏多";
function flagChip(f){const bad=f.includes("不符")||f==="缺頁"||f==="欠學校推薦"||f==="資料不足";const neutral=f==="英文文章";return `<span class="chip ${bad?"bad":neutral?"plain":"warn"}">${bad?"✗":neutral?"":"!"} ${esc(f)}</span>`;}

/* ============ 提示框 ============ */
const TIP=document.getElementById("tip");
function showTip(el,x,y){const t=el.getAttribute("data-tip");if(!t)return;TIP.textContent=t;TIP.classList.add("show");const w=TIP.offsetWidth,h=TIP.offsetHeight;let lx=x+14,ly=y+14;if(lx+w>innerWidth-8)lx=x-w-14;if(ly+h>innerHeight-8)ly=y-h-14;TIP.style.left=Math.max(8,lx)+"px";TIP.style.top=Math.max(8,ly)+"px";}
document.addEventListener("pointermove",e=>{if(e.pointerType==="touch")return;const el=e.target.closest&&e.target.closest("[data-tip]");if(el)showTip(el,e.clientX,e.clientY);else TIP.classList.remove("show");});
document.addEventListener("pointerdown",e=>{if(e.pointerType!=="touch")return;const el=e.target.closest&&e.target.closest("[data-tip]");if(el){showTip(el,e.clientX,e.clientY);clearTimeout(TIP._x);TIP._x=setTimeout(()=>TIP.classList.remove("show"),2600);}else TIP.classList.remove("show");});
document.addEventListener("scroll",()=>TIP.classList.remove("show"),true);

/* ============ 圖表 ============ */
function lookHead(title,code,extra=""){return `<div class="ph"><h3>${title}</h3><span class="look">${LOOK[code][0]}</span>${extra}</div>`;}
function isnot(code){return `<p class="isnot">${LOOK[code][1]}</p>`;}
function hbars(rows,{max,color,total,faint}={}){const m=max||Math.max(1,...rows.map(r=>r[1]));
 return rows.map(([l,v,tipx])=>{const c=typeof color==="function"?color(l):(color||"var(--neutral)");const p=total?` · ${pct(v,total)}%`:"";const f=faint&&faint(l);
  return `<div class="hb ${f?"faint":""}" data-tip="${esc(l)} · ${v}${total?" 人":""}${p}${tipx?"\n"+esc(tipx):""}"><div class="l">${esc(l)}</div><div class="b"><i style="width:${(v/m*100).toFixed(1)}%;background:${c}"></i></div><div class="v">${typeof v==="number"&&!Number.isInteger(v)?v.toFixed(1):v}${total?`（${pct(v,total)}%）`:""}</div></div>`;}).join("");}
function pairBars(rows,N,P){const m=Math.max(1,...rows.map(r=>Math.max(N?r[1]/N:0,r[2]/P)));
 return rows.map(([l,a,b])=>`<div class="pb"><div class="row"><div class="l">${esc(l)}</div><div class="bars"><i style="width:${(N?a/N:0)/m*100}%;background:var(--pMine)" data-tip="我的名單 · ${esc(l)} · ${a}／${N}"></i><i style="width:${(b/P)/m*100}%;background:var(--pPool)" data-tip="全體申請人 · ${esc(l)} · ${b}／${P}"></i></div><div class="v"><div>${a}／${N}（${pct(a,N)}%）</div><div>${b}／${P}（${pct(b,P)}%）</div></div></div></div>`).join("");}
let RID=0;const RLISTS={};
function radar(axes,{size=300,color="var(--rTal)",hl=[],dashed=false,clickable=true,cmp=null,cmpColor="var(--pMine2)",showVals=true}={}){const id="r"+(++RID);const pad=86;const Wd=size+pad*2,Ht=size+36,cx=Wd/2,cy=Ht/2,r=size/2-30,n=axes.length,max=5;
 const ang=i=>-Math.PI/2+i*2*Math.PI/n;const pt=(i,v)=>[cx+Math.cos(ang(i))*r*v/max,cy+Math.sin(ang(i))*r*v/max];
 const rings=[1,2,3,4,5].map(k=>`<polygon points="${axes.map((a,i)=>pt(i,k).join(",")).join(" ")}" fill="none" stroke="var(--grid)" stroke-width="1"/>`).join("");
 const spokes=axes.map((a,i)=>`<line x1="${cx}" y1="${cy}" x2="${pt(i,max)[0]}" y2="${pt(i,max)[1]}" stroke="var(--grid)"/>`).join("");
 const poly=`<polygon points="${axes.map((a,i)=>pt(i,a.value||0).join(",")).join(" ")}" fill="${dashed?"none":color}" style="fill-opacity:${dashed?0:"var(--rf)"}" stroke="${color}" stroke-width="2" ${dashed?'stroke-dasharray="4 2"':""} stroke-linejoin="round"/>`;
 const poly2=cmp?`<polygon points="${cmp.map((v,i)=>pt(i,v||0).join(",")).join(" ")}" fill="none" stroke="${cmpColor}" stroke-width="2" stroke-dasharray="5 3" stroke-linejoin="round"/>`:"";
 const dots=axes.map((a,i)=>{const [x,y]=pt(i,a.value||0);const [lx,ly]=pt(i,(a.value||0)+0.75);const vv=Number.isInteger(a.value)?a.value:(a.value||0).toFixed(1);return `<circle class="vx" cx="${x}" cy="${y}" r="4" fill="${color}" stroke="var(--panel)" stroke-width="2" data-tip="${esc(a.tip||a.label+" · "+vv)}"/>${showVals?`<text x="${lx}" y="${ly+4}" font-size="11" text-anchor="middle" fill="var(--muted)">${vv}</text>`:""}`;}).join("");
 const labels=axes.map((a,i)=>{const [x,y]=pt(i,max+1.05);const c=Math.cos(ang(i));const anc=Math.abs(c)<.2?"middle":c>0?"start":"end";const H=hl.includes(a.label);return `<text class="${clickable?"ax":""}" data-r="${id}" data-i="${i}" x="${x}" y="${y+4}" font-size="13" text-anchor="${anc}" font-weight="${H?700:400}">${esc(a.label)}${H?" ◆":""}</text>`;}).join("");
 RLISTS[id]=axes.map(a=>[a.label,a.list||""]);
 return `<div class="rwrap"><svg viewBox="0 0 ${Wd} ${Ht}" width="100%" style="max-width:${Wd}px;display:block;margin:0 auto" role="img" aria-label="雷達圖">${rings}${spokes}${poly2}${poly}${dots}${labels}</svg><div class="axlist" id="${id}L"></div></div>`;}
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("text.ax");if(!t)return;const id=t.dataset.r,i=+t.dataset.i,box=document.getElementById(id+"L");if(!box)return;
 if(box.dataset.i===String(i)){box.innerHTML="";box.dataset.i="";return;}const [l,html]=RLISTS[id][i];box.dataset.i=String(i);box.innerHTML=`<div class="sub small"><b>${esc(l)}</b>${html||'<div class="muted">沒有計入的獎項或活動。</div>'}<div class="micro muted" style="margin-top:4px">再點軸名收起</div></div>`;});
function lvRule(i){return i>=60?"≥60 → 5 級":i>=30?"≥30 → 4 級":i>=12?"≥12 → 3 級":i>=3?"≥3 → 2 級":i>0?"<3 → 1 級":"";}
function scaleHTML(kind,avg){const aw=[["5","≥60"],["4","≥30"],["3","≥12"],["2","≥3"],["1","有紀錄"],["0","無"]];const q=[["5","多個事例，文章與評語互證"],["4","兩個以上具體事例"],["3","一個具體事例"],["2","籠統事例"],["1","泛述或套語"],["0","未提及"]];const rows=kind==="q"?q:aw;
 return `<div class="scale"><div class="scale-h">${avg?"每軸＝229 人在該軸級別（0–5）的平均。各人級別計法：":"每環 1 級（0–5）。級別計法："}${kind==="q"?"文章及推薦評語中<b>具體事例</b>的強度":"該範疇<b>計入獎項的分數和</b>（每項＝層級 1–5 × 名次權重 冠10／亞8／季6／優異3／參與1）"}</div><div class="scale-g ${kind==="q"?"qs":""}">${rows.map(([l,t])=>`<div><b>${l}</b><span>${t}</span></div>`).join("")}</div></div>`;}
function itemList(awards,acts){const a=awards.map(x=>`<li>獎項 #${x.n} ${esc(x.event)} · ${esc(x.honour||"")} · ${x.level} ${LVL[x.level]||""} · ${x.score} 分${x.in_index?"":"（不計）"}</li>`);const b=acts.map(x=>`<li>活動 #${x.n} ${esc(x.activity||x.org)}${x.role?"（"+esc(x.role)+"）":""}</li>`);return a.length||b.length?`<ul class="axlist">${a.join("")}${b.join("")}</ul>`:"";}
function talentAxes(s){return s.cls.radar_domains.map(dm=>{const t=s.cls.talent[dm];return {label:dm,value:t.level,tip:`${dm} · ${t.level} 級\n計入分數和 ${t.index}${t.index?"（"+lvRule(t.index)+"）":t.activities?"（只有活動紀錄 → 1 級）":""}\n獎項 ${t.awards} 項／活動 ${t.activities} 項`,list:itemList(s.awards.filter(a=>a.domain===dm),s.activities.filter(a=>a.domain===dm))};});}
function qualAxes(s){return QUAL.map(([k,l])=>{const q=s.cls.qualities[k]||{level:0,quotes:[]};return {label:l,value:q.level||0,tip:`${l} · ${q.level||0} 級\n具體事例引句 ${(q.quotes||[]).length} 句（點軸名看原文）`,list:(q.quotes||[]).length?q.quotes.map(x=>`<div class="q">${esc(x.q)}<span class="p">第 ${x.p} 頁 · ${x.src==="rec"?"評語":"文章"}</span></div>`).join(""):""};});}
function steamAxes(s){return STEAM5.map(k=>{const t=(s.cls.steam||{})[k]||{level:0,awards:0,activities:0,index:0};return {label:k,value:t.level,tip:`${k} · ${t.level} 級\n計入分數和 ${t.index}${t.index?"（"+lvRule(t.index)+"）":t.activities?"（只有活動紀錄 → 1 級）":""}\n獎項 ${t.awards} 項／活動 ${t.activities} 項`,list:itemList(s.awards.filter(a=>a.steam===k),s.activities.filter(a=>a.steam===k))};});}
function ecrAxes(s){return ECR6.map(k=>{const t=(s.cls.ecr6||{})[k]||{level:0,awards:0,activities:0,index:0};return {label:k,value:t.level,tip:`${k} · ${t.level} 級\n計入分數和 ${t.index}${t.index?"（"+lvRule(t.index)+"）":t.activities?"（只有活動紀錄 → 1 級）":""}\n獎項 ${t.awards} 項／活動 ${t.activities} 項`,list:itemList(s.awards.filter(a=>a.ecr6===k),s.activities.filter(a=>a.ecr6===k))};});}
function ecrList(){return `<div class="small"><p class="muted">「天才兒童是指那些在以下一方面或多方面有特出成就或潛能的兒童：」</p><ol style="margin:6px 0 6px 20px">${META.ecr4_items.map(([k,t])=>`<li>${esc(t)}<span class="muted">（${esc(k)}）</span></li>`).join("")}</ol><a href="${META.ecr4_url}" target="_blank" rel="noopener">教育局存檔 PDF（§4.3.2，第 37 頁）↗</a><p class="micro muted" style="margin-top:4px">存檔本為重新排版本，個別字形（如「繪晝」「精關」）為排版錯字，此處按原意校正。</p></div>`;}
function ringsHTML(s){const r=s.derived.three_ring||{};const c=[["能力",r.ability,"var(--ring1)","最佳五項支持級別"],["創造力",r.creativity,"var(--ring2)","素質軸「創造力」"],["工作熱忱",r.commitment,"var(--ring3)","（堅毅軸＋有獎項紀錄年數）÷2"]];const R=32,C=2*Math.PI*R;
 return `<div class="rings">${c.map(([l,v,col,t])=>`<div class="ring" data-tip="${l} · ${v??0}／5\n${t}"><svg viewBox="0 0 88 88" width="88" height="88"><circle cx="44" cy="44" r="${R}" fill="none" stroke="var(--grid)" stroke-width="8"/><circle cx="44" cy="44" r="${R}" fill="none" stroke="${col}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${(C*((v||0)/5)).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 44 44)"/><text x="44" y="52" text-anchor="middle" font-size="24" font-weight="700">${v??0}</text><text x="66" y="80" font-size="11" fill="var(--muted)">／5</text></svg><div class="small">${l}</div></div>`).join("")}</div>`;}
function timelineHTML(s){const t=s.derived.trajectory||{timeline:[]};const tl=t.timeline||[];if(!tl.length)return '<p class="small muted">獎項表年份欄無法辨認，未能畫出。</p>';
 const by=Object.fromEntries(tl.map(x=>[x.year,x]));const y0=Math.min(...tl.map(x=>x.year)),y1=Math.max(2026,...tl.map(x=>x.year));const yrs=[];for(let y=y0;y<=y1;y++)yrs.push(y);
 const hgt=n=>n<=8?n*14:8*14+(n-8)*4;
 return `<div class="tl">${yrs.map(y=>{const x=by[y];return x?`<div class="tli" data-tip="${y} 年 · ${x.n} 項 · 最高層級 ${x.max_level} ${LVL[x.max_level]||""} · 該年最高分 ${x.best}"><div class="micro muted">${x.n} 項</div><div class="tlb" style="height:${hgt(x.n)}px;background:${lvVar(x.max_level)}"></div><div class="micro">${y}</div></div>`:`<div class="tli" data-tip="${y} 年 · 沒有獎項紀錄"><div class="tlb empty"></div><div class="micro muted">${y}</div></div>`;}).join("")}</div>`;}
function scatterSup(){const cats=["未勾選","無","書簿費半免","書簿費全免","綜援"];const w=640,h=320,pl=44,pr=16,pt=40,pb=44;const ymaxRaw=Math.max(...ST.map(s=>s.derived.best5));const ymax=Math.max(250,Math.ceil(ymaxRaw/50)*50);
 const cw=(w-pl-pr)/cats.length;const sx=i=>pl+cw*(i+.5);const sy=v=>h-pb-(v/ymax)*(h-pt-pb);
 let g="";for(let v=0;v<=ymax;v+=50)g+=`<line x1="${pl}" x2="${w-pr}" y1="${sy(v)}" y2="${sy(v)}" stroke="var(--grid)"/><text x="${pl-6}" y="${sy(v)+4}" font-size="12" text-anchor="end" fill="var(--muted)">${v}</text>`;
 const pts=ST.map(s=>{const k=s.finance.support||"未勾選";const i=cats.indexOf(k);const jx=((hash(s.id)%29)-14);return `<circle class="vx" data-open="${s.id}" cx="${sx(i)+jx}" cy="${sy(s.derived.best5)}" r="4" fill="${supVar(k)}" fill-opacity=".7" stroke="var(--panel)" stroke-width="1" data-tip="${s.id} · 最佳五項 ${s.derived.best5} · ${k}" style="cursor:pointer"/>`;}).join("");
 const meds=cats.map((k,i)=>{const a=ST.filter(s=>(s.finance.support||"未勾選")===k).map(s=>s.derived.best5);const m=median(a);return m==null?"":`<line x1="${sx(i)-24}" x2="${sx(i)+24}" y1="${sy(m)}" y2="${sy(m)}" stroke="var(--ink)" stroke-width="2" data-tip="${k} 中位數 ${m}"/>`;}).join("");
 const xl=cats.map((k,i)=>`<text x="${sx(i)}" y="${h-pb+18}" font-size="12" text-anchor="middle">${SUPSHORT[k]}</text><text x="${sx(i)}" y="${h-pb+34}" font-size="11" text-anchor="middle" fill="var(--muted)">${ST.filter(s=>(s.finance.support||"未勾選")===k).length} 人</text>`).join("");
 return `<svg viewBox="0 0 ${w} ${h}" width="100%" style="max-width:${w}px;display:block">${g}${pts}${meds}${xl}<text x="${pl}" y="16" font-size="12" fill="var(--muted)">↑ 最佳五項（分）</text></svg><div class="legend"><span><i style="background:var(--ink);height:2px"></i>該組中位數</span></div>`;}
document.addEventListener("click",e=>{const c=e.target.closest&&e.target.closest("circle[data-open]");if(c)openCard(c.dataset.open);});

/* ============ 框架 ============ */
const TABS=[["guide","使用指南"],["overview","總覽"],["table","學生總表"],["review","我的評審"],["quality","數據品質"],["fair","公平性審計"],["method","方法說明"]];
document.getElementById("subtitle").textContent=`AI 輔助報告 · 只供初選委員使用 · ${META.version}`;
function applyTheme(){document.documentElement.dataset.theme=S.theme==="dark"?"dark":"light";document.body.classList.toggle("fl",!!S.fontLarge);}
function renderTabs(){const h=TABS.map(([k,l])=>`<button class="${S.tab===k?"on":""}" data-t="${k}">${l}</button>`).join("");document.getElementById("tabs").innerHTML=h;
 document.getElementById("mDrawerIn").innerHTML=`<div class="small muted" style="margin-bottom:8px">頁籤</div>${TABS.map(([k,l])=>`<button class="tab ${S.tab===k?"on":""}" data-t="${k}">${l}</button>`).join("")}<div style="border-top:1px solid var(--line);margin:12px 0"></div><button class="tab" data-set="1">⚙ 設定</button>`;}
function go(t){S.tab=t;save();render();window.scrollTo(0,0);}
document.getElementById("tabs").addEventListener("click",e=>{const b=e.target.closest("button[data-t]");if(b)go(b.dataset.t);});
document.getElementById("menuBtn").onclick=()=>document.getElementById("mDrawer").classList.remove("hidden");
document.getElementById("mDrawer").addEventListener("click",e=>{const b=e.target.closest("button[data-t]");const st=e.target.closest("[data-set]");if(b){document.getElementById("mDrawer").classList.add("hidden");go(b.dataset.t);}else if(st){document.getElementById("mDrawer").classList.add("hidden");openSettings();}else if(e.target.id==="mDrawer")document.getElementById("mDrawer").classList.add("hidden");});
function openSettings(){const p=document.getElementById("setPop");
 p.innerHTML=`<h3 style="margin-bottom:8px">設定</h3>
 ${window.GEF_WEB?`<div class="small" style="padding:4px 0 8px">登入帳號：<b>${esc(window.GEF_USER||"")}</b></div>`:`<label>評審代號 <input type="text" id="sJudge" maxlength="12" placeholder="例：A" value="${esc(S.judge)}"></label>`}
 <label>閱讀模式 <span class="seg"><button data-th="light" class="${S.theme!=="dark"?"on":""}">淺色</button><button data-th="dark" class="${S.theme==="dark"?"on":""}">深色</button></span></label>
 <label>顯示 AI 建議分 <input type="checkbox" id="sAI" ${S.showAI?"checked":""}></label>
 <label>顯示分布提示（名單輪廓） <input type="checkbox" id="sProf" ${S.showProfile?"checked":""}></label>
 <label>字級 <span class="seg"><button data-fs="0" class="${!S.fontLarge?"on":""}">標準</button><button data-fs="1" class="${S.fontLarge?"on":""}">大</button></span></label>
 <div class="small" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--line)"><span id="syncSt" class="syncst"></span></div>
 <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">${window.GEF_ROLE==="admin"?'<a class="btn sm" href="admin.html">後台 ›</a>':""}${window.GEF_WEB?'<button class="btn sm" id="sOut">登出</button>':""}<button class="btn sm" id="sClose">完成</button></div>`;
 p.classList.remove("hidden");
 if(p.querySelector("#sJudge"))p.querySelector("#sJudge").onchange=e=>{S.judge=e.target.value.trim();save();};
 if(p.querySelector("#sOut"))p.querySelector("#sOut").onclick=()=>window.GEF_LOGOUT();
 p.querySelectorAll("[data-th]").forEach(b=>b.onclick=()=>{S.theme=b.dataset.th;save();applyTheme();openSettings();rerenderAll();});
 p.querySelectorAll("[data-fs]").forEach(b=>b.onclick=()=>{S.fontLarge=b.dataset.fs==="1";save();applyTheme();openSettings();});
 p.querySelector("#sAI").onchange=e=>{S.showAI=e.target.checked;save();rerenderAll();};
 p.querySelector("#sProf").onchange=e=>{S.showProfile=e.target.checked;save();rerenderAll();};
 p.querySelector("#sClose").onclick=()=>p.classList.add("hidden");}
document.getElementById("setBtn").onclick=()=>{const p=document.getElementById("setPop");if(p.classList.contains("hidden"))openSettings();else p.classList.add("hidden");};
document.addEventListener("click",e=>{const p=document.getElementById("setPop");if(!p.classList.contains("hidden")&&!p.contains(e.target)&&e.target.id!=="setBtn"&&!e.target.closest("#mDrawer"))p.classList.add("hidden");});
function rerenderAll(){render();if(!document.getElementById("drawer").classList.contains("hidden")&&curId)openCard(curId,true);}
function syncHeader(){const seen=Object.keys(S.seen).length,tiered=ST.filter(s=>dec(s.id).tier).length;document.getElementById("progTxt").textContent=`已看 ${seen}／${ST.length} · 已分層 ${tiered}`;const w=(tiered/ST.length*100)+"%";document.getElementById("progBar").style.width=w;document.getElementById("mprogBar").style.width=w;}
function render(){applyTheme();renderTabs();syncHeader();const v=document.getElementById("view");v.className="wrap"+(RM?"":" fadein");({guide:renderGuide,overview:renderOverview,table:renderTable,review:renderReview,quality:renderQuality,fair:renderFair,method:renderMethod})[S.tab](v);renderBbar();}

/* ============ 使用指南 ============ */
function renderGuide(v){
 v.innerHTML=`<h1>使用指南（5 分鐘）</h1><p class="lead">先讀文章和評語，再看雷達和獎項；分數只是入口。</p>
 ${META.pilot_note?`<div class="notebox" style="margin-bottom:16px">${esc(META.pilot_note)}</div>`:""}
 <div class="grid g2">
  <div class="panel"><h3 style="margin-bottom:8px">評審要做的事</h3><ol class="steps">
   <li>${window.GEF_WEB?"你已用個人帳號登入。所有分層、籃子、理由、備註<b>自動儲存到伺服器</b>；電腦和手機用同一帳號會同步。":"在右上「設定」填評審代號（Scarlett 會告訴你）。所有操作自動保存在你這部裝置的瀏覽器內。"}</li>
   <li>先做下方的<b>校準</b>：自己先評 ${META.calibration_ids.length||5} 份，再揭曉 AI 分，看看彼此差距。</li>
   <li>到「學生總表」逐位打開卡片，<b>先讀自薦文章和推薦評語</b>，再看雷達、成長軌跡及獎項明細；AI 建議分預設摺疊，讀完才展開。</li>
   <li>每看完一位，在卡片底部點分層：<b>優先入圍／考慮／暫不考慮</b>，並勾選打動你的理由。</li>
   <li>到「我的評審」整理優先入圍名單；匯出前看一眼「我的名單輪廓」，${window.GEF_WEB?"確認名單即可，結果已自動儲存（「下載備份」只作個人備份）。":"最後按<b>匯出我的評審結果</b>，把檔案傳回 Scarlett。"}</li>
  </ol></div>
  <div class="panel"><h3 style="margin-bottom:8px">幾個原則</h3>
   <p>· AI 只給建議分和原文證據；入圍名單由委員會決定。</p>
   <p>· 本屆不設盲審，姓名、學校、提名人一律顯示，請按資料本身判斷。</p>
   <p>· ${window.GEF_WEB?"你看不到其他評審的選擇；管理員（鄭校長、Scarlett）可在後台看到所有評審的結果作匯總。":"你看不到其他評審的選擇；匯出檔只含你自己的結果。"}</p>
   <p>· 分布提示只是鏡子，章程沒有配額。</p>
   <p>· ${window.GEF_WEB?"評審期結束後，學生資料會從伺服器刪除。":"完成後刪除本檔（公布結果後）。"}</p>
   <p>· 本報告含學生個資，請勿轉發。</p>
   <div class="sub small" style="margin-top:8px">目前進度：已分層 ${ST.filter(s=>dec(s.id).tier).length}／${ST.length} 位。章程約 25 名；每位評審的優先名單一般 35–45 人，純屬規模參考。</div>
  </div>
 </div>
 <h2>校準：先自己評，再看 AI</h2>
 <div class="panel" id="calbox">${calHTML()}</div>
 <h2>三套顏色怎麼讀</h2>
 <div class="panel"><div class="ph"><span class="look" style="margin:0">${LOOK.K[0]}</span></div>
  <div class="hline"><b class="small" style="width:72px">獎項層級</b>${[1,2,3,4,5].map(l=>lvChip(l)).join("")}</div>
  <div class="hline"><b class="small" style="width:72px">才能範疇</b>${["語言","邏輯數學","人際關係","空間","音樂","身體動覺","綜合學業","其他"].map(d=>domChip(d==="綜合學業"?"綜合學業／全面":d==="其他"?"其他／未勾選":d)).join("")}</div>
  <div class="hline"><b class="small" style="width:72px">資助狀況</b>${["無","書簿費半免","書簿費全免","綜援","未勾選"].map(k=>`<span class="chip plain">${supDot(k)}</span>`).join("")}</div>
  ${isnot("K")}</div>
 <h2>值得多看一眼是什麼</h2>
 <div class="panel"><p>${WATCH_INTRO}</p><div class="hline" style="margin-top:8px">${WATCH.map(([c,l])=>`<span class="chip watch">◉ ${l}</span>`).join("")}</div></div>`;
 bindCal();}
function calHTML(){
 if(!META.calibration_ids.length)return `<p class="small muted">校準樣本（5 份）待 Scarlett 指定；AI 建議分載入後啟用。做法：對指定的 5 位同學，先打開卡片讀文章（不要展開 AI 分），回來在這裡填你的級別（1–5），然後按「揭曉」。</p>`;
 const head=`<div class="kv small muted" style="grid-template-columns:1fr repeat(6,minmax(48px,1fr)) auto"><div>學生</div>${ITEMS.map(i=>`<div>${i[1].replace(/（.*/,"")}</div>`).join("")}<div></div></div>`;
 return head+META.calibration_ids.map(id=>{const s=byId[id];const c=S.calibration[id]||{};const rev=c.revealed;
  return `<div class="kv calrow" data-id="${id}" style="grid-template-columns:1fr repeat(6,minmax(48px,1fr)) auto;padding:6px 0;border-top:1px solid var(--line)"><div><a href="#" data-open="${id}">${esc(s.student.name)}（${id}）</a></div>`+
  ITEMS.map(([k])=>{const my=c[k]??"";const ai=hasAI(s)?s.ai.final[k].level:null;return `<div><select data-k="${k}" ${rev?"disabled":""}><option value="">—</option>${[1,2,3,4,5].map(n=>`<option ${my==n?"selected":""}>${n}</option>`).join("")}</select>${rev?`<div class="micro">AI ${ai??"—"}</div>`:""}</div>`;}).join("")+
  `<div>${rev?`<button class="btn sm" data-reset="${id}">重做</button>`:`<button class="btn sm primary" data-reveal="${id}">揭曉</button>`}</div></div>`;}).join("");}
function bindCal(){const box=document.getElementById("calbox");if(!box)return;
 box.addEventListener("change",e=>{const sel=e.target.closest("select");if(!sel)return;const id=sel.closest(".calrow").dataset.id;const c=S.calibration[id]||(S.calibration[id]={});c[sel.dataset.k]=sel.value===""?null:Number(sel.value);save();});
 box.addEventListener("click",e=>{const o=e.target.closest("[data-open]");if(o){e.preventDefault();openCard(o.dataset.open);return;}
  const r=e.target.closest("[data-reveal]");if(r){const id=r.dataset.reveal;const c=S.calibration[id]||(S.calibration[id]={});if(ITEMS.some(([k])=>c[k]==null)){toast("請先填滿六個級別");return;}if(!hasAI(byId[id])){toast("AI 建議分尚未載入，暫時不能揭曉");return;}c.revealed=true;c.ai=Object.fromEntries(ITEMS.map(([k])=>[k,byId[id].ai.final[k].level]));c.revealedAt=new Date().toISOString();save();box.innerHTML=calHTML();return;}
  const x=e.target.closest("[data-reset]");if(x){delete S.calibration[x.dataset.reset];save();box.innerHTML=calHTML();}});}

/* ============ 總覽 ============ */
function countRows(order,obj){return order.filter(k=>obj[k]).map(k=>[k,obj[k]]);}
function renderOverview(v){
 const N=ST.length;const b5=ST.map(s=>s.derived.best5);const med=median(b5);const attn=ST.filter(s=>flagsOf(s).some(ATTN)).length;
 const tiers={A:0,B:0,C:0,none:0};ST.forEach(s=>tiers[dec(s.id).tier||"none"]++);
 const P=POOL;
 const gRows=countRows([...GROUPS,"未勾選"],P.groups);
 v.innerHTML=`<h1>總覽</h1><p class="lead">三段：一眼數字、申請人池的形狀、深入看（預設摺疊）。</p>
 <div class="grid g4">
  <div class="panel tile"><div class="display">${N}</div><h3>申請人</h3><div class="small muted">評分表 230 行、024 缺檔、075 重複</div></div>
  <div class="panel tile"><div class="display">${med}</div><h3>最佳五項中位數</h3><div class="small muted">最高 ${Math.max(...b5)} · ≥150 共 ${b5.filter(x=>x>=150).length} 人</div></div>
  <div class="panel tile"><div class="display">${attn}</div><h3>需留意的數據標示</h3><div class="small muted">待人工核字、資助待核、欠推薦、缺頁、疑重複</div></div>
  <div class="panel tile" style="--bar:var(--tA)"><div class="display">${tiers.A}</div><h3>我的優先入圍</h3><div class="small muted">考慮 ${tiers.B} · 未分層 ${tiers.none}</div></div>
 </div>
 <h2>申請人池的形狀</h2><p class="lead">這一段就是「我的名單輪廓」用來對照的底。</p>
 <div class="grid g2">
  <div class="panel">${lookHead("提名組別（按人次）","M")}${hbars(gRows,{color:domVar,total:N})}${isnot("M")}</div>
  <div class="panel">${lookHead("政府資助狀況","N")}${hbars(countRows(SUPORD,P.support),{color:supVar,total:N})}${isnot("N")}</div>
  <div class="panel">${lookHead("年級","O")}${hbars(countRows(["P.4","P.5","P.6"],P.grade),{total:N})}${isnot("O")}</div>
  <div class="panel">${lookHead("性別","L")}${hbars(countRows(["女","男","—"],P.sex),{total:N})}${isnot("L")}</div>
  <div class="panel">${lookHead("最強才能範疇","P")}${hbars(countRows([...CORE6,"無獎項紀錄"],P.top_talent),{color:domVar,total:N})}${isnot("P")}</div>
  <div class="panel">${lookHead("六範疇有紀錄人數","Q")}${hbars(countRows(ECR6,P.ecr6),{total:N})}<p class="micro muted" style="margin-top:6px">${ECR_TITLE}：${META.ecr4_items.map(([k,t])=>esc(k)).join("、")}（全文見方法說明第六節）</p>${isnot("Q")}</div>
 </div>
 <h2>深入看</h2><p class="lead">每個面板預設摺疊，展開才畫圖。</p>
 ${[["sc","資助狀況 × 最佳五項"],["avg","四個全體平均雷達"],["traj","成長軌跡與機會標籤"],["align","提名組別與證據對照"],["dist","居住地區、檔案類型、學校類型"],["band","AI 建議分數段"]].map(([k,t])=>`<details class="box" data-lazy="${k}"><summary>${t}</summary><div class="body"></div></details>`).join("")}`;
 v.querySelectorAll("details[data-lazy]").forEach(d=>d.addEventListener("toggle",()=>{if(d.open&&!d._done){d._done=1;d.querySelector(".body").innerHTML=lazyOverview(d.dataset.lazy);}}));}
function avgAxes(keys,get){return keys.map(k=>{const vals=ST.map(s=>get(s,k)||0);const m=Math.round(vals.reduce((a,b)=>a+b,0)/ST.length*10)/10;return {label:k,value:m,tip:`${k} · 全體平均 ${m} · 有紀錄 ${vals.filter(x=>x>0).length} 人`};});}
function lazyOverview(k){const N=ST.length;
 if(k==="sc")return `${lookHead("資助狀況 × 最佳五項","I")}${scatterSup()}${isnot("I")}`;
 if(k==="avg")return `<p class="small muted" style="margin-bottom:8px">${LOOK.J[0]}</p><div class="grid g2">
  <div class="sub"><h3>才能（全體平均）</h3>${radar(avgAxes(ST[0].cls.radar_domains,(s,k)=>s.cls.talent[k].level),{color:"var(--rTal)",dashed:true,clickable:false,size:260})}${scaleHTML("aw",true)}</div>
  <div class="sub"><h3>素質（全體平均）</h3>${radar(QUAL.map(([q,l])=>{const vals=ST.map(s=>(s.cls.qualities[q]||{}).level||0);const m=Math.round(vals.reduce((a,b)=>a+b,0)/N*10)/10;return {label:l,value:m,tip:`${l} · 全體平均 ${m}`};}),{color:"var(--rQual)",dashed:true,clickable:false,size:260})}${scaleHTML("q",true)}</div>
  <div class="sub"><h3>STEAM（全體平均）</h3>${radar(avgAxes(STEAM5,(s,k)=>((s.cls.steam||{})[k]||{}).level),{color:"var(--rSteam)",dashed:true,clickable:false,size:260})}${scaleHTML("aw",true)}</div>
  <div class="sub"><h3>六個資優範疇（全體平均）</h3>${radar(avgAxes(ECR6,(s,k)=>((s.cls.ecr6||{})[k]||{}).level),{color:"var(--rEcr)",dashed:true,clickable:false,size:260})}${scaleHTML("aw",true)}</div></div>${isnot("J")}`;
 if(k==="traj")return `${lookHead("成長軌跡與機會標籤","H")}${hbars([["持續三年以上有紀錄",ST.filter(s=>(s.derived.trajectory||{}).sustained3).length],["層級逐年上升",ST.filter(s=>(s.derived.trajectory||{}).rising).length],["校內紀錄為主",ST.filter(s=>((s.derived.opportunity||{}).tags||[]).includes("校內紀錄為主")).length],["無收費賽事",ST.filter(s=>((s.derived.opportunity||{}).tags||[]).includes("無收費賽事")).length],["收費賽事佔半數以上",ST.filter(s=>((s.derived.opportunity||{}).tags||[]).includes("收費賽事佔半數以上")).length]],{total:N})}${isnot("H")}`;
 if(k==="align")return `<div class="ph"><h3>提名組別與證據對照</h3><span class="look">看學校勾選的組別與獎項活動實際集中的範疇是否吻合。</span></div>${hbars(["一致","部分一致","不一致","無法對照"].map(r=>[r,ST.filter(s=>(s.derived.nomination_alignment||{}).result===r).length]).filter(r=>r[1]),{total:N})}<p class="isnot">不是評分；學校勾選與紀錄不同，可能是學校看到了表格以外的才華。</p>`;
 if(k==="dist"){const dist={};ST.forEach(s=>{const d=s.student.district||"—";dist[d]=(dist[d]||0)+1;});const kd={};ST.forEach(s=>{const x=({text:"文字層",scan:"掃描",mixed:"混合"})[s.file.kind]||s.file.kind;kd[x]=(kd[x]||0)+1;});
  return `<div class="grid g2"><div><div class="ph"><h3>居住地區（十八區）</h3><span class="look">看申請人居住地區的分布。</span></div>${hbars(Object.entries(dist).sort((a,b)=>b[1]-a[1]),{total:N})}<p class="isnot">不是評審依據；地區只取自申請表地址欄。</p></div><div><div class="ph"><h3>檔案類型</h3><span class="look">看申請表是掃描件還是電子填寫。</span></div>${hbars(Object.entries(kd),{total:N})}<p class="isnot">與學生表現無關，只反映學校遞交方式。</p>
   <div class="ph" style="margin-top:16px"><h3>學校類型</h3><span class="look">看申請人就讀學校的類型。</span></div>${META.has_school_type?hbars(Object.entries(POOL.school_type),{total:N}):'<div class="ph-hold">學校類型對照待補（本輪未取得教育局公開學校資料）</div>'}<p class="isnot">不是評審依據。</p></div></div>`;}
 if(k==="band"){if(!META.has_ai)return '<div class="ph-hold">待評分：評分錨點經委員會確認後補入</div>';if(!S.showAI)return '<p class="small muted">AI 建議分已隱藏；可在「設定」開啟。</p>';const bands={};ST.forEach(s=>{if(hasAI(s))bands[s.ai.band]=(bands[s.ai.band]||0)+1;});return hbars(["高","中高","中","待商","不完整"].filter(k=>bands[k]).map(k=>[k,bands[k]]),{total:N});}
 return "";}

/* ============ 學生總表 ============ */
let TF={g:"",sup:"",grade:"",tier:"",flag:"",w:"",q:"",sort:"id",dir:1};
function photoThumb(s,w=32,h=40){return s.photo?`<img class="thumb" src="${s.photo}" alt="" style="width:${w}px;height:${h}px">`:`<div class="thumb sil" style="width:${w}px;height:${h}px">${silSVG()}</div>`;}
function silSVG(){return `<svg viewBox="0 0 40 50" width="100%" height="100%"><circle cx="20" cy="18" r="9" fill="var(--grid)"/><path d="M4 50c0-11 7-18 16-18s16 7 16 18z" fill="var(--grid)"/></svg>`;}
function filtered(){return ST.filter(s=>(!TF.g||(TF.g==="未勾選"?!s.nomination.groups.length:s.nomination.groups.includes(TF.g)))&&(!TF.sup||(s.finance.support||"未勾選")===TF.sup)&&(!TF.grade||s.student.grade_norm===TF.grade)&&(!TF.tier||(dec(s.id).tier||"none")===TF.tier)&&(!TF.flag||flagsOf(s).includes(TF.flag))&&(!TF.w||(TF.w==="any"?s.watch.length:s.watch.some(w=>w.code===TF.w)))&&(!TF.q||(s.id+s.student.name+(s.student.name_en||"")+s.student.school).toLowerCase().includes(TF.q.toLowerCase())));}
function renderTable(v){
 const rows=filtered();
 const sortv=s=>({id:s.id,school:s.student.school,tier:({A:1,B:2,C:3})[dec(s.id).tier]||9,best5:s.derived.best5,tot:s.derived.total,chars:s.essay.lang==="en"?s.essay.words:s.essay.chars,total:hasAI(s)?(s.ai.incomplete?-1:s.ai.total):-2})[TF.sort]??s.id;
 rows.sort((a,b)=>{const x=sortv(a),y=sortv(b);return (x>y?1:x<y?-1:0)*TF.dir;});
 const allFlags=[...new Set(ST.flatMap(flagsOf))].sort();
 const ai=S.showAI;
 const th=(k,l,t="")=>`<th ${k?`data-s="${k}"`:""} ${t?`data-tip="${t}"`:""}>${l}${TF.sort===k?(TF.dir>0?" ▲":" ▼"):""}</th>`;
 v.innerHTML=`<h1>學生總表</h1><p class="lead">點任何一行打開卡片。${ai?"":"AI 建議分已隱藏（可在設定開啟）。"}</p>
 <div class="filters">
  <select id="fG"><option value="">全部組別</option>${[...GROUPS,"未勾選"].map(g=>`<option ${TF.g===g?"selected":""}>${g}</option>`).join("")}</select>
  <select id="fS"><option value="">全部資助</option>${SUPORD.map(g=>`<option ${TF.sup===g?"selected":""}>${g}</option>`).join("")}</select>
  <select id="fY"><option value="">全部年級</option>${["P.4","P.5","P.6"].map(g=>`<option ${TF.grade===g?"selected":""}>${g}</option>`).join("")}</select>
  <select id="fT"><option value="">籃子／分層：全部</option>${[["A","優先入圍"],["B","考慮"],["C","暫不考慮"],["none","未分層"]].map(([k,l])=>`<option value="${k}" ${TF.tier===k?"selected":""}>${l}</option>`).join("")}</select>
  <select id="fF"><option value="">全部標示</option>${allFlags.map(f=>`<option ${TF.flag===f?"selected":""}>${esc(f)}</option>`).join("")}</select>
  <select id="fW" data-tip="${esc(WATCH_INTRO)}"><option value="">值得多看一眼：全部</option><option value="any" ${TF.w==="any"?"selected":""}>只看有標籤</option>${WATCH.map(([c,l])=>`<option value="${c}" ${TF.w===c?"selected":""}>◉ ${l}</option>`).join("")}</select>
  <input id="fQ" placeholder="編號／姓名／學校" value="${esc(TF.q)}" style="width:160px">
  <span class="small muted">${rows.length} 人</span>
 </div>
 <p class="micro muted" style="margin:-4px 0 8px">◉ ${S4}</p>
 <div class="tscroll dtable" style="max-height:calc(100vh - 260px)"><table class="t"><thead><tr>
  ${th("id","編號")}<th>相片</th><th>姓名</th>${th("school","學校")}<th>年級</th><th>提名組別</th><th>資助</th><th data-tip="值得多看一眼">◉</th><th>標示</th>${th("tier","放入籃子","優先入圍／考慮；再按一下移出")}${ai?`${th("total","AI 分數段")}<th>六細項</th>`:""}${th("best5","最佳五項","計入獎項最高 5 項相加")}${th("tot","全部合計","計入獎項全部相加")}${th("chars","文章字數")}
 </tr></thead><tbody>${rows.map(s=>`<tr data-open="${s.id}" class="${dec(s.id).tier?"in"+dec(s.id).tier:""}" style="cursor:pointer">
  <td class="mono">${S.seen[s.id]?"·":""}${s.id}</td><td>${photoThumb(s)}</td><td>${esc(s.student.name)}<div class="micro muted">${esc(s.student.name_en||"")}</div></td><td>${esc(s.student.school)}${STY(s)?`<div class="micro muted">${esc(STY(s))}</div>`:""}</td><td>${esc(s.student.grade_norm||s.student.grade)}</td>
  <td>${s.nomination.groups.map(domChip).join("")||'<span class="chip plain">未勾選</span>'}</td><td style="white-space:nowrap">${supDot(s.finance.support)}</td>
  <td>${s.watch.length?`<span class="chip watch" data-tip="${esc(s.watch.map(w=>"◉ "+w.label).join("\n"))}">◉ ${s.watch.length}</span>`:""}</td>
  <td>${flagsOf(s).filter(ATTN).map(flagChip).join("")}</td><td style="white-space:nowrap">${bkBtns(s.id)}</td>
  ${ai?`<td>${hasAI(s)?`<span class="band">${s.ai.band}</span> ${s.ai.total}`:"待評分"}</td><td class="mono small">${hasAI(s)?ITEMS.map(([k])=>s.ai.final[k].level??"—").join("·"):"—"}</td>`:""}
  <td class="num mono">${s.derived.best5}</td><td class="num mono">${s.derived.total}</td><td class="num mono">${s.essay.lang==="en"?s.essay.words+"（英）":s.essay.chars}</td></tr>`).join("")}</tbody></table></div>
 <div class="mrows">${rows.map(s=>`<div class="mrow ${dec(s.id).tier?"in"+dec(s.id).tier:""}" data-open="${s.id}"><div class="r1">${photoThumb(s,40,50)}<div><b>${esc(s.student.name)}</b> <span class="mono small muted">${s.id}</span> <span class="small">${esc(s.student.grade_norm||"")}</span><div class="micro muted">${esc(s.student.school)}</div></div></div><div style="margin-top:6px">${s.nomination.groups.map(domChip).join("")||'<span class="chip plain">未勾選</span>'}${s.watch.length?`<span class="chip watch">◉ ${s.watch.length}</span>`:""}</div><div class="small" style="margin-top:4px">${supDot(s.finance.support)} · 最佳五項 <b>${s.derived.best5}</b>／全部 ${s.derived.total} · 字數 ${s.essay.lang==="en"?s.essay.words:s.essay.chars}</div><div style="margin-top:8px">${bkBtns(s.id)}</div></div>`).join("")}</div>`;
 const re=()=>renderTable(v);
 v.querySelector("#fG").onchange=e=>{TF.g=e.target.value;re();};v.querySelector("#fS").onchange=e=>{TF.sup=e.target.value;re();};v.querySelector("#fY").onchange=e=>{TF.grade=e.target.value;re();};v.querySelector("#fT").onchange=e=>{TF.tier=e.target.value;re();};v.querySelector("#fF").onchange=e=>{TF.flag=e.target.value;re();};v.querySelector("#fW").onchange=e=>{TF.w=e.target.value;re();};
 v.querySelector("#fQ").oninput=e=>{TF.q=e.target.value.trim();re();const q=v.querySelector("#fQ");q.focus();q.setSelectionRange(q.value.length,q.value.length);};
 v.querySelectorAll("th[data-s]").forEach(h=>h.onclick=()=>{if(TF.sort===h.dataset.s)TF.dir*=-1;else{TF.sort=h.dataset.s;TF.dir=1;}re();});
 v.querySelectorAll("[data-open]").forEach(a=>a.onclick=e=>{e.preventDefault();openCard(a.dataset.open);});
 bindBk(v);}
function bindBk(root){root.querySelectorAll("[data-bk]").forEach(b=>b.onclick=e=>{e.stopPropagation();e.preventDefault();const id=b.dataset.id;const t=setTier(id,b.dataset.bk);
  root.querySelectorAll(`.bk:has([data-id="${id}"])`).forEach(w=>{w.outerHTML=bkBtns(id);});
  root.querySelectorAll(`[data-open="${id}"]`).forEach(r=>{r.classList.remove("inA","inB","inC");if(t)r.classList.add("in"+t);});
  bindBk(root);toast(t?`已放入「${TIERS[t]}」籃子`:"已移出籃子");});}

/* ============ 學生卡片 ============ */
let curId=null;
function orderIds(){const r=document.getElementById("view")&&S.tab==="table"?filtered().map(s=>s.id):null;return r&&r.length&&r.includes(curId)?r:ST.map(s=>s.id);}
function topFive(s){return s.awards.filter(a=>a.in_index).sort((a,b)=>b.score-a.score||a.n-b.n).slice(0,5).map(a=>a.n);}
function watchChips(s){return s.watch.map((w,i)=>`<span class="chip watch" data-w="${i}">◉ ${esc(w.label)}</span>`).join("");}
function watchBox(w){const q=w.quote;return `<div class="sub small" style="margin-top:6px"><b>◉ ${esc(w.label)}</b>：${esc(w.why)}${q?`<div class="q">${esc(q.q)}<span class="p">${q.p?`第 ${q.p} 頁 · `:""}${esc(q.src||"")}</span></div>`:""}<div class="micro muted">${S4}</div></div>`;}
function openCard(id,keepScroll){const prevScroll=keepScroll?document.getElementById("sheet").scrollTop:0;curId=id;const s=byId[id];S.seen[id]=true;save();syncHeader();const ids=orderIds(),i=ids.indexOf(id);const d=dec(id);
 const aiOpen=S.showAI||S.expandAI[id];const sh=document.getElementById("sheet");const o=s.derived.opportunity||{};const t=s.derived.trajectory||{};
 const sig=s.signatures?["student","parent","nominator","principal","school_chop"].map((k,j)=>`${["學生","家長","提名人","校長","校印"][j]}${s.signatures[k]?"✓":"✗"}`).join(" "):"";
 const nm=s.nomination.nominator_name;
 const ph=s.photo?`<img class="photo" src="${s.photo}" alt="學生相片">`:`<div class="photo sil">${silSVG()}<div class="micro" style="padding:4px">${s.photo_status==="none"?"表格無相片":"相片待裁"}</div></div>`;
 const dmRows=s.cls.radar_domains.concat(["綜合學業","其他"]).map(dm=>[dm,s.cls.talent[dm]]).filter(([dm,x])=>x&&(x.awards||x.activities));
 sh.innerHTML=`<div class="cbar"><button class="btn sm" id="cPrev" ${i<=0?"disabled":""}>‹<span class="hm"> 上一位</span></button><button class="btn sm" id="cClose"><span class="hm">關閉 </span>✕</button><span class="mono" style="font-weight:600">${s.id}</span><span class="chip plain">${esc(s.student.grade_norm||s.student.grade)}</span><span class="sp"></span><button class="btn sm" id="cPrint">列印本卡</button><a class="btn sm primary" href="${esc(s.drive_url)}" target="_blank" rel="noopener" data-tip="${s.drive_found?"在主辦方 Google Drive 開啟該生申請表；需先獲主辦方授權存取。":"此編號未在資料夾找到，請在資料夾內搜尋編號"}">${s.drive_found?"開啟原表 ↗":"開啟主辦方資料夾 ↗"}</a><button class="btn sm" id="cNext" ${i>=ids.length-1?"disabled":""}><span class="hm">下一位 </span>›</button></div>
 <div class="cjump">${[["sec-dash","儀表板"],["sec-traj","成長軌跡"],["sec-awards","活動與獎項"],["sec-essay","自薦文章"],["sec-rec","推薦評語"],["sec-ai","AI 建議分"],["sec-review","我的評審"]].map(([k,l])=>`<button data-j="${k}">${l}</button>`).join("")}</div>
 <div class="cbody">
 <div class="panel"><div class="chead">
  <div>${ph}</div>
  <div style="min-width:0">
   <h1 style="margin:0">${esc(s.student.name)} <span class="small muted" style="font-weight:400">${esc(s.student.name_en||"")}</span></h1>
   <div class="hline">${esc(s.student.school)} ${STY(s)?`<span class="small muted">${esc(STY(s))}</span>`:""} · ${esc(s.student.grade_norm||s.student.grade)} · ${esc(s.student.district||"地區未填")} · 出生 ${esc(s.student.birth_year||"—")}</div>
   <div class="hline">${s.nomination.groups.map(domChip).join("")||'<span class="chip" style="--c:var(--d8)">未勾選</span>'}<span class="small">提名人：${esc(nomName(s))}（${esc(nomRole(s))}）${nm&&/□/.test(nm)?' <span class="chip warn">! 待核</span>':""}</span><span class="small muted">其他獎學金：${esc(s.nomination.other_scholarship||"—")}</span></div>
   <div class="hline small">${supDot(s.finance.support)}${(s.finance.support||"未勾選")==="未勾選"?' <span class="chip warn">! 待核</span>':""}${s.xlsx.support_match===false?' <span class="chip warn">! 與評分表不符</span>':""}${s.finance.other_hardship?` <span class="muted">其他經濟困難：${esc(s.finance.other_hardship)}</span>`:""}<span class="micro muted">簽署 ${sig}</span></div>
   ${s.watch.length?`<div class="hline" id="wChips">${watchChips(s)}</div><div id="wBox"></div>`:""}
   <div class="sub small" style="margin-top:8px">${hasAI(s)&&(s.ai.summary||[]).length?(s.ai.summary||[]).map(l=>`<div>· ${esc(l)}</div>`).join(""):'<span class="muted">三行摘要待評分層補入。</span>'}</div>
  </div>
  <div class="tiles">
   <div class="panel tile" style="--bar:${lvVar(s.derived.award_support_level)};margin-bottom:8px"><div class="micro muted">最佳五項</div><div class="display">${s.derived.best5}</div><div class="micro muted">支持 ${s.derived.award_support_level} 級（暫定）</div></div>
   <div class="panel tile" style="margin-bottom:8px"><div class="micro muted">全部合計</div><div class="display">${s.derived.total}</div><div class="micro muted">共 ${s.derived.awards_n} 項，計入 ${s.derived.awards_in_index} 項</div></div>
   <div class="panel tile"><div class="micro muted">持續年數</div><div class="display">${t.years_with_awards||0}</div><div class="micro muted">${[t.sustained3?"持續三年以上有紀錄":"",t.rising?"層級逐年上升":""].filter(Boolean).join(" · ")||"有獎項紀錄的年數"}</div></div>
  </div>
 </div>
 <div class="ecrdots">${ECR6.map(k=>`<span class="${s.ecr6_has.includes(k)?"on":""}">${k}</span>`).join("")}<span class="micro" style="margin-left:auto">教統會六範疇有紀錄者</span></div></div>

 <section class="sec" id="sec-dash"><h2 style="margin-top:0">能力與素質儀表板 <span class="small muted" style="font-weight:400">描述性分析，不是評分</span></h2>
  <div class="grid g2 dash2">
   <div class="panel">${lookHead("才能雷達","A")}${radar(talentAxes(s),{color:"var(--rTal)",hl:s.nomination.groups})}${scaleHTML("aw")}<p class="micro muted">◆ 為學校提名組別；把滑鼠移到（手機點按）頂點看該軸分數和；點軸名看計入的獎項及活動。</p>${isnot("A")}</div>
   <div class="panel">${lookHead("素質雷達","B")}${radar(qualAxes(s),{color:"var(--rQual)"})}${scaleHTML("q")}<p class="micro muted">點軸名看引句原文。</p>${isnot("B")}</div>
   <div class="panel">${lookHead("STEAM 雷達","C")}${radar(steamAxes(s),{color:"var(--rSteam)"})}${scaleHTML("aw")}<p class="micro muted">非 STEAM 項目：${Object.entries((s.cls.steam||{})._非STEAM||{}).filter(([k,v])=>v).map(([k,v])=>`${k} ${v}`).join("、")||"—"}</p>${isnot("C")}</div>
   <div class="panel"><div class="ph"><h3>${ECR_TITLE}</h3><span class="look">${LOOK.D[0]}</span></div>${radar(ecrAxes(s),{color:"var(--rEcr)"})}${scaleHTML("aw")}<details class="box noprint-card" style="margin:8px 0 0"><summary class="small">六個範疇全文</summary><div class="body">${ecrList()}</div></details>${isnot("D")}</div>
  </div>
  <div class="panel" style="margin-top:16px">${lookHead("資優三環對照","E")}${ringsHTML(s)}${isnot("E")}</div>
  <div class="grid g2" style="margin-top:16px">
   <div class="panel">${lookHead("範疇紀錄分布","F")}<table class="t"><thead><tr><th>範疇</th><th>獎項</th><th>最高層級</th><th>活動</th></tr></thead><tbody>${dmRows.map(([dm,x])=>`<tr><td style="box-shadow:inset 4px 0 0 ${domVar(dm)};padding-left:12px">${dm}</td><td class="num">${x.awards}</td><td>${x.awards?lvChip(x.best_level):"—"}</td><td class="num">${x.activities}</td></tr>`).join("")||'<tr><td colspan="4" class="muted">沒有紀錄</td></tr>'}</tbody></table>${isnot("F")}</div>
   <div class="panel">${lookHead(`首要價值觀 <span class="small muted" style="font-weight:400">${VALUES12.filter(v=>(s.cls.values[v]||{}).lit).length}／12</span>`,"G")}<div class="badges">${VALUES12.map(v=>{const x=s.cls.values[v]||{};return x.lit?`<button class="badge lit" data-v="${esc(v)}">✓ ${v}</button>`:`<span class="badge">${v}</span>`;}).join("")}</div><div id="vBox"></div>${isnot("G")}</div>
  </div></section>

 <section class="sec p2" id="sec-traj"><div class="panel">${lookHead("成長軌跡與機會對照","H")}${timelineHTML(s)}
  <div class="hline">${t.sustained3?'<span class="chip plain">持續三年以上有紀錄</span>':""}${t.rising?'<span class="chip plain">層級逐年上升</span>':""}${(o.tags||[]).map(x=>`<span class="chip plain">${esc(x)}</span>`).join("")}<span class="small muted">校外佔比 ${o.external_share==null?"—":Math.round(o.external_share*100)+"%"} · 收費賽事佔 ${o.paid_share==null?"—":Math.round(o.paid_share*100)+"%"}</span></div>
  <p class="micro muted">柱高＝該年項數，柱色＝該年最高層級（琥珀愈深層級愈高）；灰色短底座＝該年沒有獎項紀錄。</p>${isnot("H")}</div></section>

 <section class="sec" id="sec-awards"><details class="box" open><summary>活動（${s.activities.length}）及獎項（${s.awards.length}）<span class="small muted" style="font-weight:400">最佳五項 <b style="color:var(--goldText)">${s.derived.best5}</b> ｜ 全部合計 ${s.derived.total}（計入 ${s.derived.awards_in_index}／${s.awards.length}）· 考級 ${s.derived.grading_exams} · 商業賽 ${s.derived.commercial_awards} · 疑重複 ${s.derived.dup_count}${s.derived.same_event_capped?` · 同賽事超額 ${s.derived.same_event_capped}`:""}</span></summary><div class="body">
  <h3 style="margin:8px 0">校內及校外活動或服務</h3>
  <div class="tscroll"><table class="t stack"><thead><tr><th>#</th><th>年份</th><th>機構</th><th>活動</th><th>職位</th><th>範疇</th><th>頁</th></tr></thead><tbody>${s.activities.map(a=>`<tr><td data-l="#">${a.n}</td><td data-l="年份">${esc(a.year)}</td><td data-l="機構">${esc(a.org)}</td><td data-l="活動">${esc(a.activity)}</td><td data-l="職位">${esc(a.role||"")}</td><td>${domChip(a.domain)}</td><td class="muted" data-l="頁">${a.page}</td></tr>`).join("")||'<tr><td colspan="7" class="muted">沒有活動紀錄</td></tr>'}</tbody></table></div>
  <h3 style="margin:16px 0 8px">獎項、嘉許狀、證書（全部列出）</h3>
  <div class="tscroll"><table class="t stack"><thead><tr><th>#</th><th>年份</th><th>比賽／活動</th><th>主辦</th><th>榮譽</th><th>範疇</th><th>層級</th><th>名次</th><th>分</th><th>備註</th></tr></thead><tbody>${(()=>{const t5=topFive(s);return s.awards.map(a=>{const top=a.in_index&&t5.includes(a.n);return `<tr class="${a.in_index?"":"dim"}"><td data-l="#">${a.n}</td><td data-l="年份">${esc(a.year)}</td><td data-l="比賽">${esc(a.event)}</td><td data-l="主辦">${esc(a.organiser)}</td><td data-l="榮譽">${esc(a.honour)}</td><td>${domChip(a.domain)}</td><td data-tip="${esc(a.level_note||"")}">${lvChip(a.level)}</td><td data-l="名次">${a.rank_w} ${esc(a.rank_label||"")}</td><td class="mono" data-l="分" style="${top?"color:var(--goldText);font-weight:700":""}">${a.score}${top?' <span class="micro">最佳五項</span>':""}</td><td class="small" data-l="備註">${[a.team?"團體":"",a.commercial?"商":"",a.grading_exam?"考級不計":"",a.duplicate_of_earlier?`疑重複（同 #${a.duplicate_of}）`:"",a.cap_same_event?"同賽事超額不計":""].filter(Boolean).join("、")}</td></tr>`;}).join("")||'<tr><td colspan="10" class="muted">獎項頁不存在</td></tr>';})()}</tbody></table></div>
  ${s.derived.dup_count?`<div class="warnbox" style="margin-top:8px">文書核對：獎項表有 ${s.derived.dup_count} 項與較早項目內容相同（年份、名稱、主辦、榮譽去除標點及字形差異後一致），計分只計一次；可能是填錯或重複填寫，供評審參考。</div>`:""}
  <p class="micro muted" style="margin-top:8px">${esc(META.index_rule)} 灰字行為不計入指數的項目。暫定規則，待委員會確認。</p></div></details></section>

 <section class="sec" id="sec-essay"><h2>學生自薦文章 <span class="small muted" style="font-weight:400">${s.essay.lang==="en"?s.essay.words+" 字（英文）":s.essay.chars+" 字"} · 第 ${(s.essay.pages||[]).join("、")} 頁</span>${s.essay.confidence&&s.essay.confidence!=="high"?' <span class="chip warn">! 讀取信心 '+esc(s.essay.confidence)+'</span>':""}</h2><div class="essay">${esc(s.essay.text)}</div></section>
 <section class="sec" id="sec-rec"><h2>學校推薦評語 <span class="small muted" style="font-weight:400">${s.recommendation.missing?"":s.recommendation.chars+" 字 · 第 "+(s.recommendation.pages||[]).join("、")+" 頁"}</span>${s.recommendation.missing?' <span class="chip bad">✗ 欠學校推薦</span>':""}${s.recommendation.confidence&&s.recommendation.confidence!=="high"&&!s.recommendation.missing?' <span class="chip warn">! 讀取信心 '+esc(s.recommendation.confidence)+'</span>':""}</h2>${s.recommendation.missing?'<div class="warnbox">此生檔案沒有學校推薦評語。推薦評語及資助狀況列「資料不足」。</div>':`<div class="essay">${esc(s.recommendation.text)}</div>`}</section>
 ${s.finance.essay_evidence&&s.finance.essay_evidence.length?`<details class="box"><summary>家境相關原句（${s.finance.essay_evidence.length}）</summary><div class="body">${s.finance.essay_evidence.map(q=>`<div class="q">${esc(q.quote)}<span class="p">第 ${q.page} 頁</span></div>`).join("")}</div></details>`:""}
 <section class="sec noprint-card" id="sec-ai">${!hasAI(s)?`<div class="panel"><b>AI 建議分：待評分</b><div class="small muted">評分錨點經委員會確認後補入；分類層、雷達及獎項分數不受影響。</div></div>`:aiBox(s,aiOpen)}</section>
 ${(s.flags||[]).length?`<details class="box noprint-card"><summary>抽取標示（${s.flags.length}）</summary><div class="body"><ul class="axlist">${s.flags.map(f=>`<li>${esc(f)}</li>`).join("")}</ul>${s.transcription_notes?`<p class="small muted">轉錄註：${esc(s.transcription_notes)}</p>`:""}</div></details>`:""}
 <section class="sec noprint-card" id="sec-review"><div class="panel"><h2 style="margin-top:0">我的評審</h2>
  <div class="tierbtns">${Object.entries(TIERS).map(([k,l])=>`<button class="${k} ${d.tier===k?"on":""}" data-tier="${k}">${l}</button>`).join("")}</div>
  <div class="small muted" style="margin-top:8px">打動我的是（可多選）：</div><div class="reasons">${REASONS.map(r=>`<button class="${d.reasons.includes(r)?"on":""}" data-r="${r}">${r}</button>`).join("")}</div>
  <details class="box" style="margin-top:12px"><summary class="small">調整三大準則評分（可選）</summary><div class="body"><div class="small muted">留空即接受 AI 建議；填寫即以你的級別為準（1–5）。</div>${ITEMS.map(([k,l])=>`<div style="display:flex;justify-content:space-between;align-items:center;padding:4px 0;border-top:1px solid var(--line)"><span class="small">${l}</span><select data-ov="${k}"><option value="">AI ${hasAI(s)?(s.ai.final[k].level??"—"):"—"}</option>${[1,2,3,4,5].map(n=>`<option ${d.override[k]==n?"selected":""}>${n}</option>`).join("")}</select></div>`).join("")}</div></details>
  <div class="small muted" style="margin:8px 0 4px">備註（只有你看到，會隨結果匯出）</div><textarea class="note" id="cNote">${esc(d.note)}</textarea>
  <div class="small muted" id="cStat" style="margin-top:6px">${statTxt(d)}</div></div></section>
 </div>
 <div class="abar"><div class="tierbtns">${Object.entries(TIERS).map(([k,l])=>`<button class="${k} ${d.tier===k?"on":""}" data-tier="${k}">${l}</button>`).join("")}</div><button class="btn sm primary" id="cNext2" ${i>=ids.length-1?"disabled":""}>下一位 ›</button></div>`;
 document.getElementById("drawer").classList.remove("hidden");document.body.style.overflow="hidden";sh.scrollTop=prevScroll;renderBbar();
 const $=q=>sh.querySelector(q);
 $("#cClose").onclick=closeCard;$("#cPrev").onclick=()=>openCard(ids[i-1]);$("#cNext").onclick=()=>openCard(ids[i+1]);$("#cNext2").onclick=()=>openCard(ids[i+1]);
 $("#cPrint").onclick=()=>{document.body.classList.add("print-card");setTimeout(()=>{window.print();},50);};
 sh.querySelectorAll("[data-j]").forEach(b=>b.onclick=()=>{const el=sh.querySelector("#"+b.dataset.j);if(el)sh.scrollTo({top:el.offsetTop-100,behavior:RM?"auto":"smooth"});});
 sh.querySelectorAll("[data-w]").forEach(c=>c.onclick=()=>{const box=$("#wBox");const k=c.dataset.w;if(box.dataset.k===k){box.innerHTML="";box.dataset.k="";}else{box.dataset.k=k;box.innerHTML=watchBox(s.watch[+k]);}});
 sh.querySelectorAll("[data-v]").forEach(c=>c.onclick=()=>{const box=$("#vBox");const k=c.dataset.v;if(box.dataset.k===k){box.innerHTML="";box.dataset.k="";return;}box.dataset.k=k;const x=s.cls.values[k]||{};box.innerHTML=`<div class="sub small" style="margin-top:8px"><b>${esc(k)}</b>${(x.quotes||[]).map(q=>`<div class="q">${esc(q.q)}<span class="p">第 ${q.p} 頁 · ${q.src==="rec"?"評語":"文章"}</span></div>`).join("")}</div>`;});
 sh.querySelectorAll("[data-tier]").forEach(b=>b.onclick=()=>{setTier(id,b.dataset.tier);const dd=dec(id);sh.querySelectorAll("[data-tier]").forEach(x=>x.classList.toggle("on",x.dataset.tier===dd.tier));$("#cStat").textContent=statTxt(dd);syncHeader();toast(dd.tier?`已標「${TIERS[dd.tier]}」`:"已取消分層");});
 sh.querySelectorAll("[data-r]").forEach(b=>b.onclick=()=>{const dd=dec(id);const r=b.dataset.r;dd.reasons=dd.reasons.includes(r)?dd.reasons.filter(x=>x!==r):[...dd.reasons,r];touch(id);b.classList.toggle("on");});
 sh.querySelectorAll("[data-ov]").forEach(sel=>sel.onchange=()=>{const dd=dec(id);if(sel.value==="")delete dd.override[sel.dataset.ov];else dd.override[sel.dataset.ov]=Number(sel.value);touch(id);});
 $("#cNote").onchange=e=>{dec(id).note=e.target.value;touch(id);};
 const ab=$("#aiBox");if(ab)ab.addEventListener("toggle",()=>{if(ab.open)S.expandAI[id]=true;else delete S.expandAI[id];save();});}
function statTxt(d){return d.tier?`已分層：${TIERS[d.tier]} · ${new Date(d.updatedAt).toLocaleString("zh-HK",{hour12:false})}`:"尚未分層";}
window.addEventListener("afterprint",()=>document.body.classList.remove("print-card"));
function aiBox(s,open){const a=s.ai;return `<details class="box" id="aiBox" ${open?"open":""}><summary>AI 建議分（預設摺疊，請讀完文章再展開）</summary><div class="body">
 <div style="margin:4px 0 8px">加權總分 <b class="display" style="font-size:24px">${a.incomplete?`${a.total}／${a.max_weight}`:a.total}</b> <span class="band">${a.band}</span>${a.review_needed?' <span class="chip bad">✗ 需人手覆核</span>':""} <span class="small muted">（兩次評分總分 ${(a.pass_totals||[]).join("、")}）</span></div>
 ${a.review_needed?`<div class="warnbox">需人手覆核：${(a.review_reasons||[]).join("；")}</div>`:""}
 ${ITEMS.map(([k,l,w])=>{const f=a.final[k];return `<div class="score"><div><b>${l}</b><div class="small muted">權重 ${w}</div></div><div class="display" style="font-size:22px">${f.level??"—"}<span class="micro muted">／5</span><div class="micro muted">兩次 ${f.p1??"—"}、${f.p2??"—"}</div></div><div>${(f.quotes||[]).slice(0,4).map(q=>`<div class="q">${esc(q.q)}<span class="p">第 ${q.p} 頁</span></div>`).join("")}<div class="small muted">${[...new Set((f.reasons||[]).filter(Boolean))].map(r=>"· "+esc(r)).join("<br>")}</div></div></div>`;}).join("")}
 </div></details>`;}
function closeCard(){document.getElementById("drawer").classList.add("hidden");if(document.getElementById("bdrawer").classList.contains("hidden"))document.body.style.overflow="";if(curId){delete S.expandAI[curId];save();}render();if(!document.getElementById("bdrawer").classList.contains("hidden"))renderBasket();}
document.getElementById("drawer").addEventListener("click",e=>{if(e.target.id==="drawer")closeCard();});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&!document.getElementById("drawer").classList.contains("hidden"))closeCard();});

/* ============ 名單畫像（我的評審頁及籃子共用） ============ */
const POOL_AVG={};
function avgOf(list,get){if(!list.length)return 0;return Math.round(list.reduce((a,s)=>a+(get(s)||0),0)/list.length*10)/10;}
function famAxes(fam){return fam==="t"?[CORE6,(s,k)=>s.cls.talent[k].level]:fam==="q"?[QUAL.map(x=>x[0]),(s,k)=>(s.cls.qualities[k]||{}).level]:fam==="st"?[STEAM5,(s,k)=>((s.cls.steam||{})[k]||{}).level]:[ECR6,(s,k)=>((s.cls.ecr6||{})[k]||{}).level];}
function portraitRadar(L,fam,title){const [keys,get]=famAxes(fam);const lab=fam==="q"?Object.fromEntries(QUAL):null;
 const pool=keys.map(k=>POOL_AVG[fam+k]??(POOL_AVG[fam+k]=avgOf(ST,s=>get(s,k))));
 const axes=keys.map((k,i)=>{const m=avgOf(L,s=>get(s,k));return {label:lab?lab[k]:k,value:m,tip:`${lab?lab[k]:k}\n你的名單平均 ${m}\n全體申請人平均 ${pool[i]}`};});
 return `<div class="sub"><h3 class="small" style="margin-bottom:4px">${title}</h3>${radar(axes,{color:"var(--pMine)",cmp:pool,clickable:false,size:240,showVals:false})}</div>`;}
function portraitHTML(ids,label){const N=ids.length,P=ST.length;const L=ids.map(id=>byId[id]).filter(Boolean);
 if(N===0)return `<p class="small">${S2}</p>`;
 const c=fn=>{const m={};L.forEach(s=>{const v=fn(s);(Array.isArray(v)?v:[v]).forEach(k=>m[k]=(m[k]||0)+1);});return m;};
 const dims=[["提名組別（人次）",[...GROUPS,"未勾選"],c(s=>s.nomination.groups.length?s.nomination.groups:["未勾選"]),POOL.groups],
  ["最強才能範疇",[...CORE6,"無獎項紀錄"],c(s=>s.student.top_talent),POOL.top_talent],
  ["六範疇有紀錄",ECR6,c(s=>s.ecr6_has),POOL.ecr6],
  ["性別",["女","男","—"],c(sexTxt),POOL.sex],
  ["資助狀況",SUPORD,c(s=>s.finance.support||"未勾選"),POOL.support],
  ["年級",["P.4","P.5","P.6"],c(s=>s.student.grade_norm||"—"),POOL.grade]];
 if(META.has_school_type)dims.push(["學校類型",["官立","資助","直資","私立","其他","未對照"],c(s=>s.student.school_type),POOL.school_type]);
 const dmine=c(s=>s.student.district||"—");
 const med=median(L.map(s=>s.derived.best5)),pmed=META.med_best5;const w=L.filter(s=>s.watch.length).length,pw=ST.filter(s=>s.watch.length).length;
 return `<p class="small" style="font-weight:600">${S1}</p>${N<5?`<p class="small muted">${S2b}</p>`:""}
 <div class="grid g3" style="margin:12px 0">
  <div class="sub"><div class="micro muted">${esc(label)}人數</div><div class="display" style="font-size:28px">${N}</div><div class="micro muted">全體申請人 ${P}</div></div>
  <div class="sub"><div class="micro muted">最佳五項中位數</div><div class="display" style="font-size:28px">${med}</div><div class="micro muted">全體申請人 ${pmed}</div></div>
  <div class="sub"><div class="micro muted">有「值得多看一眼」標籤</div><div class="display" style="font-size:28px">${w}<span class="small muted">／${N}</span></div><div class="micro muted">全體申請人 ${pw}／${P}（${pct(pw,P)}%）</div></div>
 </div>
 <h3 style="margin:16px 0 4px">能力畫像</h3>
 <div class="ph"><span class="look" style="margin:0">看名單內學生在四組指標的平均級別（實線），與全體申請人平均（虛線）並排。</span></div>
 <div class="legend"><span><i style="background:var(--pMine)"></i>你的名單平均</span><span><i style="background:none;border-top:2px dashed var(--pMine2);height:0"></i>全體申請人平均</span></div>
 <div class="grid g2 pgrid">${portraitRadar(L,"t","才能（六組）")}${portraitRadar(L,"q","素質（三大元素＋價值觀）")}${portraitRadar(L,"st","STEAM")}${portraitRadar(L,"e","六個資優範疇")}</div>
 <p class="micro muted">把滑鼠移到（手機點按）頂點看兩個平均數。</p><p class="isnot">不是目標線；平均高或低都不代表名單好壞，只是名單的形狀。各軸 0–5 級計法見卡片雷達下方說明。</p>
 <h3 style="margin:20px 0 4px">名單輪廓</h3>
 <div class="legend"><span><i style="background:var(--pMine)"></i>你的名單（${N} 人）</span><span><i style="background:var(--pPool)"></i>全體申請人（${P} 人）</span></div>
 <div class="grid g2">${dims.map(([t,ord,m,pool])=>`<div><h3 class="small" style="margin-top:8px">${t}</h3>${pairBars(ord.filter(k=>(pool[k]||0)>0||(m[k]||0)>0).map(k=>[k,m[k]||0,pool[k]||0]),N,P)}</div>`).join("")}</div>
 <details class="box" style="margin-top:12px"><summary class="small">地區（只列名單內有的區）</summary><div class="body">${pairBars(Object.keys(dmine).sort((a,b)=>dmine[b]-dmine[a]).map(k=>[k,dmine[k],POOL.district[k]||0]),N,P)}</div></details>`;}
let PSEL="A";
function selIds(sel){const A=S.order.filter(id=>dec(id).tier==="A"&&byId[id]);ST.forEach(s=>{if(dec(s.id).tier==="A"&&!A.includes(s.id))A.push(s.id);});const B=ST.filter(s=>dec(s.id).tier==="B").map(s=>s.id);return sel==="A"?A:sel==="B"?B:[...A,...B];}
function selSeg(){return `<span class="seg" id="pSel">${[["A","優先入圍"],["B","考慮"],["AB","兩者合併"]].map(([k,l])=>`<button data-ps="${k}" class="${PSEL===k?"on":""}">${l}（${selIds(k).length}）</button>`).join("")}</span>`;}
function bindSel(root,redraw){root.querySelectorAll("[data-ps]").forEach(b=>b.onclick=()=>{PSEL=b.dataset.ps;redraw();});}

/* ============ 我的評審 ============ */
function itemHTML(id,mv,extra=""){const s=byId[id];return `<div class="item" draggable="${mv}" data-id="${id}">${mv?'<span class="h">⠿</span>':""}<span class="mono small">${id}</span><span class="nm">${esc(s.student.name)} ${s.nomination.groups.map(domChip).join("")} <span class="dot" style="--c:${supVar(s.finance.support||"未勾選")}" data-tip="${esc(s.finance.support||"未勾選")}"></span>${s.watch.length?`<span class="chip watch">◉ ${s.watch.length}</span>`:""}</span><button class="btn sm" data-open="${id}">看</button>${extra}${mv?`<span class="mv"><button data-up="${id}" aria-label="上移">▲</button><button data-dn="${id}" aria-label="下移">▼</button></span>`:""}</div>`;}
function bindOrder(root,redraw){root.querySelectorAll("[data-up],[data-dn]").forEach(b=>b.onclick=()=>{const id=b.dataset.up||b.dataset.dn,i=S.order.indexOf(id),j=b.dataset.up?i-1:i+1;if(j<0||j>=S.order.length)return;[S.order[i],S.order[j]]=[S.order[j],S.order[i]];save();redraw();});
 let dragId=null;root.querySelectorAll(".item[draggable=true]").forEach(el=>{el.addEventListener("dragstart",e=>{dragId=el.dataset.id;el.classList.add("drag");e.dataTransfer.effectAllowed="move";});el.addEventListener("dragend",()=>el.classList.remove("drag"));el.addEventListener("dragover",e=>e.preventDefault());el.addEventListener("drop",e=>{e.preventDefault();const to=el.dataset.id;if(!dragId||dragId===to)return;const o=S.order.filter(x=>x!==dragId);o.splice(o.indexOf(to),0,dragId);S.order=o;save();redraw();});});}
function renderReview(v){
 const A=selIds("A");S.order=A;
 const B=selIds("B"),C=ST.filter(s=>dec(s.id).tier==="C").map(s=>s.id),Nn=ST.filter(s=>!dec(s.id).tier).map(s=>s.id);
 v.innerHTML=`<div class="rtool"><h1>我的評審</h1><span class="small muted">已分層 ${ST.length-Nn.length}／${ST.length}</span><span style="flex:1"></span><button class="btn primary" id="exp">${window.GEF_WEB?"下載備份":"匯出我的評審結果"}</button><label class="btn">匯入<input type="file" id="imp" accept="application/json" style="display:none"></label>${window.GEF_WEB?"":'<button class="btn" id="clr">清除</button>'}<label class="btn sm"><input type="checkbox" id="profTg" ${S.showProfile?"checked":""}> 顯示名單輪廓及畫像</label></div>
 <div id="clrBox"></div>
 <div class="grid g3">
  <div class="panel"><h3>優先入圍（${A.length}）</h3><p class="micro muted">章程約 25 名；每位評審的優先名單一般 35–45 人，純屬規模參考</p><div class="list" id="listA">${A.map(id=>itemHTML(id,true)).join("")||'<p class="small muted">尚未放入。可在學生總表每行按「☆ 優先」。</p>'}</div></div>
  <div class="panel"><h3>考慮（${B.length}）</h3><div class="list">${B.map(id=>itemHTML(id,false)).join("")||'<p class="small muted">尚無</p>'}</div></div>
  <div class="panel"><h3>暫不考慮（${C.length}）</h3><div class="list">${C.map(id=>itemHTML(id,false)).join("")||'<p class="small muted">尚無</p>'}</div></div>
 </div>
 ${S.showProfile?`<div class="panel" style="margin-top:16px"><div class="ph" style="align-items:center"><h2 style="margin:0">我的名單輪廓及能力畫像</h2><span style="flex:1"></span>${selSeg()}</div><div id="pBody">${portraitHTML(selIds(PSEL),PSEL==="A"?"優先入圍":PSEL==="B"?"考慮":"兩者合併")}</div></div>`:""}
 <details class="box" ${Nn.length?"open":""} style="margin-top:16px"><summary>未分層（${Nn.length}）</summary><div class="body">${Nn.length?`<div class="ngrid">${Nn.map(id=>`<button data-open="${id}"><span class="mono">${id}</span> ${esc(byId[id].student.name)}</button>`).join("")}</div>`:'<p class="small muted">全部已分層，可以匯出。</p>'}</div></details>
 <p class="small muted" style="margin-top:8px">${S.judge?"":"請先在右上「設定」填評審代號，才能匯出。"}優先入圍可拖放排序（電腦），手機請用 ▲▼；次序只作參考，匯總時主要計被選人次。</p>`;
 v.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openCard(b.dataset.open));
 v.querySelector("#profTg").onchange=e=>{S.showProfile=e.target.checked;save();renderReview(v);};
 bindSel(v,()=>renderReview(v));bindOrder(v,()=>renderReview(v));
 v.querySelector("#exp").onclick=()=>{if(!S.judge){toast("請先在設定填評審代號");openSettings();return;}
  const decisions=Object.fromEntries(ST.map(s=>{const d=Object.assign({},dec(s.id));d.blindAtDecision=false;return [s.id,d];}));
  const out={schema:"gef16-review-v1",judge:S.judge,exported_at:new Date().toISOString(),report_version:META.version,report_built:META.built,blind_now:false,decisions,priority_order:S.order,calibration:S.calibration,students_in_report:ST.map(s=>s.id)};
  const blob=new Blob([JSON.stringify(out,null,1)],{type:"application/json"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=`評審結果_${S.judge}_${new Date().toISOString().slice(0,10).replace(/-/g,"")}.json`;document.body.appendChild(a);a.click();a.remove();toast(window.GEF_WEB?"已下載備份（結果已自動儲存）":"已匯出，請把檔案傳回 Scarlett");};
 v.querySelector("#imp").onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{const j=JSON.parse(r.result);if(j.schema!=="gef16-review-v1")throw 0;S.judge=j.judge||S.judge;S.decisions=j.decisions||{};Object.values(S.decisions).forEach(d=>{if(d)d.blindAtDecision=false;});S.order=j.priority_order||[];S.calibration=j.calibration||{};Object.keys(S.decisions).forEach(id=>{if(S.decisions[id]&&S.decisions[id].tier)S.seen[id]=true;});save();render();toast("已匯入");}catch(x){toast("檔案格式不對");}};r.readAsText(f);};
 if(v.querySelector("#clr"))v.querySelector("#clr").onclick=()=>{v.querySelector("#clrBox").innerHTML=`<div class="warnbox" style="margin-bottom:12px">確定清除本機所有分層、理由、備註及校準紀錄？建議先匯出。 <button class="btn sm" id="clrY">確定清除</button> <button class="btn sm" id="clrN">取消</button></div>`;v.querySelector("#clrY").onclick=()=>{try{localStorage.removeItem(KEY);}catch(e){}const th=S.theme;S=load();S.theme=th;save();render();toast("已清除");};v.querySelector("#clrN").onclick=()=>v.querySelector("#clrBox").innerHTML="";};}

/* ============ 籃子（瀏覽時收納；與我的評審同一份資料） ============ */
let BTAB="A";
function renderBbar(){const b=document.getElementById("bbar");if(!b)return;const A=selIds("A").length,B=selIds("B").length;
 const show=S.tab!=="review"&&document.getElementById("drawer").classList.contains("hidden");b.classList.toggle("hidden",!show);
 b.innerHTML=`<div class="wrap bbar-in"><span class="small"><b>我的籃子</b></span><span class="chip" style="--c:var(--tA)">★ 優先入圍 <b>${A}</b></span><span class="chip" style="--c:var(--tB)">◆ 考慮 <b>${B}</b></span><span class="micro muted hm">在總表每行按 ☆ 優先／◇ 考慮放入</span><span style="flex:1"></span><button class="btn sm primary" id="bOpen">打開籃子 ›</button></div>`;
 b.querySelector("#bOpen").onclick=openBasket;}
function openBasket(){document.getElementById("bdrawer").classList.remove("hidden");document.body.style.overflow="hidden";renderBasket();}
function closeBasket(){document.getElementById("bdrawer").classList.add("hidden");document.body.style.overflow="";render();}
function renderBasket(){const sh=document.getElementById("bsheet");const A=selIds("A"),B=selIds("B");const list=BTAB==="A"?A:B;const prev=sh.scrollTop;
 const extra=id=>`<button class="btn sm" data-mv="${id}">${BTAB==="A"?"移到考慮":"移到優先"}</button><button class="btn sm" data-rm="${id}" aria-label="移出籃子">✕</button>`;
 sh.innerHTML=`<div class="cbar"><h3 style="margin:0">我的籃子</h3><span class="sp"></span><button class="btn sm" id="bToReview">到「我的評審」匯出 ›</button><button class="btn sm" id="bClose">關閉 ✕</button></div>
 <div class="cbody">
  <div class="seg" style="margin-bottom:12px"><button data-bt="A" class="${BTAB==="A"?"on":""}">★ 優先入圍（${A.length}）</button><button data-bt="B" class="${BTAB==="B"?"on":""}">◆ 考慮（${B.length}）</button></div>
  <div class="panel"><div class="list">${list.map(id=>itemHTML(id,BTAB==="A",extra(id))).join("")||`<p class="small muted">籃子是空的。在學生總表每行按「${BTAB==="A"?"☆ 優先":"◇ 考慮"}」放入。</p>`}</div>${BTAB==="A"&&A.length>1?'<p class="micro muted">拖放或 ▲▼ 調次序；次序只作參考。</p>':""}</div>
  <div class="panel" style="margin-top:16px"><div class="ph" style="align-items:center"><h2 style="margin:0">籃子畫像</h2><span style="flex:1"></span>${selSeg()}</div>${portraitHTML(selIds(PSEL),PSEL==="A"?"優先入圍":PSEL==="B"?"考慮":"兩者合併")}</div>
 </div>`;
 sh.scrollTop=prev;
 sh.querySelector("#bClose").onclick=closeBasket;sh.querySelector("#bToReview").onclick=()=>{document.getElementById("bdrawer").classList.add("hidden");document.body.style.overflow="";go("review");};
 sh.querySelectorAll("[data-bt]").forEach(b=>b.onclick=()=>{BTAB=b.dataset.bt;renderBasket();});
 sh.querySelectorAll("[data-open]").forEach(b=>b.onclick=()=>openCard(b.dataset.open));
 sh.querySelectorAll("[data-mv]").forEach(b=>b.onclick=()=>{setTier(b.dataset.mv,BTAB==="A"?"B":"A");renderBasket();});
 sh.querySelectorAll("[data-rm]").forEach(b=>b.onclick=()=>{setTier(b.dataset.rm,dec(b.dataset.rm).tier);renderBasket();toast("已移出籃子");});
 bindSel(sh,renderBasket);bindOrder(sh,renderBasket);}
document.getElementById("bdrawer").addEventListener("click",e=>{if(e.target.id==="bdrawer")closeBasket();});

/* ============ 數據品質 ============ */
let QF={q:"",only:false};
function renderQuality(v){
 const groups=[...new Set(META.organiser_items.map(x=>x.組))];
 v.innerHTML=`<h1>數據品質</h1><p class="lead">只列事實，不作推斷。</p>
 <div class="tscroll"><table class="t"><thead><tr><th>項目</th><th>實況</th><th>處理</th></tr></thead><tbody>${D.quality.map(q=>`<tr><td style="white-space:nowrap">${esc(q.項目)}</td><td>${esc(q.實況)}</td><td>${esc(q.處理)}</td></tr>`).join("")}</tbody></table></div>
 <h2>需主辦方處理或確認的事項</h2><p class="lead">數字化及報告製作過程中發現、需要主辦方跟進的事項，集中列出；只用編號，不寫姓名。主辦方回覆後更新。</p>
 ${groups.map((g,gi)=>`<details class="box" ${gi<2?"open":""}><summary>${esc(g)}（${META.organiser_items.filter(x=>x.組===g).length}）</summary><div class="body"><div class="tscroll"><table class="t stack"><thead><tr><th>編號</th><th>事項</th><th>建議</th></tr></thead><tbody>${META.organiser_items.filter(x=>x.組===g).map(x=>`<tr><td class="mono small" data-l="編號" style="max-width:220px">${esc(x.編號)}</td><td data-l="事項">${esc(x.事項)}</td><td data-l="建議">${esc(x.建議)}</td></tr>`).join("")}</tbody></table></div></div></details>`).join("")}
 <h2>逐人交叉核對及標示</h2>
 <div class="filters"><input id="qQ" placeholder="編號篩選，例 179" value="${esc(QF.q)}" style="width:160px"><label class="small"><input type="checkbox" id="qOnly" ${QF.only?"checked":""}> 只看有標示</label></div>
 <div id="qSegs"></div>
 <p class="small muted" style="margin-top:8px">組別一致 ${ST.filter(s=>s.xlsx.groups_match===true).length}、不一致 ${ST.filter(s=>s.xlsx.groups_match===false).length}；資助一致 ${ST.filter(s=>s.xlsx.support_match===true).length}、不一致 ${ST.filter(s=>s.xlsx.support_match===false).length}、未能核對 ${ST.filter(s=>s.xlsx.support_match==null).length}。不一致以申請表勾選為準並標示，由委員會決定。</p>`;
 const draw=()=>{const rows=ST.filter(s=>(!QF.q||s.id.includes(QF.q))&&(!QF.only||flagsOf(s).length||s.photo_status!=="ok"||!s.drive_found));const segs=[];for(let i=0;i<230;i+=50){const r=rows.filter(s=>+s.id>i&&+s.id<=i+50);if(r.length)segs.push([`${String(i+1).padStart(3,"0")}–${String(Math.min(i+50,230)).padStart(3,"0")}`,r]);}
  const ck=x=>x==null?'<span class="chip plain">無法核對</span>':x?'<span class="chip ok">✓ 一致</span>':'<span class="chip bad">✗ 不一致</span>';
  v.querySelector("#qSegs").innerHTML=segs.map(([l,r])=>`<details class="box" ${QF.q?"open":""}><summary>${l}（${r.length} 人）</summary><div class="body"><div class="tscroll" style="max-height:70vh"><table class="t stack"><thead><tr><th>編號</th><th>姓名</th><th>組別一致</th><th>資助一致</th><th>檔案</th><th>相片</th><th>原表連結</th><th>標示</th></tr></thead><tbody>${r.map(s=>`<tr><td class="mono" data-l="編號"><a href="#" data-open="${s.id}">${s.id}</a></td><td data-l="姓名">${esc(s.student.name)}</td><td>${ck(s.xlsx.groups_match)}</td><td>${ck(s.xlsx.support_match)}</td><td class="small" data-l="檔案">${s.file.pages} 頁 · ${({text:"文字層",scan:"掃描",mixed:"混合"})[s.file.kind]||""}</td><td class="small" data-l="相片">${s.photo_status==="ok"?"有":s.photo_status==="none"?"表格無相片":"相片待裁"}</td><td class="small" data-l="原表連結">${s.drive_found?"✓":"✗ 未找到"}</td><td>${flagsOf(s).map(flagChip).join("")}</td></tr>`).join("")}</tbody></table></div></div></details>`).join("")||'<p class="small muted">沒有符合的編號。</p>';
  v.querySelectorAll("#qSegs [data-open]").forEach(a=>a.onclick=e=>{e.preventDefault();openCard(a.dataset.open);});};
 draw();
 v.querySelector("#qQ").oninput=e=>{QF.q=e.target.value.trim();draw();};v.querySelector("#qOnly").onchange=e=>{QF.only=e.target.checked;draw();};}

/* ============ 公平性審計 ============ */
function renderFair(v){
 const grpMed=(keys,fn,val)=>keys.map(k=>{const a=ST.filter(s=>fn(s)===k).map(val);return [`${k}（${a.length}）`,a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length):0,a.length];});
 const grpMedian=(keys,fn,val)=>keys.map(k=>{const a=ST.filter(s=>fn(s)===k).map(val);return [`${k}（${a.length}）`,a.length?median(a):0,a.length];});
 const faintN=rows=>l=>{const r=rows.find(x=>x[0]===l);return r&&r[2]<10;};
 const panel=(t,rows,note="")=>`<div class="panel">${lookHead(t,"R")}${hbars(rows.map(r=>[r[0],r[1]]),{max:Math.max(150,...rows.map(r=>r[1])),faint:faintN(rows)})}${rows.some(r=>r[2]<10)?'<p class="micro muted">淡色：人數少，不作比較。</p>':""}${note}${isnot("R")}</div>`;
 const hold=(t,s)=>`<div class="panel"><div class="ph"><h3>${t}</h3><span class="look">${s}</span></div><div class="ph-hold">待 AI 分</div></div>`;
 const sup=grpMed(SUPORD,s=>s.finance.support||"未勾選",s=>s.derived.best5);
 const sex=grpMedian(["女","男","—"],sexTxt,s=>s.derived.best5);
 const lang=grpMed(["中文","英文"],s=>s.essay.lang==="en"?"英文":"中文",s=>s.derived.best5);
 const ai=META.has_ai&&S.showAI;const sc=ST.filter(s=>hasAI(s)&&!s.ai.incomplete);
 const aiPanels=()=>{const avg=(fn)=>{const m={};sc.forEach(s=>fn(s).forEach(k=>(m[k]=m[k]||[]).push(s.ai.total)));return Object.entries(m).map(([k,a])=>[`${k}（${a.length}）`,Math.round(a.reduce((x,y)=>x+y,0)/a.length*10)/10,a.length]);};
  const diffs=[];sc.forEach(s=>ITEMS.forEach(([k])=>{const f=s.ai.final[k];if(f.p1!=null&&f.p2!=null)diffs.push(Math.abs(f.p1-f.p2));}));
  return `<div class="panel"><h3>兩次評分一致性</h3>${hbars([["完全相同",diffs.filter(d=>d===0).length],["相差 1 級",diffs.filter(d=>d===1).length],["相差 ≥2 級",diffs.filter(d=>d>=2).length]])}</div>
  ${panel("平均總分 × 資助狀況",avg(s=>[s.finance.support||"未勾選"]))}${panel("平均總分 × 提名組別",avg(s=>s.nomination.groups.length?s.nomination.groups:["未勾選"]))}`;};
 v.innerHTML=`<h1>公平性審計</h1><p class="lead">${META.has_ai?"":"以下只顯示不涉分數的部分；涉及分數的圖表保留位置，評分後補入。"}</p>
 <div class="grid g2">
  ${panel("平均最佳五項 × 資助狀況",sup)}
  ${panel("最佳五項中位數 × 性別",sex,'<p class="micro muted">只列中位數及人數。</p>')}
  ${META.has_school_type?panel("最佳五項 × 學校類型",grpMed(["官立","資助","直資","私立","其他","未對照"],s=>s.student.school_type,s=>s.derived.best5)):`<div class="panel"><div class="ph"><h3>最佳五項 × 學校類型</h3><span class="look">${LOOK.R[0]}</span></div><div class="ph-hold">學校類型對照待補</div></div>`}
  ${panel("平均最佳五項 × 文章語言",lang)}
  ${hold("學校類型及地區 × 邊緣帶","看入圍邊緣帶的學生來自哪些學校類型及地區。")}
  ${ai?aiPanels():hold("兩次評分一致性","看兩次獨立評分的細項相差多少。")+hold("總分 × 資助、× 組別","看不同資助狀況及提名組別的總分中位數。")}
  ${hold("文章字數 × 總分","看篇幅長短與分數有沒有關係。")}
 </div>`;}

/* ============ 方法說明 ============ */
function renderMethod(v){
 const secs=[
 ["m1","一、AI 做與不做",`<div class="grid g2"><div class="sub"><h3>AI 做</h3><p>· 逐頁讀取申請表，整理成結構化資料卡，每欄記頁碼；每份由兩次獨立抽取逐項比對裁決，格式驗證通過後凍結。</p><p>· 按統一的主辦機構對照表及層級規則，為每項獎項定層級與名次，算出整數分及兩個指數（最佳五項、全部合計）。</p><p>· 由文章及評語抽出具體事例，繪製才能、素質、STEAM、六個資優範疇雷達及價值觀徽章；計算成長軌跡、機會對照、提名對照。</p><p>· 按同一套錨點給六個細項 1–5 級建議分，每級附原文引句；每份兩次獨立評分，差異大者標「需人手覆核」。</p><p>· 與評分表預填資料交叉核對，列出不一致。</p></div><div class="sub"><h3>AI 不做</h3><p>· 不決定入圍，不排名次，只顯示分數段。</p><p>· 不判斷文章是否他人代寫。</p><p>· 找不到證據不推測；缺頁標「資料不足」。</p><p>· 不看篇幅、文筆；只認具體事例。</p><p>· 不設配額，不提供建議名單。</p></div></div>`],
 ["m2","二、計分",`<div class="tscroll"><table class="t"><thead><tr><th>準則</th><th>細項</th><th>權重</th><th>主要證據來源</th></tr></thead><tbody><tr><td rowspan="4">潛能和表述 45%</td><td>①潛能、表現、成績</td><td>15</td><td>獎項表（每項層級×名次＝整數分；最佳五項為參考指數）、活動表、文章</td></tr><tr><td>②願景</td><td>10</td><td>文章</td></tr><tr><td>③處理逆境</td><td>10</td><td>文章（只看行動與反思）</td></tr><tr><td>④發展需要</td><td>10</td><td>文章（獎學金用途）</td></tr><tr><td>推薦人評語 30%</td><td>學校推薦</td><td>30</td><td>第 (二) 部分評語（只看具體事例）</td></tr><tr><td>經濟、家境和需要 25%</td><td>暫定規則</td><td>25</td><td>資助勾選、其他經濟困難、文章及評語中的家境證據</td></tr></tbody></table></div><p class="small muted" style="margin-top:8px">加權總分 = Σ（級別 ÷ 5 × 權重）。分數段：高 ≥80、中高 70–79、中 60–69、待商 &lt;60。細項分配 15／10／10／10 暫定，待委員會確認。章程準則 2「待人處事態度、對家庭及社會的承擔」作為願景及逆境的證據面向，不另設分。</p>`],
 ["m3","三、評分錨點",anchorsHTML()],
 ["m3b","三之二、儀表板計法",`<p>· 才能雷達六軸：語言、邏輯數學、人際關係、空間、音樂、身體動覺（基金章程提名組別，「全面才能組」不設軸），每軸指數＝該範疇計入獎項的分數和；≥60→5、≥30→4、≥12→3、≥3→2、有紀錄→1。</p><p>· 素質雷達六軸：高層次思維、創造力、個人及社交能力（教育局資優教育三大元素）；堅毅、責任與承擔、仁愛與同理（《小學教育課程指引》2024 首要價值觀）；每軸 0–5 為具體事例的強度，附引句及頁碼。</p><p>· STEAM 雷達按賽事及活動名稱歸類；六個資優範疇雷達按${ECR_TITLE}歸類；兩者同樣以計入分數和換算 0–5 級。</p><p>· 資優三環（Renzulli, 1978）：能力＝最佳五項支持級別、創造力＝素質軸、工作熱忱＝堅毅軸與持續年數。</p><p>· 全部描述性，不進入 45／30／25 計分。</p>`],
 ["m4","四、暫定項目",`<p>· 經濟分級：綜援 5 ／ 書簿費全免 4 ／ 半免 3 ／ 無資助但有可核困難 2 ／ 無 1；有資助且另有具體困難 +1，上限 5。</p><p>· 獎項層級：國際 5 ／ 全國 4 ／ 全港 3 ／ 地區學界機構 2 ／ 校內 1；商業收費競賽最高 2；考級不計。</p><p>· ${esc(META.index_rule)}</p><p>· 校際音樂節／朗誦節：冠亞季 10／8／6、優良 3、良好 1；藝術類按分數段頒發的金／銀 3、銅 1。</p><p>· 文書核對：獎項表內容完全相同者視為疑重複填寫，只計一次，不自動扣分。</p><p>· 同校提名超過兩名（章程上限）只標示不處理。</p>`],
 ["m5","五、對照框架及出處",`<ul class="src"><li><b>${ECR_TITLE}</b>：§4.3.2；全文見第六節。</li><li><b>資優教育三大元素</b>：高層次思維技巧、創造力、個人及社交能力。<a href="https://www.edb.gov.hk/tc/curriculum-development/curriculum-area/gifted/index.html" target="_blank" rel="noopener">教育局資優教育網頁</a>。</li><li><b>三層架構推行模式</b>：第三層「在校外為特別資優學生，提供特定的專門訓練學習機會」；「閃耀之星」屬校外培育，定位呼應第三層，官方未點名任何機構。</li><li><b>多元智能</b>：教育局原則「資優的定義應擴闊，並採用多元智能的概念」；基金章程七個提名組別即此概念。</li><li><b>首要培育的價值觀和態度（十二個）</b>：《小學教育課程指引》（2024）。<a href="https://edb.gov.hk/attachment/tc/curriculum-development/major-level-of-edu/primary/curriculum-documents/Primary_Education_Curriculum_Guide/PECG%202024_ch1.pdf" target="_blank" rel="noopener">PDF</a>。</li><li><b>資優教育基金（Gifted Education Foundation）</b>：「閃耀之星」資助「在不同範疇有卓越表現或另類才華而家庭資源貧乏的資優兒童」。<a href="https://gef.org.hk/" target="_blank" rel="noopener">gef.org.hk</a>。</li><li><b>章程評審準則</b>：卓越表現及潛質；待人處事的態度，對家庭及社會的承擔；就讀學校的推薦；學生的家境狀況。小四至小六；每校最多提名兩名；名額約 25。</li><li><b>資優三環概念</b>：Renzulli, J. S. (1978). What makes giftedness? <i>Phi Delta Kappan</i>, 60(3), 180–184.</li><li>注意：教育局 2016 年另設「資優教育基金」（Gifted Education <i>Fund</i>），與本基金不是同一機構。</li></ul>`],
 ["m6","六、六個資優範疇全文",`<h3>${ECR_TITLE}</h3>${ecrList()}`],
 ["m7","七、為何提供分布提示、為何不設配額",`<p>在『我的評審』頁，你會看到一個『我的名單輪廓』。放這面鏡子，是因為 229 份申請表逐份讀完，人很難記得自己選了多少個同一類型的學生；就像課室裡老師點名回答問題，不是誰答得不好，而是視線自然落在某些角落。輪廓只把你自己名單的形狀放在全體申請人旁邊給你看，沒有目標線，沒有建議人數。基金章程沒有任何配額，宗旨是資助在不同範疇有卓越表現或另類才華而家庭資源貧乏的學生；看見之後是否調整，完全由每位評審按專業判斷決定。同一道理，『值得多看一眼』標籤只是把資料裡容易被略過的事實標出來，不加分、不排序，最後入圍名單由委員會決定。</p>`],
 ["m8","八、本屆不設盲審",`<p>本屆初選不設盲審：委員會認為資料來源透明有助評審核對提名人及學校背景；評審請按資料本身判斷。</p>`],
 ["m9","九、原表存取與相片",`<p>卡片『開啟原表』按鈕連到主辦方 Google Drive 資料夾內該生的申請表 PDF；評審須先獲主辦方授權存取該資料夾，否則會看到『需要存取權』；報告本身不內嵌任何申請表。相片取自申請表第一頁相片欄，只作辨認用途，不影響評分；表格無相片者顯示剪影。</p><p class="warnbox" style="margin-top:8px">原表連結可直接開啟申請表全文，請勿把連結或本報告轉發給初選委員以外的人。</p>`],
 ["m10","十、個資",`${window.GEF_WEB?"<p><b>網站版：</b>學生資料存於有登入及權限控制的資料庫（新加坡機房）；評審只能讀寫自己的評審紀錄，管理員可看所有紀錄，所有改動有操作紀錄；評審期結束後刪除雲端學生資料。</p>":""}<p>資料層完整抽取申請表所有欄位並只存於本機；報告建置時剝離聯絡資料，只保留居住地區（十八區）、出生年份、簽署完整性（有／無）及提名人姓名與職位。本報告不載地址、電話、出生日期、家長姓名、簽名、學校聯絡資料；只發給初選委員；請勿轉發、上傳或放入其他工具；公布結果後請刪除。匯出的評審結果檔只含編號、分層、理由、覆寫、備註及校準分。</p>`]];
 v.innerHTML=`<h1>方法說明</h1><p class="lead">本頁供委員會理解及存檔。</p><div class="mlay"><nav class="toc panel">${secs.map(([k,t])=>`<a href="#${k}" data-sec="${k}">${t}</a>`).join("")}</nav><div>${secs.map(([k,t,h])=>`<details class="box" open id="${k}" style="scroll-margin-top:80px"><summary>${t}</summary><div class="body">${h}</div></details>`).join("")}</div></div>`;
 v.querySelectorAll("[data-sec]").forEach(a=>a.onclick=e=>{e.preventDefault();const el=document.getElementById(a.dataset.sec);el.open=true;window.scrollTo({top:el.getBoundingClientRect().top+scrollY-72,behavior:RM?"auto":"smooth"});});}
function anchorsHTML(){const A={
 "①潛能表現成績（15）":["可核實的高層級成就（全港／全國／國際前三或同等），與提名組別一致","地區或學界級前三、或全港級入圍／優異，或某範疇連續多年突出紀錄","校內或地區級獲獎、代表隊成員，表現穩定；或無獎項但有具體作品、職務、老師佐證的另類才華","有參與紀錄，獎項以參與／優異為主，或才華只見自述無佐證","活動及獎項欄空白或與才華無關"],
 "②願景（10）":["目標具體（領域＋階段）、與才華一致、有達成步驟、含對家庭或社會的承擔","目標具體且與才華一致，缺步驟或缺承擔其一","有方向但籠統，無步驟","只泛述「努力讀書」「報答父母」，與才華無關","未提及"],
 "③處理逆境（10）":["具體困難＋具體應對行動＋反思或改變，三者俱備且事例可核","有具體困難與行動，反思較薄","有困難描述及一般性應對（「堅持」「努力」）","只描述困難，無應對","未提及"],
 "④發展需要（10）":["用途具體（項目＋原因）、與才華發展直接相關、說明資源限制如何阻礙發展","用途具體且與才華相關，未說明限制","用途籠統（「買器材」「報課程」）","用途只提一般家用，與才華發展無關","未提及"],
 "推薦人評語（30）":["至少兩個親身觀察的具體事例＋對潛能的判斷＋說明學生需要；與自述及獎項表一致","一個具體事例＋評價","有評價但事例籠統（「品學兼優」「積極參與」）","套語為主，無具體內容","空白或欠推薦"],
 "經濟、家境和需要（25，暫定）":["綜援","書簿費全免","書簿費半免","無資助，但「其他經濟困難」欄或文章／評語有具體可核困難","無資助，無其他困難證據"]};
 return `<div class="grid g2">${Object.entries(A).map(([k,arr])=>`<div class="sub"><h3>${k}</h3><table class="t">${arr.map((t,i)=>`<tr><td style="width:30px;font-weight:700">${5-i}</td><td>${t}</td></tr>`).join("")}</table></div>`).join("")}</div>`;}

render();


window.OPEN_CARD=openCard;
window.__APP={ST,get S(){return S;},render:()=>render(),openCard,selIds,closeCard,setTab:t=>{S.tab=t;render();}};
};
