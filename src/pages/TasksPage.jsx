import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../services/firebase";

function TasksPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("High");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));

      const taskList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTasks(taskList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const handleAddTask = async () => {
    if (!title || !description || !deadline) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

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

      fetchTasks();
    } catch (error) {
      console.log(error);
      alert("Error adding task");
    }

    setLoading(false);
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
    if (!window.confirm("Delete this task?")) return;

    try {
      await deleteDoc(doc(db, "tasks", id));
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Complete Task
  const handleCompleteTask = async (id, currentStatus) => {
    try {
      await updateDoc(doc(db, "tasks", id), {
        completed: !currentStatus,
      });

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // Google Calendar Export
  const addToGoogleCalendar = (task) => {
    const date = task.deadline.replace(/-/g, "");

    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      task.title
    )}&details=${encodeURIComponent(
      task.description
    )}&dates=${date}/${date}`;

    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-5xl font-bold mb-8">
          📋 Manage Tasks
        </h1>

        {/* Add Task Form */}

        <div className="bg-slate-900 p-8 rounded-2xl mb-10">

          <h2 className="text-2xl font-bold mb-6">
            Add New Task
          </h2>

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
            rows="4"
          />

          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full p-4 rounded-lg bg-slate-800 mb-4"
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full p-4 rounded-lg bg-slate-800 mb-6"
          >
            <option value="High">🔴 High Priority</option>
            <option value="Medium">🟡 Medium Priority</option>
            <option value="Low">🟢 Low Priority</option>
          </select>

          <button
            onClick={handleAddTask}
            disabled={loading}
            className="bg-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-700"
          >
            {loading ? "Adding..." : "Add Task"}
          </button>

        </div>

        {/* Task List */}

        <h2 className="text-3xl font-bold mb-6">
          Your Tasks
        </h2>

        {tasks.length === 0 ? (
          <div className="bg-slate-900 p-10 rounded-2xl text-center">
            <h3 className="text-2xl font-bold">
              No Tasks Found
            </h3>

            <p className="text-gray-400 mt-3">
              Add your first task to get started.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {tasks.map((task) => (

              <div
                key={task.id}
                className={`p-6 rounded-2xl shadow-lg ${
                  task.completed
                    ? "bg-green-900"
                    : "bg-slate-900"
                }`}
              >

                <h3
                  className={`text-2xl font-bold ${
                    task.completed ? "line-through" : ""
                  }`}
                >
                  {task.title}
                </h3>

                <p className="text-gray-300 mt-3">
                  {task.description}
                </p>

                <p className="mt-4">
                  📅 Deadline: {task.deadline}
                </p>

                <p className="mt-2">
                  🔥 Priority: {task.priority}
                </p>

                <p className="mt-2">
                  Status:{" "}
                  {task.completed
                    ? "✅ Completed"
                    : "⏳ Pending"}
                </p>

                <div className="flex flex-wrap gap-3 mt-6">

                  <button
                    onClick={() =>
                      handleCompleteTask(
                        task.id,
                        task.completed
                      )
                    }
                    className="bg-green-600 px-4 py-2 rounded-lg hover:bg-green-700"
                  >
                    {task.completed
                      ? "Undo"
                      : "Complete"}
                  </button>

                  <button
                    onClick={() =>
                      handleDeleteTask(task.id)
                    }
                    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() =>
                      addToGoogleCalendar(task)
                    }
                    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    📅 Calendar
                  </button>

                </div>

              </div>

            ))}

          </div>
        )}

      </div>
    </div>
  );
}

export default TasksPage;