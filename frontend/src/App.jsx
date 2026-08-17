import { useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import HouseList from './components/HouseList.jsx';
import HouseDetail from './components/HouseDetail.jsx';
import ParkingList from './components/ParkingList.jsx';
import ParkingDetail from './components/ParkingDetail.jsx';
import FloorPlanView from './components/FloorPlanView.jsx';

const TABS = [
  { key: 'houseList', label: '房屋清單' },
  { key: 'parkingList', label: '車位清單' },
  { key: 'housePlan', label: '房屋平面圖' },
  { key: 'parkingPlan', label: '車位平面圖' },
];

export default function App({ data: initialData, onRefresh }) {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);
  const [tab, setTab] = useState('houseList');
  const data = initialData || { houses: [], parking: [], selections: [] };
  const houseCounts = {};
  (data.houses || []).forEach((h) => { houseCounts[h['單元編號']] = h['選配人數'] || 0; });
  const parkingCounts = {};
  (data.parking || []).forEach((p) => { parkingCounts[p['車位編號']] = p['選配人數'] || 0; });

  if (selectedHouse) {
    return (
      <main className="app">
        <HouseDetail house={selectedHouse} count={houseCounts[selectedHouse['單元編號']] || 0} onBack={() => setSelectedHouse(null)} />
      </main>
    );
  }
  if (selectedParking) {
    return (
      <main className="app">
        <ParkingDetail parking={selectedParking} count={parkingCounts[selectedParking['車位編號']] || 0} onBack={() => setSelectedParking(null)} />
      </main>
    );
  }
  return (
    <main className="app">
      <div className="header">
        <h1>都市更新選屋查詢</h1>
        <button className="refresh" onClick={onRefresh}>刷新</button>
      </div>
      <SearchBar houses={data.houses} parking={data.parking} houseCounts={houseCounts} parkingCounts={parkingCounts} onSelectHouse={setSelectedHouse} onSelectParking={setSelectedParking} />
      <nav className="tabs">
        {TABS.map((t) => (
          <button key={t.key} className={tab === t.key ? 'tab active' : 'tab'} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </nav>
      {tab === 'houseList' && <HouseList houses={data.houses} houseCounts={houseCounts} onSelect={setSelectedHouse} />}
      {tab === 'parkingList' && <ParkingList parking={data.parking} parkingCounts={parkingCounts} onSelect={setSelectedParking} />}
      {tab === 'housePlan' && <FloorPlanView rows={data.houses} idField="單元編號" labelField="戶別" counts={houseCounts} onSelect={setSelectedHouse} />}
      {tab === 'parkingPlan' && <FloorPlanView rows={data.parking} idField="車位編號" labelField="車位編號" counts={parkingCounts} onSelect={setSelectedParking} />}
    </main>
  );
}
