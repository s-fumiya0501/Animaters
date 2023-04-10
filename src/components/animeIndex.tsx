import React, { useEffect, useState } from "react";
import { IconButton, Rating } from "@mui/material";
import { Timestamp, doc, getDoc, runTransaction } from "firebase/firestore";
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

  function favorite(animeid: string,userid:string) {
    const animeRef = doc(db, "anime", animeid);

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
                  <IconButton>
                    <ThumbUpOffAltIcon />
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
