import { ChangeEvent, useCallback, useState } from "react";
import { getStorage, ref, uploadBytes,getDownloadURL } from "firebase/storage";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
import styles from "../../styles/AddAccount.module.css";
import Header from "@/components/header";
import Router from "next/router";
import Dropzone from "react-dropzone";
type Gender = "male" | "female" | "other";

const AddAccount = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [gender, setGender] = useState<Gender>("other");
  const [nameError, setNameError] = useState(false);
  const [nicknameError, setNicknameError] = useState(false);
  const [images, setimages] = useState<string>("");
  const [imageUrl,setImageUrl] = useState<string>("");
  const user = auth.currentUser;
  
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const User = await doc(db, "users", auth.currentUser!.uid);
    if (!name || !nickname) {
      setNameError(!name);
      setNicknameError(!nickname);
      return;
    }
    if (user) {
      try {
        await updateProfile(user, {
          displayName: name,
        });
        await await setDoc(User, {
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
  const uploadImage = async (event:ChangeEvent<HTMLInputElement>) => {
    const storage = getStorage();
    const files = event.target.files;
    if (files !== null) {
      const file = files[0]
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = () =>{
        const blob = new Blob([reader.result!], { type: "image" });
        const S = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const N =16;
        const fileName = Array.from(crypto.getRandomValues(new Uint32Array(N))).map((n)=>S[n%S.length]).join("");
        const filepath = "images/users/" + fileName;
        uploadBytes(ref(storage, filepath), file).then((snapshot) => {
          getDownloadURL(snapshot.ref).then((url) => {
            setImageUrl(url);
            console.log(imageUrl);
            console.log("File available at", url);
          });
          console.log("Uploaded a blob or file!");
        });
      }
    } 
    
  };
  
  return (
    <>
      <Header />
      <div className={styles.container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <label htmlFor="image" className={styles.label}>
              画像
            </label>
            <input
              type="file"
              name="image"
              onChange={(event) => uploadImage(event)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name" className={styles.label}>
              名前
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            {nameError && (
              <span className={styles.error}>名前を入力してください</span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="nickname" className={styles.label}>
              ニックネーム
            </label>
            <input
              type="text"
              id="nickname"
              value={nickname}
              onChange={(event) => setNickname(event.target.value)}
            />
            {nicknameError && (
              <span className={styles.error}>
                ニックネームを入力してください
              </span>
            )}
          </div>
          <div className={styles.inputGroup}>
            <label>性別</label>
            <div className={styles.radioGroup}>
              <label className={styles.label}>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                />
                男性
              </label>
              <label className={styles.label}>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                />
                女性
              </label>
              <label className={styles.label}>
                <input
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                  onChange={() => setGender("other")}
                />
                その他
              </label>
            </div>
          </div>
          <button type="submit">アカウント情報を追加する</button>
        </form>
      </div>
    </>
  );
};

export default AddAccount;
function async(arg0: Event | undefined) {
  throw new Error("Function not implemented.");
}

