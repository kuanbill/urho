import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { fetchAllData } from './api.js';
import './styles.css';

function Root() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const d = await fetchAllData();
      setData(d);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  return (
    <>
      {loading && <div className="loading">載入中…</div>}
      {error && <div className="error">載入失敗：{error}</div>}
      {!loading && !error && <App data={data} onRefresh={load} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
