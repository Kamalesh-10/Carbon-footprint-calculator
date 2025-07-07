
import './App.css';



import React, { useState } from 'react';

export default function App() {
  const [distance, setDistance] = useState('');
  const [mode, setMode] = useState('car');
  const [result, setResult] = useState(null);
  const [ecoMessage, setEcoMessage] = useState('');

  const emissionFactors = {
    car: 192,
    bike: 103,
    bus: 105,
    train: 41,
    flight: 255,
    walk: 0,
    bicycle: 0
  };

  const handleCalculate = () => {
    const dist = parseFloat(distance);
    if (!dist || dist <= 0) {
      setResult(null);
      setEcoMessage('Please enter a valid distance.');
      return;
    }
    const co2 = dist * emissionFactors[mode];
    setResult(co2);

    if (co2 > 1500) {
      setEcoMessage('🌱 Try public transport or walking for fewer emissions!');
    } else if (co2 > 0) {
      setEcoMessage('✅ Great choice! You’re eco-friendly!');
    } else {
      setEcoMessage('🚶 Zero emissions! You’re an eco hero!');
    }
  };

  return (
    <div className="container">
      <h2 className="title">Carbon Footprint Calculator</h2>

      <input
        type="number"
        value={distance}
        onChange={(e) => setDistance(e.target.value)}
        placeholder="Enter distance in km"
        className="input"
      />

      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        className="select"
      >
        {Object.keys(emissionFactors).map((m) => (
          <option key={m} value={m}>{m.charAt(0).toUpperCase() + m.slice(1)}</option>
        ))}
      </select>

      <button
        onClick={handleCalculate}
        className="button"
      >
        Calculate
      </button>

      {result !== null && (
        <div className="result">
          <p className="emission">Estimated CO₂ Emission: {result.toFixed(2)} g</p>
          <p className="eco-message">{ecoMessage}</p>
        </div>
      )}
    </div>
  );
}



