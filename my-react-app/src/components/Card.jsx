import Modal from "react-bootstrap/Modal";

function Card({ activeModalItem, show, onClose, handleOptionSelected }) {
  const handleOptionClick = (selectedOption) => {
    handleOptionSelected(
      activeModalItem.categoryId,
      activeModalItem.itemId,
      selectedOption,
    );
    onClose();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        centered
        dialogClassName="jeopardy-modal"
      >
        <Modal.Body className="jeopardy-modal-body">
          <h2 className="jeopardy-question">
            {activeModalItem?.item.question}
          </h2>
          <div className="jeopardy-answers">
            {activeModalItem?.item.options.map((text, index) => (
              <button
                key={`jeopardy-btn-key-${index}`}
                className="jeopardy-answer-btn"
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
