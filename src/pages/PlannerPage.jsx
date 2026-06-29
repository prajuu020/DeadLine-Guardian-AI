import { useState } from "react";
import { generatePlan } from "../services/gemini";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";

function PlannerPage() {
  const [goal, setGoal] = useState("");
  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!goal) return;

    setLoading(true);

    const response = await generatePlan(goal);

    setPlan(response);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        AI Goal Decomposer
      </h1>

      <textarea
        placeholder="Example: Learn React in 15 days"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        className="w-full p-4 rounded-xl bg-slate-900 mb-4 h-40"
      />

      <button
        onClick={handleGenerate}
        className="bg-indigo-600 px-6 py-3 rounded-lg"
      >
        {loading ? "Generating..." : "Generate Plan"}
      </button>

      {plan && (
  <div className="bg-slate-900 mt-8 p-6 rounded-2xl markdown">
    <ReactMarkdown>{plan}</ReactMarkdown>
  </div>
)}

    </div>
  );
}

export default PlannerPage;