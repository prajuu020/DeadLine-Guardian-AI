import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-black text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-6">
        <h1 className="text-3xl font-bold text-indigo-400">
          Deadline Guardian AI
        </h1>

        <Link
          to="/login"
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2 rounded-lg font-semibold transition"
        >
          Get Started
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center px-6 mt-24">

        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-extrabold leading-tight"
        >
          Never Miss <br />
          Another Deadline
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-xl text-gray-300 max-w-3xl"
        >
          Your AI-powered productivity companion that plans,
          prioritizes, motivates, and rescues you before deadlines are missed.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-12 flex gap-4"
        >
          <Link
            to="/login"
            className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-xl font-semibold text-lg"
          >
            Start Free
          </Link>

          <Link
            to="/planner"
            className="border border-indigo-500 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-indigo-900"
          >
            Explore AI Planner
          </Link>
        </motion.div>
      </section>

      {/* Features */}
      <section className="mt-32 px-8 pb-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Deadline Guardian?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-slate-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              🤖 Smart AI Planning
            </h3>
            <p className="text-gray-400">
              AI automatically breaks goals into manageable tasks and schedules them intelligently.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              🚨 Panic Mode
            </h3>
            <p className="text-gray-400">
              Missed deadlines? Generate emergency recovery plans instantly.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold mb-4">
              📈 Productivity Analytics
            </h3>
            <p className="text-gray-400">
              Discover productivity patterns and improve your performance over time.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
}

export default LandingPage;