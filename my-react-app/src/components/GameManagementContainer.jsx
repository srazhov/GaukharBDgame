import "../styles/GameContainer.css";

import { useEffect, useState } from "react";
import GameTable from "./GameTable";
import Card from "./Card";
import {
  GetTableItems,
  UpdateSelectedOption,
  CalculateTotalScore,
} from "../helpers/GameDataManipulation";
import VerticalProgressBar from "./VerticalProgressBar";

export function GameManagementContainer() {
  const [tableItems, setTableItems] = useState(GetTableItems());
  useEffect(() => {
    const total = CalculateTotalScore(tableItems);
  }, [tableItems]);

  const [showModal, setShowModal] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState(null);

  const handleTileClick = (item, catIndex, itemIndex) => {
    setActiveModalItem({ item: item, categoryId: catIndex, itemId: itemIndex });
    setShowModal(true);
  };

  const handleOptionSelected = (categoryIndex, itemIndex, selectedOption) => {
    UpdateSelectedOption(
      setTableItems,
      categoryIndex,
      itemIndex,
      selectedOption,
    );
  };

  return (
    <>
      <Card
        activeModalItem={activeModalItem}
        show={showModal}
        handleOptionSelected={handleOptionSelected}
        onClose={() => setShowModal(false)}
      ></Card>
      <div className="game-layout">
        <div className="grid-section">
          <GameTable
            tableItems={tableItems}
            handleOptionSelected={handleOptionSelected}
            handleTileClick={handleTileClick}
          ></GameTable>
        </div>
        <div className="sidebar-section">
          <VerticalProgressBar />
        </div>
      </div>
    </>
  );
}
