import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:5054/api/donors';

export default function AddDonor() {
  const [form, setForm] = useState({ name: '', age: '', bloodType: '' });
  const [token, setToken] = useState('');

  // Cargar token desde localStorage al montar el componente
  useEffect(() => {
    const tokenGuardado = localStorage.getItem('apiToken');
    if (tokenGuardado) {
      setToken(tokenGuardado);
    }
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      return alert('No hay token disponible. Ingresa nuevamente.');
    }

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name: form.name, age: Number(form.age), bloodType: form.bloodType })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Error al agregar donante');

      alert('Donante agregado correctamente');
      setForm({ name: '', age: '', bloodType: '' });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Agregar Donante</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Edad"
          value={form.age}
          onChange={handleChange}
          required
          min={0}
          max={120}
        />
        <select
          name="bloodType"
          value={form.bloodType}
          onChange={handleChange}
          required
        >
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
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}
