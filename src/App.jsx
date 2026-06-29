import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from "./components/ProtectedRoute";

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import TasksPage from './pages/TasksPage'
import PlannerPage from './pages/PlannerPage'
import PanicModePage from './pages/PanicModePage'
import AnalyticsPage from './pages/AnalyticsPage'
import ProfilePage from './pages/ProfilePage'
import ReminderPage from "./pages/ReminderPage";
import CalendarPage from "./pages/CalendarPage";
import PrioritizationPage from "./pages/PrioritizationPage";
import InsightsPage from "./pages/InsightsPage";
import HabitsPage from "./pages/HabitsPage";
import DailyPlannerPage from "./pages/DailyPlannerPage";
import VoiceAssistantPage from "./pages/VoiceAssistantPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/dashboard" element={<ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>} />
      <Route path="/tasks" element={<TasksPage />} />
      <Route path="/planner" element={<PlannerPage />} />
      <Route path="/panic-mode" element={<PanicModePage />} />
      <Route path="/analytics" element={<AnalyticsPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/reminder" element={<ReminderPage />} />
      <Route path="/calendar" element={<CalendarPage />} />
      <Route path="/prioritize" element={<PrioritizationPage />}/>
      <Route path="/insights" element={<InsightsPage />}/>
      <Route path="/habits" element={<HabitsPage />}/>
      <Route path="/daily-planner" element={<DailyPlannerPage />}/>
      <Route path="/voice-assistant" element={<VoiceAssistantPage />}/>
    </Routes>
  )
}

export default App