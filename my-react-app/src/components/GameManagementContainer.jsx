import "../styles/GameContainer.css";

import { useEffect, useState } from "react";
import GameTable from "./GameTable";
import Card from "./Card";
import {
  GetTableItems,
  UpdateSelectedOption,
  CalculateEarnedScore,
  CalculateTotalScore,
  LoadSelectedOptions,
  SaveSelectedOptions,
} from "../helpers/GameDataManipulation";
import VerticalProgressBar from "./VerticalProgressBar";

export function GameManagementContainer() {
  const [selectedOptions, setSelectedOptions] = useState(LoadSelectedOptions());
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [tableItems] = useState(GetTableItems());
  const [totalScore] = useState(CalculateTotalScore(tableItems));
  const [earnedScore, setEarnedScore] = useState(0);
  const [isRewardScreen, setIsRewardScreen] = useState(false);

  useEffect(() => {
    setEarnedScore(CalculateEarnedScore(tableItems, selectedOptions));
    SaveSelectedOptions(selectedOptions);
  }, [selectedOptions]);

  const handleTileClick = (item, catIndex, itemIndex) => {
    setActiveModalItem({ item: item, categoryId: catIndex, itemId: itemIndex });
    setShowModal(true);
  };

  const handleOptionSelected = (categoryIndex, itemIndex, selectedOption) => {
    if (isRewardScreen) {
      setIsRewardScreen(false);
      setShowModal(false);
    } else {
      UpdateSelectedOption(
        setSelectedOptions,
        categoryIndex,
        itemIndex,
        selectedOption,
      );

      setActiveModalItem((prev) => ({
        ...prev,
        item: {
          ...prev.item,
          selectedOption: selectedOption,
        },
      }));
    }
  };

  const handleOnRewardClick = () => {
    const rewardScreenItem = {
      question: "Congratulations!",
      answer: 1,
      options: ["Забрать подарок"],
      imageLink: "phone1.jpg",
    };

    setIsRewardScreen(true);
    handleTileClick(rewardScreenItem, 2, 999);
  };

  return (
    <>
      <Card
        activeModalItem={activeModalItem}
        selectedOption={selectedOptions.find(
          (item) =>
            item.catId == activeModalItem?.categoryId &&
            item.itemId == activeModalItem?.itemId,
        )}
        show={showModal}
        handleOptionSelected={handleOptionSelected}
        onClose={() => setShowModal(false)}
        notEditable={true}
      ></Card>
      <div className="game-layout">
        <div className="grid-section">
          <GameTable
            tableItems={tableItems}
            handleOptionSelected={handleOptionSelected}
            handleTileClick={handleTileClick}
            selectedOptions={selectedOptions}
          ></GameTable>
        </div>
        <div className="sidebar-section">
          <VerticalProgressBar
            currentScore={earnedScore}
            maxScore={totalScore}
            onRewardClick={handleOnRewardClick}
          />
        </div>
      </div>
    </>
  );
}
