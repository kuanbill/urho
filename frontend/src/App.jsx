import { useState } from 'react';
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

export default function App({ data }) {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);
  const [tab, setTab] = useState('houseList');
  const houses = (data && data.houses) || [];
  const parking = (data && data.parking) || [];
  const houseCounts = (data && data.houseCounts) || {};
  const parkingCounts = (data && data.parkingCounts) || {};

  if (selectedHouse) {
    return (
      <main className="app">
        <HouseDetail house={selectedHouse} count={houseCounts[selectedHouse['戶別']] || 0} onBack={() => setSelectedHouse(null)} />
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
      <h1>都市更新選屋查詢</h1>
      <nav className="tabs">
        {TABS.map((t) => (
          <button key={t.key} className={tab === t.key ? 'tab active' : 'tab'} onClick={() => setTab(t.key)}>
            {t.label}
          </button>
        ))}
      </nav>
      {tab === 'houseList' && <HouseList houses={houses} houseCounts={houseCounts} onSelect={setSelectedHouse} />}
      {tab === 'parkingList' && <ParkingList parking={parking} parkingCounts={parkingCounts} onSelect={setSelectedParking} />}
      {tab === 'housePlan' && (
        <FloorPlanView rows={houses} idField="戶別" labelField="戶別" counts={houseCounts} onSelect={setSelectedHouse} />
      )}
      {tab === 'parkingPlan' && (
        <FloorPlanView rows={parking} idField="車位編號" labelField="車位編號" counts={parkingCounts} onSelect={setSelectedParking} />
      )}
    </main>
  );
}
