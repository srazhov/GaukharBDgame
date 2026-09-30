import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import TableItem from "./TableItem";

function GameTable({ tableItems }) {
  return (
    <>
      <Container className="center">
        <Row className="w-100 text-center">
          {tableItems.map((catItem, i) => (
            <Col key={`game-table-${catItem}-${i}`} className="text-center">
              {catItem.categoryName}
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
        const listElements = [];
        for (let j = 0; j < colCount; j++) {
            listElements.push(<TableItem key={`game-table-items-list-${tableItems[j].categoryName}-${i}`} 
                item={tableItems[j].items[i]}></TableItem>);
        }

        renderedElements.push(<Row md="w-100 text-center" key={`game-table-items-${i}`}>{listElements}</Row>);
    }

    return renderedElements;
  }
}

export default GameTable;
