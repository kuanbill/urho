# 都市更新選屋資訊查詢系統 — 進度記錄

更新日期：2026-08-18

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
- **測試**：`npm run test` 8/8 通過
- **建置**：`npm run build` 成功
- **部署**
  - GitHub Pages workflow 移至根目錄 `.github/workflows/`
  - GitHub Actions 部署成功
  - 網站上線：https://kuanbill.github.io/urho/
  - CORS 驗證通過（Apps Script 回傳 `access-control-allow-origin: *`）
- **git**：儲存庫已推送至 `github.com/kuanbill/urho` 的 `main` 分支

### 2026-08-18 修正與改版
- **房屋平面圖樓層排序**：改用房屋表「排序」欄位（各樓層取最小排序值）決定樓層順序，修正 `10F` 排在 `1F` 前的字典序問題
- **車位清單/詳情**：移除重複的樓層前綴（`車位編號` 本身已含 `B1-` 等前綴）
- **手機風格介面改版**
  - 底部導覽列（自訂 SVG 圖示 + 文字，藍色底色）
  - 頂部標題列顯示目前所在位置 + 刷新（藍色底色）
  - 內容區左右滑動切換頁面（附滑入動畫）
  - 詳情頁保留頂部標題列與底部導覽列
- **App 圖示**
  - 加入 favicon、`manifest.webmanifest`、`apple-touch-icon`（192/512/180 正方形版本）
  - 頂部標題旁顯示圖示
  - 修正執行期路徑改用 `import.meta.env.BASE_URL` 與相對路徑，解決 `/urho/` base 下破圖
  - 修正 `start_url`/`scope` 為 `./`，安裝到桌面後啟動導向正確網址
- **便捷返回**：頂部返回箭頭、左緣向右滑返回、系統/瀏覽器返回鍵（`history` 整合）
- **金額顯示**：新增 `formatAmount` 工具，取整數並加仟位分隔符（如 `3,350,000`）

### 🔄 進行中 / 待辦
- [ ] 瀏覽器實測 https://kuanbill.github.io/urho/（房屋/車位清單、平面圖、搜尋、配色、刷新、底部導覽、側滑、返回手勢、安裝桌面圖示）

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
