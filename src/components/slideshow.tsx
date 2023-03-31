import React, { useState, useEffect } from "react";


const images = [
  { src: "https://www.pakutaso.com/shared/img/thumb/shikun20220402_114719-2_TP_V.jpg", caption: "Caption Text 1" },
  { src: "https://www.pakutaso.com/shared/img/thumb/shikun20220402_122123_TP_V.jpg", caption: "Caption Text 2" },
  { src: "https://www.pakutaso.com/shared/img/thumb/sikun_20220402-180657-2_TP_V.jpg", caption: "Caption Text 3" },
];

const Slideshow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="slideshow-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`mySlides fade ${
            index === currentImageIndex ? "active" : ""
          }`}
        >
          <img src={image.src} alt="" />
          <div className="text">{image.caption}</div>
        </div>
      ))}
    </div>
  );
};

export default Slideshow;