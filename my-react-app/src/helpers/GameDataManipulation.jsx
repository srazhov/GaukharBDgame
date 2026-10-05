import tableData from "../assets/data.json";
import rewardsData from "../assets/rewardsData.json";
import punishmentsData from "../assets/punishmentsData.json";

export function GetTableItems() {
  return tableData;
}

export function GetRewardsData() {
  return rewardsData;
}

export function GetPunishmentsData() {
  return punishmentsData;
}

export function AreThereAvailableOptions(tableItems, selectedOptions) {
  return (
    tableItems.reduce((count, curr) => (count += curr.items.length), 0) !==
    selectedOptions.length
  );
}

export function UpdateSelectedOption(
  setSelectedOptions,
  categoryIndex,
  itemIndex,
  newOption,
) {
  setSelectedOptions((prevOptions) => {
    const existingIndex = prevOptions.findIndex(
      (item) => item.catId === categoryIndex && item.itemId === itemIndex,
    );

    if (existingIndex !== -1) {
      const newOptions = [...prevOptions];
      newOptions[existingIndex] = {
        ...newOptions[existingIndex],
        option: newOption,
      };
      return newOptions;
    }

    return [
      ...prevOptions,
      { catId: categoryIndex, itemId: itemIndex, option: newOption },
    ];
  });
}

export function CalculateEarnedScore(tableItems, selectedOptions, punishments, selectedPunishments) {
  let total = 0;
  selectedOptions.forEach((sel) => {
    if (tableItems[sel.catId].items[sel.itemId].answer == sel.option) {
      total += tableItems[sel.catId].items[sel.itemId].price;
    }
  });

  if (selectedPunishments) {
    selectedPunishments.forEach((sel) => {
      if (punishments[sel.catId].items[sel.itemId].answer == sel.option) {
        total += punishments[sel.catId].items[sel.itemId].price;
      }
    })
  }

  return total;
}

export function CalculateTotalScore(tableItems) {
  let total = 0;
  tableItems.forEach((cat) => {
    cat.items.forEach((item) => {
      total += item.price;
    });
  });

  return total;
}

export function SaveSelectedOptions(selectedOptions, isPunishments) {
  const key = isPunishments ? "selected_options_2" : "selected_options_1";
  localStorage.setItem(key, JSON.stringify(selectedOptions));
}

export function LoadSelectedOptions(isPunishments) {
  const key = isPunishments ? "selected_options_2" : "selected_options_1";
  const savedString = localStorage.getItem(key);
  if (savedString) {
    const savedSelectedOptions = JSON.parse(savedString);
    return savedSelectedOptions;
  }

  return [];
}
