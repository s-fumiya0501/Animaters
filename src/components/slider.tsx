import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/splide/css'; // デフォルトのテーマを読み込んでいます（コアスタイルのみ読み込む設定も可能）
import Image from 'next/image'

export const Slider = () => {
  return (
    <div className="slider ">
      <Splide
        aria-label="私のお気に入りの画像集"
        options={{
          autoplay: true, // 自動再生を有効
          interval: 3000, // 自動再生の間隔を3秒に設定
        }}
      >
        <SplideSlide>
          <img className="slide-img" src="https://www.pakutaso.com/shared/img/thumb/shikun20220402_114719-2_TP_V.jpg" alt="かわいい猫の画像 part1" />
        </SplideSlide>
        <SplideSlide>
          <img className="slide-img" src="https://www.pakutaso.com/shared/img/thumb/shikun20220402_122123_TP_V.jpg" alt="かわいい猫の画像 part2" />
        </SplideSlide>
        <SplideSlide>
          <img className="slide-img" src="https://www.pakutaso.com/shared/img/thumb/sikun_20220402-180657-2_TP_V.jpg" alt="かわいい猫の画像 part3" />
        </SplideSlide>
      </Splide>

      {/* 画像の高さを揃えて表示させるために以下スタイルを適用 */}
      <style jsx>{`
        .slide-img {
          display: block;
          width: 100%;
          height: 50%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
};