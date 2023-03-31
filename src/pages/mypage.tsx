import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

const UserInfo = () => {
  const [user, loading, error] = useAuthState(auth);
  const [currentUser, setCurrentUser] = useState(user);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    setCurrentUser(user);
    if (user) {
      const fetchData = async () => {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if(data){
          setName(data.name);
          setAddress(data.address);
          setEmail(user.email);
          console.log(data);
        }

      };
      fetchData();
    }
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-6">{name}</h1>
      <p className="text-lg mb-2">{address}</p>
      <p className="text-lg">{email}</p>
    </div>
  );
};

export default UserInfo;
