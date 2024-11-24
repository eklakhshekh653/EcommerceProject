import React, { useState, useEffect } from "react";
import "../comp_css/Slider.css";
import { Link } from "react-router-dom";

const Slider = ({ images, interval }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, interval);

    return () => clearInterval(timer); 
  }, [images, interval]);



  return (
    <div className="slider-container">
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
          >
            <Link to={"/product"}>
            <img src={image}  className="slider-image" />
            </Link>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
