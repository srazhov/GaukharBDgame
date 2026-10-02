import Modal from "react-bootstrap/Modal";

function Card({ item, show, onClose, onSuccess, onFailure }) {
  const handleOptionClick = (selectedOption) => {
    if (selectedOption == item.answer) {
      alert("correct");
    } else {
      alert(`incorrect. Answer is: ${item.answer}`);
    }
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
          <h2 className="jeopardy-question">{item?.question}</h2>
          <div className="jeopardy-answers">
            <button
              className="jeopardy-answer-btn"
              onClick={() => handleOptionClick(1)}
            >
              {item?.options[0]}
            </button>
            <button
              className="jeopardy-answer-btn"
              onClick={() => handleOptionClick(2)}
            >
              {item?.options[1]}
            </button>
            <button
              className="jeopardy-answer-btn"
              onClick={() => handleOptionClick(3)}
            >
              {item?.options[2]}
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Card;
