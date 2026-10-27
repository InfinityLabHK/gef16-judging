# -*- coding: utf-8 -*-
"""build_site.py — 由離線報告模板（report_template_v6_2.html）產生網站版評審端
用法：python3 -I build_site.py <report_template_v6_2.html> <輸出資料夾>
產出：index.html（版面＋樣式＋登入閘）、app.js（報告程式，包成 BOOT()）；不含任何學生資料。
"""
import sys, os, re
TPL, OUT = sys.argv[1:3]
t = open(TPL, encoding="utf-8").read()
s0 = t.index("<script>window.GEF=/*__DATA__*/;</script>")
a0 = t.index("<script>\n", s0 + 10) + len("<script>\n")
a1 = t.index("</script>\n</body>")
app = t[a0:a1]
head = t[:s0]

def rep(src, old, new, count=1):
    assert old in src, "找不到：" + old[:70]
    return src.replace(old, new, count)

# ---------- 報告程式：網站版改動 ----------
app = rep(app, 'const KEY="gef16_review_v1";', 'const KEY=window.GEF_KEY||"gef16_review_v1";')
app = rep(app, ' const o=Object.assign(base,j&&j.decisions?j:{});', ' const o=Object.assign(base,j&&j.decisions?j:{});if(window.GEF_SERVER)Object.assign(o,window.GEF_SERVER);')
app = rep(app, 'function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){toast("無法保存到瀏覽器（私密模式？）");}}',
          'function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}if(window.GEF_SYNC)window.GEF_SYNC();}\nwindow.S_REF=()=>S;')
app = rep(app, 'function setTier(id,t){const d=dec(id);', 'function setTier(id,t){if(window.GEF_LOCKED){toast("評審期已鎖定，改動不會儲存");return dec(id).tier;}const d=dec(id);')
# 設定：帳號、登出、後台
app = rep(app, ' <label>評審代號 <input type="text" id="sJudge" maxlength="12" placeholder="例：A" value="${esc(S.judge)}"></label>',
          ' ${window.GEF_WEB?`<div class="small" style="padding:4px 0 8px">登入帳號：<b>${esc(window.GEF_USER||"")}</b></div>`:`<label>評審代號 <input type="text" id="sJudge" maxlength="12" placeholder="例：A" value="${esc(S.judge)}"></label>`}')
app = rep(app, ' p.querySelector("#sJudge").onchange=e=>{S.judge=e.target.value.trim();save();};',
          ' if(p.querySelector("#sJudge"))p.querySelector("#sJudge").onchange=e=>{S.judge=e.target.value.trim();save();};\n if(p.querySelector("#sOut"))p.querySelector("#sOut").onclick=()=>window.GEF_LOGOUT();')
app = rep(app, ' <div style="text-align:right;margin-top:8px"><button class="btn sm" id="sClose">完成</button></div>`;',
          ' <div class="small" style="margin-top:8px;padding-top:8px;border-top:1px solid var(--line)"><span id="syncSt" class="syncst"></span></div>\n <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:8px">${window.GEF_ROLE==="admin"?\'<a class="btn sm" href="admin.html">後台 ›</a>\':""}${window.GEF_WEB?\'<button class="btn sm" id="sOut">登出</button>\':""}<button class="btn sm" id="sClose">完成</button></div>`;')
# 使用指南文字
app = rep(app, '<li>在右上「設定」填評審代號（Scarlett 會告訴你）。所有操作自動保存在你這部裝置的瀏覽器內。</li>',
          '<li>${window.GEF_WEB?"你已用個人帳號登入。所有分層、籃子、理由、備註<b>自動儲存到伺服器</b>；電腦和手機用同一帳號會同步。":"在右上「設定」填評審代號（Scarlett 會告訴你）。所有操作自動保存在你這部裝置的瀏覽器內。"}</li>')
app = rep(app, '看一眼「我的名單輪廓」，最後按<b>匯出我的評審結果</b>，把檔案傳回 Scarlett。</li>',
          '看一眼「我的名單輪廓」，${window.GEF_WEB?"確認名單即可，結果已自動儲存（「下載備份」只作個人備份）。":"最後按<b>匯出我的評審結果</b>，把檔案傳回 Scarlett。"}</li>')
app = rep(app, '<p>· 你看不到其他評審的選擇；匯出檔只含你自己的結果。</p>',
          '<p>· ${window.GEF_WEB?"你看不到其他評審的選擇；管理員（鄭校長、Scarlett）可在後台看到所有評審的結果作匯總。":"你看不到其他評審的選擇；匯出檔只含你自己的結果。"}</p>')
app = rep(app, '<p>· 完成後刪除本檔（公布結果後）。</p>',
          '<p>· ${window.GEF_WEB?"評審期結束後，學生資料會從伺服器刪除。":"完成後刪除本檔（公布結果後）。"}</p>')
# 我的評審：網站版不設「清除」；匯出改名下載備份
app = rep(app, '<button class="btn primary" id="exp">匯出我的評審結果</button>',
          '<button class="btn primary" id="exp">${window.GEF_WEB?"下載備份":"匯出我的評審結果"}</button>')
app = rep(app, '<button class="btn" id="clr">清除</button>', '${window.GEF_WEB?"":\'<button class="btn" id="clr">清除</button>\'}')
app = rep(app, ' v.querySelector("#clr").onclick=()=>{', ' if(v.querySelector("#clr"))v.querySelector("#clr").onclick=()=>{')
app = rep(app, 'toast("已匯出，請把檔案傳回 Scarlett");', 'toast(window.GEF_WEB?"已下載備份（結果已自動儲存）":"已匯出，請把檔案傳回 Scarlett");')
# 方法說明：個資
app = rep(app, '["m10","十、個資",`<p>', '["m10","十、個資",`${window.GEF_WEB?"<p><b>網站版：</b>學生資料存於有登入及權限控制的資料庫（新加坡機房）；評審只能讀寫自己的評審紀錄，管理員可看所有紀錄，所有改動有操作紀錄；評審期結束後刪除雲端學生資料。</p>":""}<p>')

js = "/* 閃耀之星初選平台 · 報告程式（由 build_site.py 產生，請勿手改） */\nwindow.BOOT=function(){\n" + app + "\nwindow.OPEN_CARD=openCard;\nwindow.__APP={ST,get S(){return S;},render:()=>render(),openCard,selIds,closeCard,setTab:t=>{S.tab=t;render();}};\n};\n"

# ---------- 頁面 ----------
html = head
html = rep(html, '<title>閃耀之星第十六屆初選 · AI 輔助報告</title>', '<title>閃耀之星第十六屆初選 · 評審平台</title>\n<meta name="robots" content="noindex,nofollow">')
html = re.sub(r'<main><div class="wrap" id="view">.*?</div></main>', '<main><div class="wrap" id="view"></div></main>', html, flags=re.S)
html = rep(html, '/* motion */', '''.gate{position:fixed;inset:0;z-index:100;background:var(--page);display:flex;align-items:center;justify-content:center;padding:16px}
.gate.hidden{display:none}
.gate-card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:28px 24px;width:min(380px,100%);box-shadow:var(--shadow)}
.gate-card label{display:block;margin-top:10px}
.gate-card input{display:block;width:100%;margin-top:4px;border:1px solid var(--line);border-radius:8px;padding:10px;font-size:16px;background:var(--panel2)}
.syncst.ok{color:var(--ok)}.syncst.warn{color:var(--warn)}.syncst.bad{color:var(--bad)}
.webbanner{position:sticky;top:0;z-index:35;background:var(--goldSoft);color:var(--ink);font-size:14px;padding:8px 16px;text-align:center}
/* motion */''')
html += '''<div class="gate" id="gate"></div>
<div id="bdrawer" class="drawer hidden" role="dialog" aria-modal="true" aria-label="我的籃子"><div class="sheet" id="bsheet"></div></div>
<div id="drawer" class="drawer hidden" role="dialog" aria-modal="true"><div class="sheet" id="sheet"></div></div>
<div class="bbar hidden" id="bbar"></div>
<div class="tip" id="tip"></div>
<div class="toast" id="toast"></div>
<script src="config.js"></script>
<script src="api.js"></script>
<script src="app.js"></script>
<script src="judge.js"></script>
</body>
</html>
'''
# head 已含 drawer／tip／toast 等？去重
for frag in ['<div id="bdrawer"', '<div id="drawer"', '<div class="bbar hidden"', '<div class="tip"', '<div class="toast"']:
    first = html.find(frag); second = html.find(frag, first + 1)
    if second != -1:
        end = html.index("</div>", second) + 6
        if frag in ('<div id="bdrawer"', '<div id="drawer"'): end = html.index("</div></div>", second) + 12
        html = html[:second] + html[end:]
css = re.search(r"<style>(.*?)</style>", head, re.S).group(1)
admin = """<!DOCTYPE html>
<html lang="zh-Hant" data-theme="light"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="robots" content="noindex,nofollow"><title>閃耀之星第十六屆初選 · 後台</title><link rel="stylesheet" href="styles.css">
<style>.gate{position:fixed;inset:0;z-index:100;background:var(--page);display:flex;align-items:center;justify-content:center;padding:16px}.gate.hidden{display:none}
.gate-card{background:var(--panel);border:1px solid var(--line);border-radius:12px;padding:28px 24px;width:min(380px,100%);box-shadow:var(--shadow)}.gate-card label{display:block;margin-top:10px}
.gate-card input{display:block;width:100%;margin-top:4px;border:1px solid var(--line);border-radius:8px;padding:10px;font-size:16px;background:var(--panel2)}
.pb .row{display:flex;align-items:center;gap:10px}.pb .v{width:170px}.atabs{display:flex;gap:2px;flex-wrap:wrap}.atabs button{background:none;border:0;border-radius:8px;padding:6px 10px;color:var(--muted);font-size:14px}.atabs button.on{background:var(--goldSoft);color:var(--goldText);font-weight:600}
.wrap.wide{max-width:1500px}</style></head>
<body><header class="top"><div class="wrap wide"><div class="topbar" style="flex-wrap:wrap;height:auto;min-height:56px;gap:8px">
<div class="brand">閃耀之星第十六屆初選 · 後台<span class="micro" id="who"></span></div><nav class="atabs" id="tabs"></nav><span style="flex:1"></span>
<a class="iconbtn" href="index.html">評審頁</a><button class="iconbtn" id="refresh">重新整理</button><button class="iconbtn" id="themeBtn">深／淺</button><button class="iconbtn" id="logout">登出</button></div></div></header>
<main><div class="wrap wide" id="view"></div></main><div class="gate" id="gate"></div><div class="toast" id="toast"></div>
<script src="config.js"></script><script src="api.js"></script><script src="admin.js"></script></body></html>
"""
os.makedirs(OUT, exist_ok=True)
open(os.path.join(OUT, "styles.css"), "w", encoding="utf-8").write(css)
open(os.path.join(OUT, "admin.html"), "w", encoding="utf-8").write(admin)
open(os.path.join(OUT, "index.html"), "w", encoding="utf-8").write(html)
open(os.path.join(OUT, "app.js"), "w", encoding="utf-8").write(js)
print("index.html", len(html), "app.js", len(js))
