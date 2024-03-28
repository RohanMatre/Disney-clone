import React, { useRef, useEffect } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import 'videojs-youtube';

const VideoPlayer = ({ videoUrl }) => {
  const videoRef = useRef(null);
  
  useEffect(() => {
    const player = videojs(videoRef.current, {
      techOrder: ["youtube"],
      sources: [{
        src: videoUrl,
        type: 'video/youtube' 
      }],
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [videoUrl]);

  return (
    <div data-vjs-player>
      <video ref={videoRef} className="video-js vjs-youtube" />
    </div>
  );
};

export default VideoPlayer;
