import React, { useState } from 'react';

const API_URL = 'http://localhost:5054/api/donors';
const API_TOKEN = 'MI_SECRETO_API_TOKEN';

function DonorCard({ donor }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
      <p><strong>ID:</strong> {donor.id}</p>
      <p><strong>Nombre:</strong> {donor.name}</p>
      <p><strong>Edad:</strong> {donor.age}</p>
      <p><strong>Tipo de Sangre:</strong> {donor.bloodType}</p>
    </div>
  );
}

export default function SearchByBlood() {
  const [bloodType, setBloodType] = useState('');
  const [donors, setDonors] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setDonors([]);
    setError('');

    if (!bloodType) {
      alert('Selecciona un tipo de sangre');
      return;
    }

    try {
      const response = await fetch(`${API_URL}?bloodType=${encodeURIComponent(bloodType)}`, {
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('No se encontraron donantes compatibles');
      }

      const data = await response.json();
      setDonors(data);

      if (data.length === 0) {
        setError('No hay donantes compatibles para este tipo de sangre.');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '2rem auto' }}>
      <h2>Buscar Donantes por Tipo de Sangre</h2>

      <select value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
        <option value="">Tipo de Sangre</option>
        <option value="A+">A+</option>
        <option value="A-">A-</option>
        <option value="B+">B+</option>
        <option value="B-">B-</option>
        <option value="AB+">AB+</option>
        <option value="AB-">AB-</option>
        <option value="O+">O+</option>
        <option value="O-">O-</option>
      </select>

      <button onClick={handleSearch} style={{ marginLeft: '1rem' }}>Buscar</button>

      {error && <p style={{ color: 'red', marginTop: '1rem' }}>{error}</p>}

      {donors.length > 0 && donors.map((donor) => (
        <DonorCard key={donor.id} donor={donor} />
      ))}
    </div>
  );
}
