import React, { useState } from 'react';
import { auth } from "../config/firebase";
import styles from '../styles/Login.module.css';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth,email, password);
      console.log("success!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.title}>ログイン</h2>
        <label className={styles.label} htmlFor="email">メールアドレス</label>
        <input className={styles.input} type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label className={styles.label} htmlFor="password">パスワード</label>
        <input className={styles.input} type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className={styles.button} type="submit">ログイン</button>
      </form>
    </div>
  );
};

export default Login;