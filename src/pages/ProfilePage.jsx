import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <div className="flex justify-center items-center pt-20">
        <div className="bg-slate-900 p-8 rounded-2xl shadow-lg w-[400px] text-center">

          <h1 className="text-4xl font-bold mb-6">
            Profile Page
          </h1>

          {user ? (
            <>
              <img
                src={
                  user.photoURL ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt="Profile"
                className="w-28 h-28 rounded-full mx-auto mb-4"
              />

              <h2 className="text-2xl font-semibold">
                {user.displayName || "User"}
              </h2>

              <p className="text-slate-300 mt-2">
                {user.email}
              </p>

              <p className="text-sm text-slate-500 mt-4 break-all">
                UID: {user.uid}
              </p>
            </>
          ) : (
            <p>Loading user details...</p>
          )}

        </div>
      </div>
    </div>
  );
}

export default ProfilePage;