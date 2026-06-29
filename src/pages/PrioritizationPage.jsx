import { useState } from "react";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import ReactMarkdown from "react-markdown";
import { generateTaskPriorities } from "../services/gemini";

function PrioritizationPage() {
  const [loading, setLoading] = useState(false);
  const [priorities, setPriorities] = useState("");

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      const snapshot = await getDocs(collection(db, "tasks"));

      const tasks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (tasks.length === 0) {
        alert("No tasks found");
        setLoading(false);
        return;
      }

      const result = await generateTaskPriorities(tasks);
      setPriorities(result);
    } catch (error) {
      console.log(error);
      alert("Error analyzing tasks");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-4">
          🧠 AI Smart Prioritization
        </h1>

        <p className="text-gray-400 mb-8">
          Let Gemini analyze your tasks and tell you what
          to work on first.
        </p>

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-semibold"
        >
          {loading
            ? "Analyzing Tasks..."
            : "Generate AI Priorities"}
        </button>

        {priorities && (
          <div className="mt-10 bg-slate-900 border border-slate-700 p-8 rounded-2xl shadow-xl">
                      <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
  🎯 AI Recommendations
</h2>

            <div className="markdown text-lg leading-8">
  <ReactMarkdown>{priorities}</ReactMarkdown>
</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PrioritizationPage;