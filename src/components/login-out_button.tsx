import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Router from 'next/router'
const LogOutInbutton = () => {
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    // ログイン状態を永続化
    setPersistence(auth,browserLocalPersistence)
      .then(() => {
        // ユーザーのログイン状態を監視
        auth.onAuthStateChanged((user) => {
          if (user) {
            setCurrentUser(user);
          } else {
            setCurrentUser(null);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      auth.signOut()
      .then(() => {
        setCurrentUser(null);
        Router.push("/")
      })
// ログアウト
    } catch (error) {
      console.error('Error occurred while signing out:', error);
    }
  };

  return (
    <>
      {currentUser ? (
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
