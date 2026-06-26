import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../services/firebase";

function TasksPage() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("High");

  const handleAddTask = async () => {
    try {
      await addDoc(collection(db, "tasks"), {
        title,
        description,
        deadline,
        priority,
        completed: false,
        createdAt: new Date(),
      });

      alert("Task Added Successfully!");

      setTitle("");
      setDescription("");
      setDeadline("");
      setPriority("High");

    } catch (error) {
      console.log(error);
      alert("Error adding task");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Manage Tasks
      </h1>

      <div className="bg-slate-900 p-6 rounded-2xl">

        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
        />

        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
        ></textarea>

        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full p-4 rounded-lg bg-slate-800 mb-4"
        >
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
        </select>

        <button
          onClick={handleAddTask}
          className="bg-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-700"
        >
          Add Task
        </button>

      </div>

    </div>
  );
}

export default TasksPage;