import React, { useEffect, useState } from "react";
import { Rating } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import { styled } from "@mui/material/styles";
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
            </TableRow>
          </TableHead>
          <TableBody>
            {posts.map((post) => (
              <TableRow key={post.id}>
                <TableCell component="th" scope="row">
                  <Link href={`/books/${post.id}`}>{post.name}</Link>
                </TableCell>
                <TableCell>
                  <Rating name="rating" value={post.rating} readOnly />
                </TableCell>
                <TableCell>{post.userName}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};


export default Books;
