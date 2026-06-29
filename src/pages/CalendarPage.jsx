import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Navbar from "../components/Navbar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [tasks, setTasks] = useState([]);

  // Fetch tasks
  useEffect(() => {
    fetchTasks();
  }, []);

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

  // Convert deadline string to Date object
  const parseTaskDate = (deadline) => {
    if (!deadline) return null;

    const parts = deadline.split("-");

    // YYYY-MM-DD
    if (parts[0].length === 4) {
      return new Date(deadline);
    }

    // DD-MM-YYYY
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return new Date(`${year}-${month}-${day}`);
    }

    return null;
  };

  // Tasks for selected date
  const selectedTasks = tasks.filter((task) => {
    const taskDate = parseTaskDate(task.deadline);

    if (!taskDate) return false;

    return (
      taskDate.toDateString() === date.toDateString()
    );
  });

  // Show dot only for pending tasks
  const tileContent = ({ date, view }) => {
    if (view !== "month") return null;

    const hasPendingTask = tasks.some((task) => {
      // Ignore completed tasks
      if (task.completed) return false;

      const taskDate = parseTaskDate(task.deadline);

      if (!taskDate) return false;

      return (
        taskDate.toDateString() ===
        date.toDateString()
      );
    });

    return hasPendingTask ? (
      <div className="flex justify-center mt-1">
        <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
      </div>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-8">
          📅 Calendar View
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Calendar */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <Calendar
              onChange={setDate}
              value={date}
              tileContent={tileContent}
            />
          </div>

          {/* Tasks */}
          <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-6">
              Tasks on {date.toDateString()}
            </h2>

            {selectedTasks.length === 0 ? (
              <p className="text-gray-400">
                No tasks scheduled for this date.
              </p>
            ) : (
              <div className="space-y-4">
                {selectedTasks.map((task) => (
                  <div
                    key={task.id}
                    className={`p-4 rounded-xl ${
                      task.completed
                        ? "bg-green-900"
                        : "bg-slate-800"
                    }`}
                  >
                    <h3 className="text-xl font-bold">
                      {task.title}
                    </h3>

                    <p className="text-gray-300 mt-2">
                      {task.description}
                    </p>

                    <p className="mt-2">
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
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default CalendarPage;