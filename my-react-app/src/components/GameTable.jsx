import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableItem from "./TableItem";
import { useState } from "react";
import Card from "./Card";

function GameTable({ tableItems, handleOptionSelected }) {
  const [showModal, setShowModal] = useState(false);
  const [activeModalItem, setActiveModalItem] = useState(null);

  const handleTileClick = (item, catIndex, itemIndex) => {
    setActiveModalItem({ item: item, categoryId: catIndex, itemId: itemIndex });
    setShowModal(true);
  };

  return (
    <>
      <Card
        activeModalItem={activeModalItem}
        show={showModal}
        handleOptionSelected={handleOptionSelected}
        onClose={() => setShowModal(false)}
      ></Card>
      <Container className="game-board justify-content-center align-items-center px-4">
        <Row className="w-100 g-1 mb-1">
          {tableItems.map((catItem, i) => (
            <Col
              key={`game-table-${catItem}-${i}`}
              className={`card-column-${i}`}
            >
              <div className="category-header">{catItem.categoryName}</div>
            </Col>
          ))}
        </Row>
        {getCorrectCols(tableItems)}
      </Container>
    </>
  );

  function getCorrectCols(tableItems) {
    const rowCount = tableItems[0].items.length;
    const colCount = tableItems.length;

    const renderedElements = [];
    for (let i = 0; i < rowCount; i++) {
      const overlayOpacity = Math.max(0, 0.5 - i * 0.125);
      const isLastRow = i === rowCount - 1;
      const listElements = [];

      for (let j = 0; j < colCount; j++) {
        listElements.push(
          <TableItem
            key={`game-table-items-list-${tableItems[j].categoryName}-${i}`}
            item={tableItems[j].items[i]}
            index={j}
            overlayOpacity={overlayOpacity}
            onClick={(item) => handleTileClick(item, j, i)}
          ></TableItem>,
        );
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
