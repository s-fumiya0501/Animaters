import React, { useState } from "react";
import { auth,db } from "../config/firebase";
import { doc,setDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
const ProfileForm = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [user] = useAuthState(auth);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const user = await doc(db,"users",auth.currentUser!.uid);

    try {
      await setDoc(user,{
        name: name,
        address: address,
      });
      console.log("Profile updated successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">名前</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="address">住所</label>
        <input
          type="text"
          id="address"
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      <button type="submit">更新</button>
    </form>
  );
};

export default ProfileForm;