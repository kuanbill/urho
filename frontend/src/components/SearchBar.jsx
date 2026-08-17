import { useState } from 'react';
import SelectionBadge from './SelectionBadge.jsx';

export default function SearchBar({ houses, parking, houseCounts, parkingCounts, onSelectHouse, onSelectParking }) {
  const [q, setQ] = useState('');
  const term = q.trim().toLowerCase();
  const houseHits = term ? houses.filter((h) => `${h['樓層']}-${h['戶別']}`.toLowerCase().includes(term) || String(h['戶別']).toLowerCase().includes(term)) : [];
  const parkingHits = term ? parking.filter((p) => `${p['樓層']}-${p['車位編號']}`.toLowerCase().includes(term) || String(p['車位編號']).toLowerCase().includes(term)) : [];
  return (
    <div className="search">
      <input
        className="search-input"
        placeholder="搜尋，例如 5F-A1、B1-16"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      {term && (
        <div className="search-results">
          {houseHits.map((h) => (
            <button key={h['單元編號']} className="search-item" onClick={() => onSelectHouse(h)}>
              <span>{h['樓層']}-{h['戶別']}</span>
              <SelectionBadge count={houseCounts[h['單元編號']] || 0} />
            </button>
          ))}
          {parkingHits.map((p) => (
            <button key={p['車位編號']} className="search-item" onClick={() => onSelectParking(p)}>
              <span>{p['樓層']}-{p['車位編號']}</span>
              <SelectionBadge count={parkingCounts[p['車位編號']] || 0} />
            </button>
          ))}
          {!houseHits.length && !parkingHits.length && <p className="empty">無符合結果</p>}
        </div>
      )}
    </div>
  );
}
