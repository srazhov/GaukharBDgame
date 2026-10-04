import Modal from "react-bootstrap/Modal";
import VideoPlayer from "./VideoPlayer";

function Card({
  activeModalItem,
  selectedOption,
  show,
  onClose,
  handleOptionSelected,
  notEditable,
}) {
  const handleOptionClick = (newSelectedOption) => {
    if (notEditable && selectedOption) {
      return;
    }

    handleOptionSelected(
      activeModalItem.categoryId,
      activeModalItem.itemId,
      newSelectedOption,
    );
  };

  const getBtnStatus = (btnIndex) => {
    if (selectedOption)
      if (btnIndex + 1 == selectedOption.option) {
        return selectedOption.option == activeModalItem.item.answer
          ? "jeopardy-answer-btn-correct"
          : "jeopardy-answer-btn-incorrect";
      } else if (btnIndex + 1 == activeModalItem.item.answer) {
        return "jeopardy-answer-btn-outlined";
      }

    return "";
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        centered
        dialogClassName={`jeopardy-modal card-jeopardy-${activeModalItem?.categoryId}-color`}
      >
        <Modal.Body className="jeopardy-modal-body">
          <h2 className="jeopardy-question">
            {activeModalItem?.item.question}
          </h2>
          {activeModalItem?.item.videoLink && (
            <div
              style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}
            >
              <VideoPlayer
                showCountdown={!selectedOption}
                videoPath={activeModalItem.item.videoLink}
              />
            </div>
          )}
          {activeModalItem?.item.imageLink && (
            <div style={{ padding: "20px", margin: "0 auto" }}>
              <img
                style={{ maxHeight: "650px" }}
                src={`/photo/${activeModalItem.item.imageLink}`}
              />
            </div>
          )}
          <div className="jeopardy-answers">
            {activeModalItem?.item.options.map((text, index) => (
              <button
                key={`jeopardy-btn-key-${index}`}
                className={`jeopardy-answer-btn ${getBtnStatus(index)}`}
                onClick={() => handleOptionClick(index + 1)}
                disabled={notEditable && selectedOption}
              >
                {text}
              </button>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Card;
