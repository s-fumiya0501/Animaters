import React, { useEffect, useState } from "react";
import { IconButton, Rating } from "@mui/material";
import {
  Timestamp,
  doc,
  getDoc,
  runTransaction,
  onSnapshot,
} from "firebase/firestore";
import { auth } from "@/config/firebase";
import { styled } from "@mui/material/styles";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Link from "next/link";

import getPosts from "../lib/getPosts";
import { db } from "@/config/firebase";

interface Post {
  id: string;
  name: string;
  impression: string;
  createdAt: Timestamp;
  rating: number;
  userName: string;
  liked_by: string[];
  likes: number;
}

const Books = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    fetchPosts();
  }, []);

  function FavoriteorUnFavorite(animeid: string, userid: string) {
    const animeRef = doc(db, "anime", animeid);

    runTransaction(db, (transaction) => {
      return getDoc(animeRef).then((animeDoc) => {
        if (!animeDoc.exists()) {
          throw new Error("Anime document does not exist!");
        }
        const likedBy = animeDoc.data()?.liked_by ?? [];
        const likes = animeDoc.data()?.likes ?? 0;

        if (likedBy.includes(userid)) {
          const index = likedBy.indexOf(userid);
          likedBy.splice(index, 1);
          transaction.update(animeRef, {
            liked_by: likedBy,
            likes: likes - 1,
          });
          displaylike(animeid);
          console.log("Anime cancel liked successfully!");
        } else {
          transaction.update(animeRef, {
            liked_by: [...likedBy, userid],
            likes: likes + 1,
          });
          console.log("Anime liked successfully!");
          displaylike(animeid);
        }
      });
    }).catch((error) => {
      console.error("Error liking anime: ", error);
    });
  }

  function displaylike(animeid: string) {
    const animeRef = doc(db, "anime", animeid);

    onSnapshot(animeRef, (animeDoc) => {
      const likes = animeDoc.data()!.likes;
      const likesElement = document.getElementById("likes-" + animeid);
      
      likesElement!.textContent = likes;
    });
  }

  return (
    <div>
      <h2>投稿一覧</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>アニメ名</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>投稿者</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell component="th" scope="row">
                  <Link href={`/animes/${post.id}`}>{post.name}</Link>
                </TableCell>
                <TableCell>
                  <Rating name="rating" value={post.rating} readOnly />
                </TableCell>
                <TableCell>{post.userName}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() =>
                      FavoriteorUnFavorite(post.id, auth.currentUser!.uid)
                    }
                  >
                    {post.liked_by.includes(auth.currentUser!.uid) ? (
                      <ThumbUpOffAltIcon style={{ color: "green" }} />
                    ) : (
                      <ThumbUpOffAltIcon  />
                    )}
                    <div id={`likes-${post.id}`}>{post.likes}</div>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Books;
