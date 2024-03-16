import React, { useEffect } from "react";
import { preLoaderAnim } from "../animations";
import "./preloader.css";

const PreLoader = () => {
  useEffect(() => {
    preLoaderAnim();

    const audio = new Audio("/audios/hotstar_audio.mp3");
    audio.play();

    // Cleanup function to pause audio after a delay
    return () => {
      setTimeout(() => {
        audio.pause();
      }, 1000); // Adjust the delay time as needed
    };
  }, []);

  return (
    <div className="preloader">
      <div className="texts-container">
        <img src="/images/logo.svg" alt="Loading animation" />
      </div>
    </div>
  );
};

export default PreLoader;
