const CONFIG = {
  SPREADSHEET_ID: 'YOUR_SPREADSHEET_ID',
  SHEETS: {
    houses: '各樓層房屋價值表',
    parking: '車位價值表',
    selections: '選配基本資料',
  },
};

function doGet(e) {
  const type = (e && e.parameter && e.parameter.type) || 'all';
  const data = {};
  if (type === 'all') {
    data.houses = readSheet(CONFIG.SHEETS.houses);
    data.parking = readSheet(CONFIG.SHEETS.parking);
    data.selections = readSheet(CONFIG.SHEETS.selections);
  } else if (CONFIG.SHEETS[type]) {
    data[type] = readSheet(CONFIG.SHEETS[type]);
  } else {
    return ContentService.createTextOutput(JSON.stringify({ error: 'unknown type: ' + type }))
      .setMimeType(ContentService.MimeType.JSON);
  }
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

function readSheet(name) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(name);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(function (h) { return String(h).trim(); });
  return values.slice(1).map(function (row) {
    var obj = {};
    headers.forEach(function (h, i) { obj[h] = row[i]; });
    return obj;
  });
}
