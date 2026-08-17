import { useState } from 'react';
import HouseList from './components/HouseList.jsx';
import HouseDetail from './components/HouseDetail.jsx';
import ParkingList from './components/ParkingList.jsx';
import ParkingDetail from './components/ParkingDetail.jsx';

export default function App({ data }) {
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [selectedParking, setSelectedParking] = useState(null);
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
      <section>
        <h2>房屋</h2>
        <HouseList houses={houses} houseCounts={houseCounts} onSelect={setSelectedHouse} />
      </section>
      <section>
        <h2>車位</h2>
        <ParkingList parking={parking} parkingCounts={parkingCounts} onSelect={setSelectedParking} />
      </section>
    </main>
  );
}
