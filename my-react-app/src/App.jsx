import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./styles/App.css";
import "./styles/CardColumn.css";
import "./styles/CardModal.css";
import "./styles/TableButtonHover.css";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import { GameManagementContainer } from "./components/GameManagementContainer";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleTryAgain = () => {
    const userConfirmed = window.confirm("Are you sure?");
    
    if (userConfirmed) {
      localStorage.clear();
    }
  };

  return (
    <>
      <title>Lovely girls BD page!</title>
      <div className="vh-100 justify-content-center align-items-center p-4 d-grid">
        <div>
          <h1 className="text-white fw-bold mb-4 text-center">
            Gaukhar's Special Party!
          </h1>
          {isGameStarted ? (
            <GameManagementContainer />
          ) : (
            <div className="d-flex flex-column justify-content-center">
              <Button onClick={() => setIsGameStarted(true)}>Start game</Button>
              <Button
                type="button"
                variant="danger"
                className="mt-3"
                onClick={handleTryAgain}
              >
                Try again
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
