import { useState } from 'react';
import HouseList from './components/HouseList.jsx';
import HouseDetail from './components/HouseDetail.jsx';

export default function App({ data }) {
  const [selected, setSelected] = useState(null);
  const houses = (data && data.houses) || [];
  const houseCounts = (data && data.houseCounts) || {};

  if (selected) {
    return (
      <main className="app">
        <HouseDetail house={selected} count={houseCounts[selected['戶別']] || 0} onBack={() => setSelected(null)} />
      </main>
    );
  }
  return (
    <main className="app">
      <h1>都市更新選屋查詢</h1>
      <HouseList houses={houses} houseCounts={houseCounts} onSelect={setSelected} />
    </main>
  );
}
