import * as XLSX from 'xlsx';

self.onmessage = (e) => {
  try {
    const data = new Uint8Array(e.data);
    const workbook = XLSX.read(data, { type: 'array' });
    const firstSheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[firstSheetName];
    const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });
    
    if (json.length === 0) {
      self.postMessage({ data: [], columns: [] });
      return;
    }
    
    const columns = Object.keys(json[0]);
    self.postMessage({
      data: json,
      columns: columns
    });
  } catch (err) {
    self.postMessage({ error: err.message });
  }
};
