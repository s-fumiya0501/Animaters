import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
const LogOutInbutton = () => {
  const [user, loading, error] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(user);
  useEffect(() => {
    setCurrentUser(user);
  }, [user]);
  const handleLogout = () => {
    auth.signOut();
  };
  console.log(user?.email)
  return (
    <>
      {user ? (
        <button
          className="bg-white text-black rounded-full px-4 py-2 mr-4 hover:bg-gray-200 hidden md:block"
          onClick={handleLogout}
        >
          Logout
        </button>
      ) : (
        <Link href="/signup">
          <button className="bg-white text-black rounded-full px-4 py-2 mr-4 hover:bg-gray-200 hidden md:block">
            Sign In
          </button>
        </Link>
      )}
    </>
  );
};

export default LogOutInbutton;
