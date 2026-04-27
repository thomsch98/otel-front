import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { TracesList } from './pages/Traces/TracesList'
import { TraceDetail } from './pages/Traces/TraceDetail'
import { Logs } from './pages/Logs'
import { Metrics } from './pages/Metrics'

function App() {
  const [resetVersion, setResetVersion] = useState(0)

  const handleResetComplete = () => {
    setResetVersion((previous) => previous + 1)
  }

  return (
    <BrowserRouter>
      <Layout onResetComplete={handleResetComplete}>
        <Routes key={resetVersion}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/traces" element={<TracesList />} />
          <Route path="/traces/:id" element={<TraceDetail />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/metrics" element={<Metrics />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
