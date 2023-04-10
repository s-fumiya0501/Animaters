import { collection, getDocs, query, orderBy, Timestamp, doc, getDoc } from 'firebase/firestore';
import { auth, db, storage } from "../config/firebase";

interface Post {
  id: string;
  name: string;
  impression: string
  createdAt: Timestamp;
  rating: number;
  userName: string;
  liked_by:string[];
  likes: number;
}

const getPosts = async (): Promise<Post[]> => {
  const posts: Post[] = [];

  const postRef = collection(db, 'anime');
  const userRef = collection(db, 'users');
  const snapshot = await getDocs(query(postRef, orderBy('createdAt', 'desc')));

  for (const a of snapshot.docs) {
    const data = a.data();
    const uid = data.uid;
    const docRef = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    if (userData) {
      posts.push({
        id: a.id,
        name: data.name,
        createdAt: data.createdAt,
        userName: userData.nickame,
        impression: data.impression,
        rating: data.rating,
        likes:data.likes,
        liked_by: data.liked_by
      });
    }
  }

  return posts;
};

export default getPosts;