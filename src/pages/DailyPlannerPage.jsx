import { useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { generateDailyPlan } from "../services/gemini";
import ReactMarkdown from "react-markdown";

function DailyPlannerPage() {
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGeneratePlan = async () => {
    setLoading(true);

    try {
      const snapshot = await getDocs(collection(db, "tasks"));

      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const pendingTasks = tasks.filter(
        (task) => !task.completed
      );

      if (pendingTasks.length === 0) {
        alert("No pending tasks available.");
        setLoading(false);
        return;
      }

      const response = await generateDailyPlan(
        pendingTasks
      );

      setPlan(response);
    } catch (error) {
      console.log(error);
      alert("Failed to generate daily plan.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">

        <h1 className="text-5xl font-bold mb-4">
          🤖 Autonomous Daily Planner
        </h1>

        <p className="text-gray-400 mb-8">
          Let Gemini automatically organize your day
          based on deadlines, priorities and workload.
        </p>

        <button
          onClick={handleGeneratePlan}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-semibold"
        >
          {loading
            ? "Generating Schedule..."
            : "Generate Today's Plan"}
        </button>

        {plan && (
          <div className="mt-10 bg-slate-900 p-8 rounded-2xl">
            <h2 className="text-3xl font-bold mb-6">
              📅 Your AI Generated Schedule
            </h2>

            <div className="whitespace-pre-wrap leading-8 text-lg">
              {plan}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default DailyPlannerPage;