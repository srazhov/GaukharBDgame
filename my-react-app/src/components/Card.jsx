import Modal from "react-bootstrap/Modal";
import VideoPlayer from "./VideoPlayer";

function Card({ activeModalItem, show, onClose, handleOptionSelected }) {
  const handleOptionClick = (selectedOption) => {
    handleOptionSelected(
      activeModalItem.categoryId,
      activeModalItem.itemId,
      selectedOption,
    );
    onClose();
  };

  const getBtnStatus = (btnIndex) => {
    if (
      activeModalItem?.item.selectedOption != null &&
      btnIndex + 1 == activeModalItem.item.selectedOption
    ) {
      return activeModalItem.item.selectedOption == activeModalItem.item.answer
        ? "jeopardy-answer-btn-correct"
        : "jeopardy-answer-btn-incorrect";
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
              <VideoPlayer videoPath={activeModalItem.item.videoLink} />
            </div>
          )}
          <div className="jeopardy-answers">
            {activeModalItem?.item.options.map((text, index) => (
              <button
                key={`jeopardy-btn-key-${index}`}
                className={`jeopardy-answer-btn ${getBtnStatus(index)}`}
                onClick={() => handleOptionClick(index + 1)}
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
