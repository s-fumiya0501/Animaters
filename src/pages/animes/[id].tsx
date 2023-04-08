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
} from "firebase/firestore";
import {
  GetServerSideProps,
  GetStaticPaths,
  GetStaticProps,
  GetServerSidePropsContext,
  InferGetStaticPropsType,
  NextPage,
} from "next";
import { Rating } from "@mui/material";

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

const Anime = ({ anime }: Props) => {
  return (
    <>
      <Header/>
      <div>
        <h1>{anime.name}</h1>
        <p>{anime.impression}</p>
        <p>{anime.userName}</p>
        <Rating name="rating" value={anime.rating} readOnly />
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
