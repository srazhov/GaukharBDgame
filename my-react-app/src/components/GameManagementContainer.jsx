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
  const [rewardOptionSelected, setRewardOptionSelected] = useState(false);
  const [noAvailableOptions, setNoAvailableOptions] = useState(false);

  useEffect(() => {
    setEarnedScore(CalculateEarnedScore(tableItems, selectedOptions));

    SaveSelectedOptions(selectedOptions, false);
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

  useEffect(() => {
    if (!showModal) {
      setIsRewardScreen(false);
      setRewardOptionSelected(false);
    }
  }, [showModal]);

  const handleTileClick = (item, catIndex, itemIndex) => {
    setActiveModalItem({ item: item, categoryId: catIndex, itemId: itemIndex });
    setShowModal(true);
    setRewardOptionSelected(false);
  };

  const handleOptionSelected = (categoryIndex, itemIndex, selectedOption) => {
    if (isRewardScreen) {
      if (rewardsData[itemIndex - 999]?.secondPart && !rewardOptionSelected) {
        setRewardOptionSelected(true);
      } else {
        setShowModal(false);
      }
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
    handleTileClick(rewardsData[index], 2, 999 + index);
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
        rewardOptionSelected={rewardOptionSelected}
        selectedOption={getSelectedCardOption()}
        isRewardScreen={isRewardScreen}
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
          {!AreThereAvailableOptions(tableItems, selectedOptions) &&
            !noAvailableOptions && (
              <div className="no-available-options text-center mt-3">
                <button
                  type="button"
                  className="btn btn-danger p-3 w-100"
                  onClick={() => setNoAvailableOptions(true)}
                >
                  Go to the punishments section
                </button>
              </div>
            )}
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
