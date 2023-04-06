import { useState } from "react";
import { auth } from "../config/firebase";

import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo
} from "firebase/auth";
import Router from "next/router";
import styles from "../styles/RegistrationForm.module.css";
import Image from "next/image";
import { provider } from "../config/firebase";
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hovered, setHovered] = useState(false);
  const handleGoogleLogin = async () => {
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // The signed-in user info.
          const additionalUserInfo = getAdditionalUserInfo(result);
          if(additionalUserInfo?.isNewUser){
            Router.push("/users/accountsetting");
          }else{
            Router.push("/users/mypage");
          }
          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };
  const googleLogo = hovered
    ? "/images/btn_google_signin_light_focus_web.png"
    : "/images/btn_google_signin_light_normal_web.png";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("新規登録成功");
      Router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.containers}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>新規登録</h2>
        <div className={styles.inputSection}>
          <label htmlFor="email" className={styles.label}>
            メールアドレス
          </label>
          <input
            type="email"
            id="email"
            className={styles.input}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className={styles.inputSection}>
          <label htmlFor="password" className={styles.label}>
            パスワード
          </label>
          <input
            type="password"
            id="password"
            className={styles.input}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <div className={styles.buttonSection}>
          <button type="submit" className={styles.button}>
            登録
          </button>
          <button className={styles.linkButton}>
            パスワードを忘れた方はこちら
          </button>
          <button className={styles.linkButton}>
            すでにアカウントをお持ちの方
          </button>
        </div>
        <div className={styles.googleSection}>
          <p className={styles.googleText}>Googleで登録する</p>
          <button
            onClick={handleGoogleLogin}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Image
              src={googleLogo}
              alt="signin"
              width={200}
              height={200}
              className="googleIcon"
            />
          </button>
        </div>
      </form>
    </div>
  );
}
