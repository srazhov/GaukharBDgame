import tableData from "../assets/data.json";

export function GetTableItems() {
  return tableData;
}

export function UpdateSelectedOption(
  setTableItems,
  categoryIndex,
  itemIndex,
  selectedOption,
) {
  setTableItems((prevItems) =>
    prevItems.map((category, cIndex) => {
      if (cIndex !== categoryIndex) return category;

      return {
        ...category,
        items: category.items.map((item, iIndex) => {
          if (iIndex !== itemIndex) return item;

          return {
            ...item,
            selectedOption: selectedOption,
          };
        }),
      };
    }),
  );
}

export function CalculateTotalScore(tableItems) {
  let total = 0;
  tableItems.forEach((cat) => {
    cat.items.forEach((item) => {
      if (item.selectedOption != null && item.selectedOption == item.answer) {
        total += item.price;
      }
    });
  });

  return total;
}
