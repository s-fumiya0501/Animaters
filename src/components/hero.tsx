import React from "react";
import style from "../styles/HeroContent.module.css"
const HeroContent = () =>{
  return(
    <section className={style.hero}>
    <div className={style.herocontent}>
      <h1>最高の本の投稿を体験しよう</h1>
      <p>Bookersは、ほんのWebサイトです。</p>
      <a href="#" className={style.herobtn}>さっそくBookersを試してみる</a>
    </div>
  </section>
  )
}

export default HeroContent