
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-slate-900 p-4 flex gap-6 text-white">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/tasks">Tasks</Link>
      <Link to="/planner">Planner</Link>
      <Link to="/panic-mode">Panic Mode</Link>
      <Link to="/reminder">Reminder</Link>
      <Link to="/prioritize">AI Prioritization</Link>
      <Link to="/insights"> Insights </Link>
      <Link to="/habits"> Habits </Link>
      <Link to="/daily-planner"> Daily Planner </Link>
      <Link to="/voice-assistant"> Voice Assistant </Link>
            <Link to="/calendar">Calendar</Link>
                  <Link to="/profile">Profile</Link>

    </nav>
  );
}

export default Navbar;