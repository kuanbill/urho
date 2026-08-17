import { APP_SCRIPT_URL } from './config.js';

export async function fetchAllData() {
  const url = `${APP_SCRIPT_URL}?type=all`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
