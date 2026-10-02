import { useEffect, useState } from "react";
import GameTable from "./GameTable";
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
      <GameTable
        tableItems={tableItems}
        handleOptionSelected={handleOptionSelected}
      ></GameTable>
    </>
  );
}
