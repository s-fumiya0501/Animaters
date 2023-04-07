import { useAuthState } from "react-firebase-hooks/auth";
import { useDocument } from "react-firebase-hooks/firestore";
import { auth, db, storage } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Router from "next/router";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import styles from "../../styles/MyPage.module.css";
import Header from "@/components/header";

const UserInfo = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState<string>("https://example.com/default-image.jpg");
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
  
  useEffect(() => {
    const imageRef = ref(storage, `users/${imageUrl}`);
    getDownloadURL(imageRef)
      .then((url) => {
        setImageUrl(url);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [imageUrl]);
  return (
    <>
      <Header />
      {currentUser == null ? (
        <div>404 not found</div>
      ) : (
        <div className={styles.my_page}>
          <div className={styles.profile_image}>
            {imageUrl ? (
              <img src={imageUrl} alt="Profile" />
            ) : (
              <div className={styles.default_image}>No Image</div>
            )}
          </div>
          <div className={styles.profile_info}>
            <div className={styles.name}>{name}</div>
            <div className={styles.nickname}>{nickname}</div>
            <div className={styles.gender}>{gender}</div>
          </div>
          <button className={styles.edit_button}>Edit Profile</button>
        </div>
      )}
    </>
  );
};

export default UserInfo;
