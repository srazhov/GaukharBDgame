import tableData from "../assets/data.json";

export function GetTableItems() {
  return tableData;
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

export function CalculateEarnedScore(tableItems, selectedOptions) {
  let total = 0;
  selectedOptions.forEach((sel) => {
      if (tableItems[sel.catId].items[sel.itemId].answer == sel.option) {
        total += tableItems[sel.catId].items[sel.itemId].price;
      }
      });

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
