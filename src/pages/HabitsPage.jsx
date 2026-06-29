import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../services/firebase";

function HabitsPage() {
  const [habitName, setHabitName] = useState("");
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const snapshot = await getDocs(collection(db, "habits"));

      const habitList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHabits(habitList);
    } catch (error) {
      console.log(error);
    }
  };

  const addHabit = async () => {
    if (!habitName.trim()) {
      alert("Please enter a habit");
      return;
    }

    try {
      await addDoc(collection(db, "habits"), {
        name: habitName,
        streak: 0,
        completedToday: false,
        lastCompleted: "",
        createdAt: new Date(),
      });

      setHabitName("");
      fetchHabits();
    } catch (error) {
      console.log(error);
      alert("Error adding habit");
    }
  };

  const markCompleted = async (habit) => {
    try {
      const today = new Date().toDateString();

      if (habit.lastCompleted === today) {
        alert("Habit already completed today");
        return;
      }

      await updateDoc(doc(db, "habits", habit.id), {
        streak: (habit.streak || 0) + 1,
        completedToday: true,
        lastCompleted: today,
      });

      fetchHabits();
    } catch (error) {
      console.log(error);
    }
  };

  const totalHabits = habits.length;
  const completedHabits = habits.filter(
    (habit) => habit.lastCompleted === new Date().toDateString()
  ).length;

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-5xl font-bold mb-8">
          🎯 Habit Tracker
        </h1>

        {/* Add Habit */}
        <div className="bg-slate-900 p-6 rounded-2xl mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Add New Habit
          </h2>

          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Example: Study DSA"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="flex-1 p-4 rounded-xl bg-slate-800"
            />

            <button
              onClick={addHabit}
              className="bg-indigo-600 px-8 py-4 rounded-xl hover:bg-indigo-700"
            >
              Add Habit
            </button>
          </div>
        </div>

        {/* Analytics */}
        <div className="grid md:grid-cols-2 gap-6 mb-10">

          <div className="bg-slate-900 p-6 rounded-2xl">
            <h3 className="text-gray-400">
              Total Habits
            </h3>

            <p className="text-4xl font-bold mt-3">
              {totalHabits}
            </p>
          </div>

          <div className="bg-green-900 p-6 rounded-2xl">
            <h3 className="text-gray-200">
              Completed Today
            </h3>

            <p className="text-4xl font-bold mt-3">
              {completedHabits}
            </p>
          </div>

        </div>

        {/* Habit List */}
        <div className="grid md:grid-cols-2 gap-6">

          {habits.map((habit) => (
            <div
              key={habit.id}
              className="bg-slate-900 p-6 rounded-2xl"
            >
              <h3 className="text-2xl font-bold">
                {habit.name}
              </h3>

              <p className="mt-4 text-lg">
                🔥 Streak: {habit.streak || 0} days
              </p>

              <p className="mt-2 text-gray-400">
                Last Completed:
                {" "}
                {habit.lastCompleted || "Never"}
              </p>

              <button
                onClick={() => markCompleted(habit)}
                className="mt-6 bg-green-600 px-6 py-3 rounded-xl hover:bg-green-700"
              >
                ✅ Mark Completed Today
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default HabitsPage;