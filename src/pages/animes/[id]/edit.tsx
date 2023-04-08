import Header from "@/components/header";
import { auth, db } from "@/config/firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import styles from "../../../styles/BookForm.module.css";
import { Button, Rating, TextField } from "@mui/material";
type Anime = {
  id: string;
  name: string;
  impression: string;
  createdAt: string;
  rating: number;
  userName: string;
  uid: string;
};

type Props = {
  anime: Anime;
};

const AnimeEdit = ({ anime }: Props) => {
  const [animeName, setAnimeName] = useState(anime.name);
  const [impression, setImpression] = useState(anime.impression);
  const [rating, setRating] = useState(anime.rating);
  useEffect(() => {
    if (anime.uid !== auth.currentUser?.uid) {
      console.log(anime.uid);
      Router.push(`/animes/${anime.id}`);
    }
  }, [anime.id, anime.uid]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const animeRef = doc(db, "anime", anime.id);
    const Ref = await updateDoc(animeRef, {
      uid: auth.currentUser?.uid,
      name: animeName,
      impression: impression,
      rating: rating
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
        <Button type="submit" variant="contained">
          投稿
        </Button>
      </form>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext
) => {
  const id = context.params?.id as string | undefined;
  const docRef = doc(db, "anime", id as string);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const animeData = { id: docSnap.id, ...docSnap.data() } as Anime;
    animeData.createdAt = animeData.createdAt.toString();
    const docRef = doc(db, "users", animeData.uid);
    const set = await getDoc(docRef);
    animeData.userName = set.data()?.nickname;
    console.log(animeData);
    const format = animeData.name;
    return { props: { anime: animeData } };
  } else {
    console.log("No such document!");
    return { notFound: true };
  }
};

export default AnimeEdit;
