import { useEffect, useState } from "react";
import GameTable from "./GameTable";
import Card from "./Card";
import {
  GetTableItems,
  UpdateSelectedOption,
  CalculateTotalScore,
} from "../helpers/GameDataManipulation";

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
      <GameTable
        tableItems={tableItems}
        handleOptionSelected={handleOptionSelected}
        handleTileClick={handleTileClick}
      ></GameTable>
    </>
  );
}
