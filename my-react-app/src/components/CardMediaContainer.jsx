import VideoPlayer from "./VideoPlayer";

function CardMediaContainer({videoLink, imageLink, showVideoCountdown, onVideoReady}) {
  return (
    <>
      {videoLink && (
        <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
          <VideoPlayer
            showCountdown={showVideoCountdown}
            videoPath={videoLink}
            onVideoReady={onVideoReady}
          />
        </div>
      )}
      {imageLink && (
        <div style={{ padding: "20px", margin: "0 auto" }}>
          <img
            style={{ maxHeight: "650px" }}
            src={`/photo/${imageLink}`}
          />
        </div>
      )}
    </>
  );
}

export default CardMediaContainer;
