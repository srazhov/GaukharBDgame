import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableItem from "./TableItem";

function GameTable({ tableItems, selectedOptions, handleTileClick }) {
  return (
    <>
      <Container className="game-board justify-content-center align-items-center px-4">
        <Row className="w-100 g-1 mb-1">
          {tableItems.map((catItem, i) => (
            <Col
              key={`game-table-${catItem}-${i}`}
              className={`card-column-${i}`}
            >
              <div className={`category-header card-column-${i}-color`}>
                {catItem.categoryName}
              </div>
            </Col>
          ))}
        </Row>
        {getCorrectCols()}
      </Container>
    </>
  );

  function getCorrectCols() {
    if (!tableItems || tableItems.length === 0) {
      return [];
    }

    const colCount = tableItems.length;
    const rowCount = Math.max(
      ...tableItems.map((col) => col.items?.length || 0),
    );

    const renderedElements = [];

    for (let i = 0; i < rowCount; i++) {
      const overlayOpacity = Math.max(0, 0.5 - i * (0.5 / (rowCount - 1 || 1)));
      const isLastRow = i === rowCount - 1;
      const listElements = [];

      for (let j = 0; j < colCount; j++) {
        const currentCategory = tableItems[j];
        const currentItem = currentCategory.items?.[i];

        if (currentItem) {
          listElements.push(
            <TableItem
              key={`game-table-items-list-${currentCategory.categoryName}-${i}`}
              item={currentItem}
              index={j}
              overlayOpacity={overlayOpacity}
              onClick={(item) => handleTileClick(item, j, i)}
              selectedItem={selectedOptions.find(
                (opt) => opt.catId == j && opt.itemId == i,
              )}
            />,
          );
        } else {
          listElements.push(
            <div
              key={`game-table-empty-${j}-${i}`}
              className="empty-table-item col"
            />,
          );
        }
      }

      renderedElements.push(
        <Row
          className={`w-100 g-1 mb-1 ${isLastRow ? "row-last" : ""}`}
          key={`game-table-items-${i}`}
        >
          {listElements}
        </Row>,
      );
    }

    return renderedElements;
  }
}

export default GameTable;
