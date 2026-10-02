import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import "./CardColumn.css";
import "./TableButtonHover.css";
import './CardModal.css';
import Button from "react-bootstrap/Button";
import GameTable from "./components/GameTable";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [tableItems, setTableItems] = useState([
    {
      categoryName: "History And Geography",
      items: [
        { price: 100, question: "test 100", answer: 1, options: ['a', 'b','c'] },
        { price: 200, question: "test 200", answer: 2, options: ['a', 'b','c'] },
        { price: 300, question: "test 300", answer: 3, options: ['a', 'b','c'] },
        { price: 400, question: "test 400", answer: 1, options: ['a', 'b','c'] },
        { price: 500, question: "test 500", answer: 2, options: ['a', 'b','c'] },
      ],
    },
    {
      categoryName: "Science and Nature",
      items: [
        { price: 100, question: "test 100", answer: 1, options: ['a', 'b','c'] },
        { price: 200, question: "test 200", answer: 1, options: ['a', 'b','c'] },
        { price: 300, question: "test 300", answer: 1, options: ['a', 'b','c'] },
        { price: 400, question: "test 400", answer: 1, options: ['a', 'b','c'] },
        { price: 500, question: "test 500", answer: 1, options: ['a', 'b','c'] },
      ],
    },
    {
      categoryName: "Pop Culture",
      items: [
        { price: 100, question: "test 100", answer: 1, options: ['a', 'b','c'] },
        { price: 200, question: "test 200", answer: 1, options: ['a', 'b','c'] },
        { price: 300, question: "test 300", answer: 1, options: ['a', 'b','c'] },
        { price: 400, question: "test 400", answer: 1, options: ['a', 'b','c'] },
        { price: 500, question: "test 500", answer: 1, options: ['a', 'b','c'] },
      ],
    },
    {
      categoryName: "Nastya",
      items: [
        { price: 100, question: "test 100", answer: 1, options: ['a', 'b','c'] },
        { price: 200, question: "test 200", answer: 1, options: ['a', 'b','c'] },
        { price: 300, question: "test 300", answer: 1, options: ['a', 'b','c'] },
        { price: 400, question: "test 400", answer: 1, options: ['a', 'b','c'] },
        { price: 500, question: "test 500", answer: 1, options: ['a', 'b','c'] },
      ],
    },
    {
      categoryName: "Test",
      items: [
        { price: 100, question: "test 100", answer: 1, options: ['a', 'b','c'] },
        { price: 200, question: "test 200", answer: 1, options: ['a', 'b','c'] },
        { price: 300, question: "test 300", answer: 1, options: ['a', 'b','c'] },
        { price: 400, question: "test 400", answer: 1, options: ['a', 'b','c'] },
        { price: 500, question: "test 500", answer: 1, options: ['a', 'b','c'] },
      ],
    },
  ]);

  return (
    <>
      <div className="vh-100 justify-content-center align-items-center">
        <h1 className="mb-4 text-white fw-bold tracking-wide">
          Gaukhar's Special Party!
        </h1>
        {isGameStarted ? (
          <div>
            <GameTable tableItems={tableItems}></GameTable>
          </div>
        ) : (
          <Button onClick={() => setIsGameStarted(true)}>Start game</Button>
        )}
      </div>
    </>
  );
}

export default App;
