const CONFIG = {
  SPREADSHEET_ID: '12gEnO306O-pbHcAtiihN0xN5tw9H9w_o39uBh4nv9K4',
  SHEETS: {
    houses: { name: '各樓層房屋價值表', headerRow: 1 },
    parking: { name: '車位價值表', headerRow: 1 },
    selections: { name: '選配基本資料', headerRow: 0 },
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

function readSheet(sheetCfg) {
  const ss = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
  const sheet = ss.getSheetByName(sheetCfg.name);
  if (!sheet) return [];
  const values = sheet.getDataRange().getValues();
  const hr = sheetCfg.headerRow || 0;
  if (values.length <= hr) return [];
  const headers = values[hr].map(function (h) { return String(h).trim(); });
  return values.slice(hr + 1).map(function (row) {
    var obj = {};
    headers.forEach(function (h, i) { obj[h] = row[i]; });
    return obj;
  });
}
