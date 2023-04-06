import React, { useState } from "react";
import { auth, db, storage } from "../../config/firebase";
import { doc, setDoc, Timestamp, collection, addDoc } from "firebase/firestore";
import styles from "../../styles/BookForm.module.css";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Header from "@/components/header";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import Router from "next/router";

const NewAnime = () => {
  const [animeName, setAnimeName] = useState("");
  const [impression, setImpression] = useState("");
  const [rating, setRating] = useState(3);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const Ref = await addDoc(collection(db, "anime"), {
      uid: auth.currentUser?.uid,
      name: animeName,
      impression: impression,
      rating: rating,
      createdAt: new Date(),
    }).catch((error) => {
      console.error("Error writing document: ", error);
    });
    Router.push("/books")
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnimeName(e.target.value);
  };

  const handleImpressionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setImpression(e.target.value);
  };

  const handleRatingChange = (event: any, newValue: any) => {
    setRating(newValue);
  };

  return (
    <>
      <Header />
      <form className={styles.form_container} onSubmit={handleSubmit}>
        <div className={styles.content}>
          <label htmlFor="animeName">アニメ名</label>
          <TextField
            label="name"
            fullWidth
            required
            variant="standard"
            type="text"
            id="animeName"
            value={animeName}
            onChange={handleNameChange}
          />
        </div>

        <div className={styles.content}>
          <label htmlFor="impression">感想</label>
          <TextField
            id="impression"
            value={impression}
            onChange={handleImpressionChange}
            aria-label="感想"
            placeholder="感想を入力してください"
            multiline
            rows={4}
            fullWidth
          />
        </div>
        <div className={styles.content}>
        <h2>評価</h2>
          <Rating
            name="rating"
            value={rating}
            precision={1}
            onChange={handleRatingChange}
          />
        </div>
        <Button type="submit" variant="contained">投稿</Button>
      </form>
    </>
  );
};
export default NewAnime;
