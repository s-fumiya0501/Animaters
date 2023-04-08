import React, { useEffect, useState } from "react";
import { Avatar, Rating } from "@mui/material";
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
import getUsers from "../lib/getUsers";

interface User {
  id: string;
  nickname: string;
  imageUrl: string;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h2>ユーザ一覧</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>nickname</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell scope="row">
                  <Avatar alt={user.id} src={user.imageUrl} />
                </TableCell>
                <TableCell >
                  {user.nickname}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default Users;