import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";
import Navbar from "../components/Navbar";

function RemindersPage() {
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [todayTasks, setTodayTasks] = useState([]);
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "tasks"),
      (snapshot) => {
        const tasks = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const overdue = [];
        const dueToday = [];
        const upcoming = [];

        tasks.forEach((task) => {
          if (!task.deadline || task.completed) return;

          const taskDate = new Date(task.deadline);
          taskDate.setHours(0, 0, 0, 0);

          if (taskDate < today) {
            overdue.push(task);
          } else if (taskDate.getTime() === today.getTime()) {
            dueToday.push(task);
          } else {
            upcoming.push(task);
          }
        });

        setOverdueTasks(overdue);
        setTodayTasks(dueToday);
        setUpcomingTasks(upcoming);

        // Browser Notification
        if (
          dueToday.length > 0 &&
          Notification.permission === "granted"
        ) {
          new Notification("Deadline Guardian AI", {
            body: `You have ${dueToday.length} task(s) due today!`,
          });
        }
      }
    );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <Navbar />
      <h1 className="text-4xl font-bold mb-8">
        🔔 Smart Reminders
      </h1>

      {/* Overdue */}
      <section className="mb-10">
        <h2 className="text-2xl text-red-500 font-bold mb-4">
          🔴 Overdue Tasks
        </h2>

        {overdueTasks.length === 0 ? (
          <p>No overdue tasks 🎉</p>
        ) : (
          overdueTasks.map((task) => (
            <div
              key={task.id}
              className="bg-red-900 p-4 rounded-xl mb-3"
            >
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Deadline: {task.deadline}</p>
            </div>
          ))
        )}
      </section>

      {/* Today */}
      <section className="mb-10">
        <h2 className="text-2xl text-yellow-400 font-bold mb-4">
          🟡 Due Today
        </h2>

        {todayTasks.length === 0 ? (
          <p>No tasks due today.</p>
        ) : (
          todayTasks.map((task) => (
            <div
              key={task.id}
              className="bg-yellow-700 p-4 rounded-xl mb-3"
            >
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Deadline: {task.deadline}</p>
            </div>
          ))
        )}
      </section>

      {/* Upcoming */}
      <section>
        <h2 className="text-2xl text-green-500 font-bold mb-4">
          🟢 Upcoming Tasks
        </h2>

        {upcomingTasks.length === 0 ? (
          <p>No upcoming tasks.</p>
        ) : (
          upcomingTasks.map((task) => (
            <div
              key={task.id}
              className="bg-green-900 p-4 rounded-xl mb-3"
            >
              <h3 className="font-bold">{task.title}</h3>
              <p>{task.description}</p>
              <p>Deadline: {task.deadline}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
}

export default RemindersPage;