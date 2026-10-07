import VideoPlayer from "./VideoPlayer";

function CardMediaContainer({
  videoLink,
  imageLink,
  imageLink2,
  showVideoCountdown,
  onVideoReady,
}) {
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
      {(imageLink || imageLink2) && (
        <div className="image-links-container text-center">
          {imageLink && (
            <div style={{ padding: "20px", margin: "0 auto" }}>
              <img
                style={{ maxHeight: "650px", maxWidth: "800px" }}
                src={`/photo/${imageLink}`}
              />
            </div>
          )}
          {imageLink2 && (
            <div style={{ padding: "20px", margin: "0 auto" }}>
              <img
                style={{ maxHeight: "650px", maxWidth: "800px" }}
                src={`/photo/${imageLink2}`}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CardMediaContainer;
