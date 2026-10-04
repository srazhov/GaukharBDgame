import React, { useState, useEffect } from "react";
import "../styles/Countdown.css";

const Countdown = ({ onComplete, startFrom }) => {
  const [count, setCount] = useState(startFrom);
  const [toShow, setToShow] = useState(true);

  useEffect(() => {
    if (count > 0) {
      const timer = setTimeout(() => {
        setCount((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0 && onComplete) {
      onComplete();
      setToShow(false);
    }
  }, [count, onComplete]);

  return (
    <>
      {toShow && (
        <div className="countdown-wrapper">
          <div className="countdown-container">
            <div className="countdown-number" key={count}>
              {count}
            </div>
            <div className="countdown-indicator"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Countdown;
