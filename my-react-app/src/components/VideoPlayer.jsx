import { useRef, useState } from "react";
import Countdown from "./Countdown";

const VideoPlayer = ({ videoPath }) => {
  const [videoReady, setVideoReady] = useState(false);
  const fullPath = `/video/${videoPath}`;
  const videoRef = useRef(null);

  const handleCountdownCompleted = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.log("Autoplay was prevented by the browser:", error);
      });
    }

    setVideoReady(true);
  };

  return (
    <div className="video-container">
      <Countdown onComplete={handleCountdownCompleted} startFrom={3} />
      {videoReady && (
        <video ref={videoRef} width="640" height="360" controls>
          <source src={fullPath} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
};

export default VideoPlayer;
