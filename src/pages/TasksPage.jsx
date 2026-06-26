import { useState, useEffect } from "react";
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
  };

  // Delete Task
  const handleDeleteTask = async (id) => {
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

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        Manage Tasks
      </h1>

      {/* Add Task Form */}
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

      {/* Task List */}
      <div className="mt-10">

        <h2 className="text-3xl font-bold mb-6">
          Your Tasks
        </h2>

        <div className="grid md:grid-cols-2 gap-6">

          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-6 rounded-2xl ${
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

              <p className="text-gray-300 mt-2">
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
                {task.completed ? "✅ Completed" : "⏳ Pending"}
              </p>

              <div className="flex gap-3 mt-5">

                <button
                  onClick={() =>
                    handleCompleteTask(
                      task.id,
                      task.completed
                    )
                  }
                  className="bg-green-600 px-4 py-2 rounded-lg"
                >
                  {task.completed
                    ? "Undo"
                    : "Complete"}
                </button>

                <button
                  onClick={() =>
                    handleDeleteTask(task.id)
                  }
                  className="bg-red-600 px-4 py-2 rounded-lg"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default TasksPage;