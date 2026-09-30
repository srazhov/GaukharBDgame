import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./CardColumn.css";
import Button from "react-bootstrap/Button";
import GameTable from "./components/GameTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [tableItems, setTableItems] = useState([
    {
      categoryName: "History And Geography",
      items: [
        { price: 100 },
        { price: 200 },
        { price: 300 },
        { price: 400 },
        { price: 500 },
      ],
    },
    {
      categoryName: "Science and Nature",
      items: [
        { price: 100 },
        { price: 200 },
        { price: 300 },
        { price: 400 },
        { price: 500 },
      ],
    },
        {
      categoryName: "Pop Culture",
      items: [
        { price: 100 },
        { price: 200 },
        { price: 300 },
        { price: 400 },
        { price: 500 },
      ],
    },
        {
      categoryName: "Nastya",
      items: [
        { price: 100 },
        { price: 200 },
        { price: 300 },
        { price: 400 },
        { price: 500 },
      ],
    },
        {
      categoryName: "Test",
      items: [
        { price: 100 },
        { price: 200 },
        { price: 300 },
        { price: 400 },
        { price: 500 },
      ],
    },
  ]);

  return (
    <>
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center">
        <h1 className="mb-4 text-white fw-bold tracking-wide">Gaukhar's Special Party!</h1>
        {isGameStarted ? (
          <GameTable tableItems={tableItems}></GameTable>
        ) : (
          <Button onClick={() => setIsGameStarted(true)}>Start game</Button>
        )}
      </div>
    </>
  );
}

export default App;
