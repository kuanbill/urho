import { useRef, useState } from 'react';
import SearchBar from './components/SearchBar.jsx';
import HouseList from './components/HouseList.jsx';
import HouseDetail from './components/HouseDetail.jsx';
import ParkingList from './components/ParkingList.jsx';
import ParkingDetail from './components/ParkingDetail.jsx';
import FloorPlanView from './components/FloorPlanView.jsx';
import BottomNav from './components/BottomNav.jsx';

const TABS = [
  { key: 'houseList', label: '房屋清單' },
  { key: 'parkingList', label: '車位清單' },
  { key: 'housePlan', label: '房屋平面圖' },
  { key: 'parkingPlan', label: '車位平面圖' },
];

export default function App({ data: initialData, onRefresh }) {
  const [tab, setTab] = useState(0);
  const [direction, setDirection] = useState(1);
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);
  const data = initialData || { houses: [], parking: [], selections: [] };
  const houseCounts = {};
  (data.houses || []).forEach((h) => { houseCounts[h['單元編號']] = h['選配人數'] || 0; });
  const parkingCounts = {};
  (data.parking || []).forEach((p) => { parkingCounts[p['車位編號']] = p['選配人數'] || 0; });

  const touchX = useRef(null);
  const onTouchStart = (e) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) < 60) return;
    const dir = dx < 0 ? 1 : -1;
    setTab((t) => {
      const next = Math.min(TABS.length - 1, Math.max(0, t + dir));
      if (next !== t) setDirection(dir);
      return next;
    });
  };
  const goTo = (i) => {
    setDirection(i > tab ? 1 : -1);
    setTab(i);
  };

  let content;
  let title = TABS[tab].label;
  let isDetail = false;
  if (selectedHouse) {
    isDetail = true;
    title = `${selectedHouse['樓層']}-${selectedHouse['戶別']}`;
    content = <HouseDetail house={selectedHouse} count={houseCounts[selectedHouse['單元編號']] || 0} onBack={() => setSelectedHouse(null)} />;
  } else if (selectedParking) {
    isDetail = true;
    title = selectedParking['車位編號'];
    content = <ParkingDetail parking={selectedParking} count={parkingCounts[selectedParking['車位編號']] || 0} onBack={() => setSelectedParking(null)} />;
  } else if (tab === 0) content = <HouseList houses={data.houses} houseCounts={houseCounts} onSelect={setSelectedHouse} />;
  else if (tab === 1) content = <ParkingList parking={data.parking} parkingCounts={parkingCounts} onSelect={setSelectedParking} />;
  else if (tab === 2) content = <FloorPlanView rows={data.houses} idField="單元編號" labelField="戶別" counts={houseCounts} sortField="排序" onSelect={setSelectedHouse} />;
  else content = <FloorPlanView rows={data.parking} idField="車位編號" labelField="車位編號" counts={parkingCounts} onSelect={setSelectedParking} />;

  return (
    <main className="app">
      <div className="topbar">
        <div className="topbar-title">
          <img src="/icon.png" className="topbar-icon" alt="" />
          <h1 className="location">{title}</h1>
        </div>
        <button className="refresh" onClick={onRefresh}>刷新</button>
      </div>
      {!isDetail && <SearchBar houses={data.houses} parking={data.parking} houseCounts={houseCounts} parkingCounts={parkingCounts} onSelectHouse={setSelectedHouse} onSelectParking={setSelectedParking} />}
      <div
        className="content"
        onTouchStart={isDetail ? undefined : onTouchStart}
        onTouchEnd={isDetail ? undefined : onTouchEnd}
      >
        <div className="slide" key={isDetail ? `d-${title}` : tab} data-dir={direction}>
          {content}
        </div>
      </div>
      <BottomNav tabs={TABS} active={tab} onSelect={goTo} />
    </main>
  );
}
