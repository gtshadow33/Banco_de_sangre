import React, { useState } from 'react';

export default function TokenLogin({ onSuccess }) {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const API_URL = 'http://localhost:5054/api/tokencheck';

  const handleSubmit = async () => {
    if (!token) {
      setError('Debes ingresar el token');
      return;
    }

    try {
      // Hacer la petición al API para validar el token
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Token inválido');
      }

      // Guardar el token en localStorage
      localStorage.setItem('apiToken', token);

      // Avisar al padre que el login fue exitoso
      onSuccess(token);

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '3rem auto' }}>
      <h2>Acceso al Sistema</h2>

      <input
        type="password"
        placeholder="Ingrese el API Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        style={{ width: '100%', padding: '0.5rem' }}
      />

      <button onClick={handleSubmit} style={{ marginTop: '1rem' }}>
        Ingresar
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
