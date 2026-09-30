import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableItem from "./TableItem";

function GameTable({ tableItems }) {
  return (
    <>
      <Container className="game-board vh-100 d-flex flex-column justify-content-center align-items-center px-4">
        <Row className="w-100 g-1 mb-1" >
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

    let currRowId = 0,
      currColId = 0;
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
