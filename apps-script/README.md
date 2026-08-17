# Apps Script API

此資料夾為 Google Apps Script Web App（以 clasp 部署）。

## 前置
- 安裝 clasp：`npm install -g @google/clasp`
- 登入：`clasp login`
- 編輯 `Code.gs` 中的 `CONFIG.SPREADSHEET_ID` 為實際試算表 ID。

## 初始化與部署
- 第一次：在 Apps Script 專案目錄執行 `clasp create --title "urho-api" --type webapp`（產生 `.clasp.json` 與 `appsscript.json`）。
- 需要 `appsscript.json` 內容：

```json
{
  "timeZone": "Asia/Taipei",
  "exceptionLogging": "STACKDRIVER",
  "runtimeVersion": "V8",
  "webapp": {
    "executeAs": "USER_DEPLOYING",
    "access": "ANYONE_ANONYMOUS"
  }
}
```

- 上傳：`clasp push`
- 部署並取得網址：`clasp deploy`（或 `clasp deploy -i <deploymentId>` 更新），記下網址填入前端 `src/config.js` 的 `APP_SCRIPT_URL`。
