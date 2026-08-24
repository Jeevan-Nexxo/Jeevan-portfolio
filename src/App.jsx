import { Route, Routes } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import { SettingsProvider } from './context/SettingsContext'
import ScrollProgress from './components/layout/ScrollProgress'
import AdminPanel from './components/admin/AdminPanel'
import Home from './pages/Home'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <SettingsProvider>
      {/* reducedMotion="user" makes framer-motion respect the OS preference globally */}
      <MotionConfig reducedMotion="user">
        <ScrollProgress />
        <AdminPanel />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MotionConfig>
    </SettingsProvider>
  )
}
