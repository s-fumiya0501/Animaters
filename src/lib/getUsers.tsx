import { collection, getDocs, query, orderBy, Timestamp, doc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from "../config/firebase";

interface User {
  id: string;
  nickname: string;
  imageUrl: string;
}

const getUsers = async (): Promise<User[]> =>{
  const users: User[] = []
  const userRef = collection(db, "users");
  const snapshot = await getDocs(userRef);
  for (const a of snapshot.docs){
    const data = a.data();
    if (data){
      users.push({
        id: a.id,
        nickname: data.nickname,
        imageUrl: data.imageUrl
      });
    }
  }
  return users;
}

export default getUsers;