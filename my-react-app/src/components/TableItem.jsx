import Col from "react-bootstrap/Col";

function TableItem({item}) {
  return (
    <>
      <Col className="text-center">{item.price}</Col>
    </>
  );
}

export default TableItem;
