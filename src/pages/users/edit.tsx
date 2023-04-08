import Header from "@/components/header";
import { auth, db } from "@/config/firebase";
import {
  Button,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { browserLocalPersistence, setPersistence, updateEmail, updateProfile } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Router from "next/router";
const EditUser = () => {
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [currentUser, setCurrentUser] = useState(null);
  const user = auth.currentUser;
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        auth.onAuthStateChanged((user) => {
          console.log(!user);
          if (user) {
            setName(user.displayName ?? "");
            setEmail(user.email ?? "");
            setCurrentUser(user);
            const fetchData = async () => {
              const docRef = doc(db, "users", user.uid);
              const docSnap = await getDoc(docRef);
              const data = docSnap.data();
              if (data) {
                setImageUrl(data.imageUrl);
                setNickname(data.nickname ?? "noname");
                setGender(data.gender ?? "");
                console.log(user.email);
              }
            };
            fetchData();
          } else {
            setCurrentUser(null);
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user = auth.currentUser;
  
    if (user) {
      const userDocRef = doc(db, "users", user.uid);
  
      try {
        await updateProfile(user, {
          displayName: name,
        });

        await updateEmail(user, email);
  
        await updateDoc(userDocRef, {
          nickname,
          gender,
          imageUrl,
        });
        Router.push("/users/mypage");
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <Header />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">名前</label>
        <TextField
          label="name"
          fullWidth
          required
          variant="standard"
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <TextField
          label="Email"
          type="email"
          fullWidth
          required
          variant="standard"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <label htmlFor="nickname">ニックネーム</label>
        <TextField
          label="nickname"
          fullWidth
          required
          variant="standard"
          type="text"
          id="nickname"
          value={nickname}
          onChange={(event) => setNickname(event.target.value)}
        />
        <FormLabel component="legend">性別</FormLabel>
        <RadioGroup
          aria-label="gender"
          name="gender"
          value={gender}
          onChange={(event) => setGender(event.target.value)}
        >
          <FormControlLabel value="male" control={<Radio />} label="男性" />
          <FormControlLabel value="female" control={<Radio />} label="女性" />
          <FormControlLabel value="other" control={<Radio />} label="その他" />
        </RadioGroup>
        <Button type="submit" variant="contained">投稿</Button>
      </form>
    </>
  );
};

export default EditUser;