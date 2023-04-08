import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { getAuth, setPersistence, signInWithEmailAndPassword, browserLocalPersistence } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
const Navigation = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // ログイン状態を永続化
    setPersistence(auth,browserLocalPersistence)
      .then(() => {
        // ユーザーのログイン状態を監視
        auth.onAuthStateChanged((user) => {
          if (user) {
            setCurrentUser(user);
          } else {
            setCurrentUser({});
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {currentUser ? (
        <nav className={`mr-4 ${isOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex">
            <li>
              <Link href="/users/mypage" className="mx-2 hover:text-gray-300">
                マイページ
              </Link>
            </li>
            <li>
              <a href="/users/edit" className="mx-2 hover:text-gray-300">
                ユーザ編集
              </a>
            </li>
            <li>
              <a href="/animes" className="mx-2 hover:text-gray-300">
                投稿一覧
              </a>
            </li>
          </ul>
        </nav>

      ) : (
        <nav className={`mr-4 ${isOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex">
            <li>
              <a href="#" className="mx-2 hover:text-gray-300">
                企業紹介
              </a>
            </li>
            <li>
              <a href="#" className="mx-2 hover:text-gray-300">
                社長挨拶
              </a>
            </li>
            <li>
              <a href="#" className="mx-2 hover:text-gray-300">
                事業内容
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

export default Navigation;
