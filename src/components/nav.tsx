import { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
const Navigation = () => {
  const [user] = useAuthState(auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {user ? (
        <nav className={`mr-4 ${isOpen ? "block" : "hidden"} md:block`}>
          <ul className="flex">
            <li>
              <a href="#" className="mx-2 hover:text-gray-300">
                マイページ
              </a>
            </li>
            <li>
              <a href="#" className="mx-2 hover:text-gray-300">
                ユーザ編集
              </a>
            </li>
            <li>
              <a href="#" className="mx-2 hover:text-gray-300">
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
