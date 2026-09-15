import { Routes, Route } from 'react-router-dom'

import LoginPage from '@/pages/LoginPage'
import Dashboard from '@/pages/Dashboard'
import StudentsPage from '@/pages/students/StudentsPage'
import TeachersPage from '@/pages/teachers/TeachersPage'
import BatchesPage from '@/pages/batches/BatchesPage'
import ClassesPage from '@/pages/classes/ClassesPage'
import AttendancePage from '@/pages/attendance/AttendancePage'
import ResultsPage from '@/pages/results/ResultsPage'
import RankingsPage from '@/pages/rankings/RankingsPage'
import { Layout } from '@/components/Layout'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<Layout><Dashboard /></Layout>} />
      <Route path="/students" element={<Layout><StudentsPage /></Layout>} />
      <Route path="/teachers" element={<Layout><TeachersPage /></Layout>} />
      <Route path="/batches" element={<Layout><BatchesPage /></Layout>} />
      <Route path="/classes" element={<Layout><ClassesPage /></Layout>} />
      <Route path="/attendance" element={<Layout><AttendancePage /></Layout>} />
      <Route path="/results" element={<Layout><ResultsPage /></Layout>} />
      <Route path="/rankings" element={<Layout><RankingsPage /></Layout>} />
    </Routes>
  )
}

export default App