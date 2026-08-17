# 都市更新選屋資訊查詢系統 — 進度記錄

更新日期：2026-08-17

## 專案目標
提供地主與服務人員在手機/平板瀏覽都市更新案的房屋與車位資訊，並顯示每戶/每車位的目前選取人數（1 人＝藍、2 人以上＝紅、0＝預設色）。公開、唯讀、手動刷新。

## 架構
```
Google Sheets (3 工作表) → Apps Script Web App (doGet JSON API) → React + Vite 前端 (GitHub Pages)
```

## 進度

### ✅ 已完成
- **設計規格**：`docs/superpowers/specs/2026-08-17-urho-design.md`
- **實作計畫**：`docs/superpowers/plans/2026-08-17-urho.md`（12 個任務）
- **Apps Script API**（`apps-script/Code.gs`）
  - `doGet` 依 `type` 回傳 `houses`/`parking`/`selections`/`all`
  - `readSheet` 依各表標題列位置讀取欄位（房屋/車位表跳過第 1 列工作表名稱）
  - 部署為「任何人可存取」的 Web App
- **React + Vite 前端**（`frontend/`）
  - 房屋/車位清單與詳細資料
  - 房屋/車位平面圖（房屋：樓層×戶別；車位：B1~B6×車位編號）
  - 全域搜尋
  - 選取人數顯示與配色（1 藍 / 2+ 紅 / 0 預設）
  - 手動刷新
  - 標籤頁切換
- **資料對齊**
  - 改用房屋/車位表內建「選配人數」欄作為人數來源（非從選配基本資料彙整）
  - 欄位名稱與實際試算表一致（`產權面積(坪)`、`每坪單價(元)`、`該戶總價(元)`、`露台總價`、`規格 (公分)`）
- **測試**：`npm run test` 5/5 通過
- **建置**：`npm run build` 成功
- **部署**
  - GitHub Pages workflow 移至根目錄 `.github/workflows/`
  - GitHub Actions 部署成功
  - 網站上線：https://kuanbill.github.io/urho/
  - CORS 驗證通過（Apps Script 回傳 `access-control-allow-origin: *`）
- **git**：儲存庫已推送至 `github.com/kuanbill/urho` 的 `main` 分支

### 🔄 進行中 / 待辦
- [ ] 瀏覽器實測 https://kuanbill.github.io/urho/（房屋/車位清單、平面圖、搜尋、配色、刷新）

## 重要決策記錄
- 選取人數來源：使用「選配基本資料」的 `房屋選配`/`車位選配` 拆解 vs 房屋/車位表內建「選配人數」欄 → **採用後者**（由使用者手動維護，最簡單且符合現況）。
- 選配多筆格式：`房屋選配="7F-A1,7F-B1"` 表示一位地主選 2 戶，但因採用「選配人數」欄，前端不需自行拆解。

## 上線前核對清單
- [x] Apps Script 部署完成（`SPREADSHEET_ID` 設定正確）
- [x] 前端 `APP_SCRIPT_URL` 已填入部署網址
- [x] 欄位對齊確認（與「選配基本資料」拆解比對一致）
- [x] CORS 實機驗證通過
- [x] GitHub Pages 部署成功

## 相關檔案
- 規格：`docs/superpowers/specs/2026-08-17-urho-design.md`
- 計畫：`docs/superpowers/plans/2026-08-17-urho.md`
- Apps Script：`apps-script/Code.gs`、`apps-script/README.md`
- 前端：`frontend/`（React + Vite）
- 部署工作流：`.github/workflows/deploy.yml`
