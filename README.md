# 都市更新選屋資訊查詢系統

公開、唯讀、手機/平板優先的選屋資訊查詢網頁應用。

## 結構
- `frontend/`：React + Vite 前端（部署至 GitHub Pages）
- `apps-script/`：Apps Script Web App API（clasp 部署）

## 上線前設定
1. 部署 Apps Script（見 `apps-script/README.md`），取得 Web App 網址。
2. 將網址填入 `frontend/src/config.js` 的 `APP_SCRIPT_URL`。
3. 在 GitHub 儲存庫啟用 Pages（Settings → Pages → Deploy from a branch 或 GitHub Actions）。
