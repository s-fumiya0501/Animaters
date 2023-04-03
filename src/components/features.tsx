import React from "react";
import style from "../styles/FeatureContent.module.css";
import Image from "next/image";
const FeatureContent = () => {
  return (
    <section className={style.features}>
      <h2>Bookersの特徴</h2>
      <div className={style.feature_container}>
        <div className={style.feature}>
          <Image
            src="/images/featuer1.jpg"
            alt="特徴1"
            width={500}
            height={500}
          />
          <h3>特徴1のタイトル</h3>
          <p>
            特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文
          </p>
        </div>
        <div className={style.feature}>
          <Image
            src="/images/feature2.jpg"
            alt="特徴2"
            width={500}
            height={500}
          />
          <h3>特徴2のタイトル</h3>
          <p>
            特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文
          </p>
        </div>
        <div className={style.feature}>
          <Image
            src="/images/feature3.jpg"
            alt="特徴3"
            width={500}
            height={500}
          />
          <h3>特徴3のタイトル</h3>
          <p>
            特徴3の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文特徴1の説明文
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureContent;
