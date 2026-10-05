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
  GetRewardsData,
  GetPunishmentsData,
  AreThereAvailableOptions,
} from "../helpers/GameDataManipulation";
import VerticalProgressBar from "./VerticalProgressBar";

export function GameManagementContainer() {
  const [selectedOptions, setSelectedOptions] = useState(
    LoadSelectedOptions(false),
  );
  const [selectedPunishments, setSelectedPunishments] = useState(
    LoadSelectedOptions(true),
  );
  const [activeModalItem, setActiveModalItem] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [tableItems] = useState(() => GetTableItems());
  const [rewardsData] = useState(() => GetRewardsData());
  const [punishmentsData] = useState(() => GetPunishmentsData());

  const totalScore = CalculateTotalScore(tableItems);
  const [earnedScore, setEarnedScore] = useState(0);

  const [isRewardScreen, setIsRewardScreen] = useState(false);
  const [noAvailableOptions, setNoAvailableOptions] = useState(
    () => !AreThereAvailableOptions(tableItems, selectedOptions),
  );

  useEffect(() => {
    setEarnedScore(CalculateEarnedScore(tableItems, selectedOptions));

    SaveSelectedOptions(selectedOptions, false);

    setNoAvailableOptions(
      !AreThereAvailableOptions(tableItems, selectedOptions),
    );
  }, [selectedOptions]);

  useEffect(() => {
    setEarnedScore(
      CalculateEarnedScore(
        tableItems,
        selectedOptions,
        punishmentsData,
        selectedPunishments,
      ),
    );
    SaveSelectedOptions(selectedPunishments, true);
  }, [selectedPunishments]);

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
        noAvailableOptions ? setSelectedPunishments : setSelectedOptions,
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

  const handleOnRewardClick = (index) => {
    setIsRewardScreen(true);
    handleTileClick(rewardsData[index], 2, 999);
  };

  const getSelectedCardOption = () => {
    const selectFrom = noAvailableOptions
      ? selectedPunishments
      : selectedOptions;
    return selectFrom.find(
      (item) =>
        item.catId == activeModalItem?.categoryId &&
        item.itemId == activeModalItem?.itemId,
    );
  };

  return (
    <>
      <Card
        activeModalItem={activeModalItem}
        selectedOption={getSelectedCardOption()}
        show={showModal}
        handleOptionSelected={handleOptionSelected}
        onClose={() => setShowModal(false)}
        notEditable={!noAvailableOptions}
      ></Card>
      <div className="game-layout">
        <div className="grid-section">
          <GameTable
            tableItems={noAvailableOptions ? punishmentsData : tableItems}
            handleTileClick={handleTileClick}
            selectedOptions={
              noAvailableOptions ? selectedPunishments : selectedOptions
            }
          ></GameTable>
        </div>
        <div className="sidebar-section">
          <VerticalProgressBar
            milestones={rewardsData}
            currentScore={earnedScore}
            maxScore={totalScore}
            onRewardClick={handleOnRewardClick}
          />
        </div>
      </div>
    </>
  );
}
