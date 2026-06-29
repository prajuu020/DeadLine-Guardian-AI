import { useState } from "react";
import { generatePanicPlan } from "../services/gemini";
import Navbar from "../components/Navbar";
import ReactMarkdown from "react-markdown";


function PanicModePage() {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [progress, setProgress] = useState(0);

  const [plan, setPlan] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);

    try {
      const response = await generatePanicPlan(
        task,
        deadline,
        progress
      );

      setPlan(response);
    } catch (error) {
      console.log(error);
      alert("Error generating emergency plan");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-red-500">
        🚨 AI Panic Mode
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl">

        <input
          type="text"
          placeholder="Task Name"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
        />

        <input
          type="text"
          placeholder="Deadline (Tomorrow 5 PM)"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
        />

        <input
          type="number"
          placeholder="Progress %"
          value={progress}
          onChange={(e) => setProgress(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
        />

        <button
          onClick={handleGenerate}
          className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700"
        >
          {loading ? "Generating..." : "Generate Emergency Plan"}
        </button>
      </div>

      {plan && (
  <div className="bg-slate-900 mt-8 p-6 rounded-2xl markdown">
    <ReactMarkdown>{plan}</ReactMarkdown>
  </div>
)}
    </div>
  );
}

export default PanicModePage;