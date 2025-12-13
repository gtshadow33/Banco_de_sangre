import React, { useState } from 'react'
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './views/Home'
import AddDonor from './views/AddDonor'
import SearchById from './views/SearchById'
import SearchByBlood from './views/SearchByBlood'
import TokenLogin from './views/Token' 
import './assets/styles.css'

export default function App() {
  const [apiToken, setApiToken] = useState(null)

  // Siempre pedimos el token al entrar, no revisamos localStorage
  if (!apiToken) {
    return <TokenLogin onSuccess={setApiToken} />
  }

  return (
    <Router>
      <nav>
        <Link to="/">Inicio</Link>
        <Link to="/add">Agregar Donante</Link>
        <Link to="/search-id">Buscar por ID</Link>
        <Link to="/search-blood">Buscar por Compatibilidad</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddDonor />} />
        <Route path="/search-id" element={<SearchById />} />
        <Route
          path="/search-blood"
          element={<SearchByBlood apiToken={apiToken} />}
        />
      </Routes>
    </Router>
  )
}
