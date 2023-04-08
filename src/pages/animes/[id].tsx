import Header from "@/components/header";
import { auth, db, storage } from "../../config/firebase";
import {
  collection,
  getDocs,
  query,
  orderBy,
  Timestamp,
  doc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  GetServerSidePropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { Button, Rating } from "@mui/material";
import  Router  from "next/router";
import Link from "next/link";

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

const handleDeletePost = async (id:string) => {
  if (window.confirm("本当に投稿を削除しますか？")) {
    await deleteDoc(doc(db, "anime",id));
    Router.push("/animes")
  }
};

const Anime = ({ anime }: Props) => {
  return (
    <>
      <Header />
      <div>
        <h1>{anime.name}</h1>
        <h1>{anime.uid}</h1>
        <p>{anime.impression}</p>
        <p>{anime.userName}</p>
        <Rating name="rating" value={anime.rating} readOnly />
        <Button variant="outlined" color="error" onClick={() => handleDeletePost(anime.id)}>
          削除する
        </Button>
        <Link href={`/animes/${anime.id}/edit`}>編集する</Link>
      </div>
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
export default Anime;
