import { useState } from "react";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();

    try {
      if (isSignup) {
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
      } else {
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
      }

      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center">

      <div className="bg-slate-900 p-10 rounded-2xl w-full max-w-md">

        <h1 className="text-4xl text-white font-bold text-center mb-8">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h1>

        <form onSubmit={handleEmailAuth} className="space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-4 rounded-lg bg-slate-800 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-4 rounded-lg bg-slate-800 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 p-4 rounded-lg text-white font-semibold"
          >
            {isSignup ? "Sign Up" : "Login"}
          </button>

        </form>

        <button
          onClick={handleGoogleLogin}
          className="w-full mt-6 bg-white text-black p-4 rounded-lg font-semibold"
        >
          Continue with Google
        </button>

        <p className="text-center text-gray-400 mt-6">
          {isSignup
            ? "Already have an account?"
            : "Don't have an account?"}

          <button
            onClick={() => setIsSignup(!isSignup)}
            className="text-indigo-400 ml-2"
          >
            {isSignup ? "Login" : "Sign Up"}
          </button>
        </p>

      </div>

    </div>
  );
}

export default LoginPage;