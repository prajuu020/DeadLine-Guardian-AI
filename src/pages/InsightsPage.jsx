import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { generateProductivityInsights } from "../services/gemini";
import ReactMarkdown from "react-markdown";

function InsightsPage() {
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
    overdue: 0,
    score: 0,
  });

  const [aiInsights, setAiInsights] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    try {
      const snapshot = await getDocs(collection(db, "tasks"));

      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const total = tasks.length;
      const completed = tasks.filter(
        (task) => task.completed
      ).length;

      const pending = tasks.filter(
        (task) => !task.completed
      ).length;

      const today = new Date();

      const overdue = tasks.filter((task) => {
        if (task.completed || !task.deadline) return false;

        const taskDate = new Date(task.deadline);

        return taskDate < today;
      }).length;

      const score =
        total === 0
          ? 0
          : Math.round((completed / total) * 100);

      setStats({
        total,
        completed,
        pending,
        overdue,
        score,
      });

      setLoading(true);

      const insights =
        await generateProductivityInsights({
          total,
          completed,
          pending,
          overdue,
          score,
        });

      setAiInsights(insights);

      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-8">
          📈 Productivity Insights
        </h1>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-gray-400">Total Tasks</h3>
            <p className="text-4xl font-bold mt-2">
              {stats.total}
            </p>
          </div>

          <div className="bg-green-900 p-6 rounded-2xl">
            <h3 className="text-gray-200">
              Completed
            </h3>
            <p className="text-4xl font-bold mt-2">
              {stats.completed}
            </p>
          </div>

          <div className="bg-yellow-800 p-6 rounded-2xl">
            <h3 className="text-gray-200">Pending</h3>
            <p className="text-4xl font-bold mt-2">
              {stats.pending}
            </p>
          </div>

          <div className="bg-red-900 p-6 rounded-2xl">
            <h3 className="text-gray-200">Overdue</h3>
            <p className="text-4xl font-bold mt-2">
              {stats.overdue}
            </p>
          </div>

        </div>

        {/* Productivity Score */}
        <div className="bg-slate-900 mt-10 p-8 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">
            Productivity Score
          </h2>

          <div className="w-full bg-slate-700 rounded-full h-6">
            <div
              className="bg-indigo-600 h-6 rounded-full"
              style={{ width: `${stats.score}%` }}
            ></div>
          </div>

          <p className="text-4xl font-bold mt-4">
            {stats.score}/100
          </p>
        </div>

        {/* AI Insights */}
        <div className="bg-slate-900 mt-10 p-8 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">
            🤖 AI Recommendations
          </h2>

          {loading ? (
            <p className="text-indigo-400 animate-pulse text-lg">
  🤖 Gemini is analyzing your productivity...
</p>
          ) : (
            <div className="markdown leading-8 text-lg">
  <ReactMarkdown>{aiInsights}</ReactMarkdown>
</div>
          )}
        </div>

      </div>
    </div>
  );
}

export default InsightsPage;