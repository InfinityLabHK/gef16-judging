# 閃耀之星第十六屆初選 · 評審平台（網站版 v1）

只放程式，**不含任何學生資料、帳號密碼或密鑰**。學生資料及評審紀錄放在 Supabase（新加坡），登入後才下載；所有權限由資料庫列級權限（RLS）強制。

## 檔案
| 檔案 | 作用 |
| --- | --- |
| index.html、app.js、styles.css | 評審端（與離線第一版相同的報告介面＋登入＋即時同步） |
| admin.html、admin.js | 後台（只限管理員）：進度及權重、匯總及委員會決定、名單畫像、操作紀錄、鎖定及匯出 |
| api.js | 極簡 Supabase 用戶端（只用 fetch，無外部程式庫） |
| judge.js | 評審端登入、載入、合併本機未同步改動、即時同步 |
| config.js | Supabase 網址及 anon 設定（可公開）；由 config.example.js 複製 |
| supabase/schema.sql | 資料表、權限、操作紀錄、鎖定；在 Supabase SQL Editor 執行一次 |
| tools/supa_admin.py | 匯入學生資料、按 Excel 開帳號、更新權重、評審期完結清除資料（在 Scarlett 電腦執行） |
| tools/build_site.py | 由離線報告模板重新產生 index.html／app.js／admin.html |
| tools/mock_server.js、supabase/_test_*.sql | 本地測試用（不影響上線） |

## 上線步驟
1. **Supabase**（Scarlett）：到 supabase.com 開專案，地區選 Southeast Asia (Singapore)。
   - Authentication → Sign In / Providers：**關閉「Allow new users to sign up」**，關閉 Confirm email。
   - SQL Editor：貼上 `supabase/schema.sql` 全文執行。
   - Project Settings → API：把 Project URL 及 anon public key 填入 `config.js`。
   - 同一頁的 service_role key **只**放在本機檔案 `工作檔_個資/帳號/supabase.env`（不入 repo、不貼到對話）：
     ```
     SUPABASE_URL=https://xxxx.supabase.co
     SUPABASE_SERVICE_ROLE_KEY=……
     EMAIL_DOMAIN=gef16.invalid
     ```
2. **匯入資料及開帳號**（在 輸出/ 下執行）：
   ```
   python3 -I 網站_v1/tools/supa_admin.py 工作檔_個資/帳號/supabase.env import 工作檔_個資/data_第一版.json
   python3 -I 網站_v1/tools/supa_admin.py 工作檔_個資/帳號/supabase.env accounts 工作檔_個資/帳號/初選平台帳號_v1.xlsx
   ```
3. **GitHub**：在 infinitylab 開 repo（建議名稱 `gef16-judging`），把本資料夾內容推上去（不含 .gitignore 排除的檔案）。
4. **網站寄存**（二選一）：
   - GitHub Pages：repo Settings → Pages → Deploy from branch `main` / root。注意：**私人 repo 的 Pages 需要 GitHub 付費方案**；免費方案只可用公開 repo（repo 內只有程式，沒有學生資料，公開亦不會外洩個資，但程式碼會被看到）。
   - Cloudflare Pages（免費、可連私人 repo）：Create project → 連 GitHub repo → 不需建置指令，輸出目錄為根目錄。
5. **Supabase → Authentication → URL Configuration**：Site URL 填網站網址。
6. **試行**：Scarlett 用 `scarlett`、鄭校長用 `principalcheng` 先登入試一輪（電腦＋手機），再個別私訊發帳號給評審。
7. **評審期完結**：後台「鎖定評審」→ 匯出兩個 CSV → `supa_admin.py … purge` 清除雲端學生資料及相片。

## 權重
`初選平台帳號_v1.xlsx` 的「評分權重」欄（預設 1）由鄭校長決定；改完執行 `supa_admin.py … weights 初選平台帳號_v1.xlsx`，或直接在後台「進度及權重」頁修改。

## 已完成的測試（2026-10-27）
- 權限（PostgreSQL 16 模擬 Supabase auth）：23 項全部合格——未登入讀不到資料；評審只讀寫自己的紀錄、不能代他人寫、看不到他人紀錄及操作紀錄、不能改權重或委員會決定；管理員看到全部、可改權重但不能改角色；鎖定後評審不能新增或修改；停用帳號讀不到學生資料及相片。
- 介面端對端（模擬伺服器＋無頭瀏覽器，電腦 1280 及手機 390）：20 項全部合格——登入、錯誤密碼、分層即時儲存、重新整理後保持、手機另一裝置同步、手機改分層同步、停用帳號、評審進不到後台、後台進度／匯總／委員會決定／權重改動即時反映、名單畫像、操作紀錄、鎖定、後台連結直接開卡片、無程式錯誤。
- 未測：真正 Supabase 雲端（等專案開好後再做一次上線前測試）。
