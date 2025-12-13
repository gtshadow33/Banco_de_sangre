import React, { useState } from 'react';

const API_URL = 'http://localhost:5054/api/donors';
const API_TOKEN = 'MI_SECRETO_API_TOKEN';

export default function SearchById() {
  const [id, setId] = useState('');
  const [donor, setDonor] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setDonor(null);
    setError('');
    if (!id) return alert('Ingresa un ID');

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        headers: { 'Authorization': `Bearer ${API_TOKEN}` }
      });
      if (!res.ok) throw new Error(`Donante no encontrado (${res.status})`);

      const data = await res.json();
      setDonor(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
      <h2>Buscar Donante por ID</h2>
      <input type="text" placeholder="ID del Donante" value={id} onChange={(e) => setId(e.target.value)} />
      <button onClick={handleSearch}>Buscar</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      {donor && (
        <div style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '1rem' }}>
          <p><strong>ID:</strong> {donor.id}</p>
          <p><strong>Nombre:</strong> {donor.name}</p>
          <p><strong>Edad:</strong> {donor.age}</p>
          <p><strong>Tipo de Sangre:</strong> {donor.bloodType}</p>
        </div>
      )}
    </div>
  );
}
