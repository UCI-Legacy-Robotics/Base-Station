import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Loading from './pages/Loading'
import Navigation from './pages/Navigation'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Loading />} />
      <Route path="/Navigation" element={<Navigation />} />
    </Routes>
  )
}

export default App
