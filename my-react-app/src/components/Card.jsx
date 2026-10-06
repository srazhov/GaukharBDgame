import Modal from "react-bootstrap/Modal";
import CardMediaContainer from "./CardMediaContainer";
import { useEffect, useState } from "react";

function Card({
  activeModalItem,
  selectedOption,
  isRewardScreen,
  rewardOptionSelected,
  show,
  onClose,
  handleOptionSelected,
  notEditable,
}) {
  const [firstPartReady, setFirstPartReady] = useState(false);
  const [secondPartReady, setSecondPartReady] = useState(false);

  useEffect(() => {
    if (!activeModalItem?.item.videoLink) {
      setFirstPartReady(true);
    } else {
      setFirstPartReady(false);
    }

    if (activeModalItem?.item.secondPart?.videoLink) {
      setSecondPartReady(false);
    } else {
      setSecondPartReady(true);
    }
  }, [activeModalItem]);

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
          {(!activeModalItem?.item.secondPart || !selectedOption) &&
            (!isRewardScreen || !rewardOptionSelected) && (
              <>
                <CardMediaContainer
                  showVideoCountdown={!selectedOption}
                  activeModalItem={activeModalItem}
                  videoLink={activeModalItem?.item.videoLink}
                  imageLink={activeModalItem?.item.imageLink}
                  onVideoReady={() => setFirstPartReady(true)}
                />
                {firstPartReady && (
                  <div className="jeopardy-answers">
                    {activeModalItem?.item.options.map((text, index) => (
                      <button
                        key={`jeopardy-btn-key-${index}`}
                        className={`jeopardy-answer-btn ${getBtnStatus(index)}`}
                        onClick={() => handleOptionClick(index + 1)}
                        disabled={!!(notEditable && selectedOption)}
                      >
                        {text}
                      </button>
                    ))}
                  </div>
                )}
              </>
            )}
          {(selectedOption && activeModalItem?.item.secondPart) ||
            (rewardOptionSelected && (
              <div className="jeopardy-second-part d-flex flex-column justify-content-center">
                <CardMediaContainer
                  showVideoCountdown={true}
                  videoLink={activeModalItem.item.secondPart.videoLink}
                  imageLink={activeModalItem.item.secondPart.imageLink}
                  onVideoReady={() => setSecondPartReady(true)}
                />
                {activeModalItem.item.secondPart.text && secondPartReady && (
                  <div className="text-center display-2 fw-bold pulsating-colorful-text p-3">
                    {activeModalItem.item.secondPart.text}
                  </div>
                )}
              </div>
            ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Card;
