import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center p-6 border-b border-slate-800">
        <h1 className="text-3xl font-bold text-indigo-400">
          Deadline Guardian AI
        </h1>

        <button
          onClick={handleLogout}
          className="bg-red-600 px-5 py-2 rounded-lg hover:bg-red-700"
        >
          Logout
        </button>
      </nav>

      {/* Main Content */}
      <div className="p-8">

        <h2 className="text-4xl font-bold mb-8">
          Welcome Back 👋
        </h2>

        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold">Today's Tasks</h3>
            <p className="text-gray-400 mt-4">
              No tasks added yet.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold">AI Recommendations</h3>
            <p className="text-gray-400 mt-4">
              Your AI suggestions will appear here.
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-2xl font-bold">
              Productivity Score
            </h3>
            <p className="text-5xl font-bold text-indigo-400 mt-6">
              85%
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-10">

          <h2 className="text-3xl font-bold mb-6">
            Quick Actions
          </h2>

          <div className="flex flex-wrap gap-4">

            <button
              onClick={() => navigate("/tasks")}
              className="bg-indigo-600 px-6 py-4 rounded-xl hover:bg-indigo-700"
            >
              Manage Tasks
            </button>

            <button
              onClick={() => navigate("/planner")}
              className="bg-green-600 px-6 py-4 rounded-xl hover:bg-green-700"
            >
              AI Planner
            </button>

            <button
              onClick={() => navigate("/panic-mode")}
              className="bg-red-600 px-6 py-4 rounded-xl hover:bg-red-700"
            >
              🚨 Panic Mode
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;