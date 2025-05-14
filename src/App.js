import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [stations, setStations] = useState([]);
  const [currentStream, setCurrentStream] = useState(null);
  const [selectedState, setSelectedState] = useState('');
  const states = [...new Set(stations.map(s => s.state).filter(Boolean))]; // lista única de provincias

  const filteredStations = selectedState
    ? stations.filter(s => s.state === selectedState)
    : stations;


  useEffect(() => {
    axios.get('https://de1.api.radio-browser.info/json/stations/bycountry/Argentina')
      .then(response => setStations(response.data))
      .catch(error => console.error('Error al cargar radios:', error));
  }, []);

  const playStation = (station) => {
    setCurrentStream(station.url_resolved);
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>Radio App 🎧</h1>

      {/* {stations.map(station => (
        <div key={station.stationuuid} style={{ margin: '1rem 0' }}>
          <strong>{station.name}</strong> — {station.country}
          <br />
          <button onClick={() => playStation(station)}>Escuchar</button>
        </div>
      ))} */}
      <select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
        <option value="">Todas las provincias</option>
        {states.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
      {filteredStations.map(station => (
        <div key={station.stationuuid}>
          <strong>{station.name}</strong> — {station.state || 'Sin provincia'}
          <br />
          <button onClick={() => playStation(station)}>Escuchar</button>
        </div>
      ))}

      {currentStream && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Reproduciendo ahora:</h2>
          <audio controls autoPlay src={currentStream} style={{ width: '100%' }} />
        </div>
      )}
    </div>
  );
}

export default App;
