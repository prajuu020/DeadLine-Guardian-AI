import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import Navbar from "../components/Navbar";
function Dashboard() {
  const navigate = useNavigate();

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);
  const [productivityScore, setProductivityScore] = useState(0);
  const [recentTasks, setRecentTasks] = useState([]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  const fetchAnalytics = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));

      const tasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const total = tasks.length;
      const completed = tasks.filter(
        (task) => task.completed
      ).length;

      const pending = total - completed;

      const score =
        total === 0
          ? 0
          : Math.round((completed / total) * 100);

      setTotalTasks(total);
      setCompletedTasks(completed);
      setPendingTasks(pending);
      setProductivityScore(score);

      // Show latest 5 tasks
      setRecentTasks(tasks.slice(0, 5));

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

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

        {/* Analytics Cards */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-xl font-bold">
              Total Tasks
            </h3>

            <p className="text-5xl font-bold text-indigo-400 mt-4">
              {totalTasks}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-xl font-bold">
              Completed
            </h3>

            <p className="text-5xl font-bold text-green-400 mt-4">
              {completedTasks}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-xl font-bold">
              Pending
            </h3>

            <p className="text-5xl font-bold text-yellow-400 mt-4">
              {pendingTasks}
            </p>
          </div>

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-xl font-bold">
              Productivity
            </h3>

            <p className="text-5xl font-bold text-pink-400 mt-4">
              {productivityScore}%
            </p>
          </div>

        </div>

        {/* Quick Actions */}
        <div className="mt-12">

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

        {/* Recent Tasks */}
        <div className="mt-12">

          <h2 className="text-3xl font-bold mb-6">
            Recent Tasks
          </h2>

          <div className="grid md:grid-cols-2 gap-4">

            {recentTasks.length === 0 ? (
              <div className="bg-slate-900 p-6 rounded-xl">
                No tasks available.
              </div>
            ) : (
              recentTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-900 p-6 rounded-xl"
                >
                  <h3 className="text-xl font-bold">
                    {task.title}
                  </h3>

                  <p className="text-gray-400 mt-2">
                    {task.description}
                  </p>

                  <p className="mt-3">
                    📅 {task.deadline}
                  </p>

                  <p className="mt-2">
                    🔥 {task.priority}
                  </p>

                  <p className="mt-2">
                    {task.completed
                      ? "✅ Completed"
                      : "⏳ Pending"}
                  </p>
                </div>
              ))
            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;