import React, { useEffect, useState } from "react";
import { auth, db, storage } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Rating } from "@mui/material";
import { Timestamp } from 'firebase/firestore';
import getPosts from '../lib/getPosts';
interface Post {
  id: string;
  name: string;
  impression: string
  createdAt: Timestamp;
  rating: number;
  userName: string;
}
const Books = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {

      const data = await getPosts();
      setPosts(data);
    };

    fetchPosts();
    console.log(posts);
  }, []);

  return (
    <div>
      <h2>投稿一覧</h2>
      <ul>
        {posts.map((item) => (
          <li key={item.id}>
            <h3>{item.name}</h3>
            <p>{item.impression}</p>
            <p>{item.userName}</p>
            <Rating name="rating" value={item.rating}  readOnly />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
