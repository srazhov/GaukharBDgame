import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function TableItem({ item, index, overlayOpacity }) {
  return (
    <>
      <Col className={`card-column-${index} w-100 text-center`}>
        <Button
          className={`w-100 rounded-2 fw-bold shadow-sm`}
          style={{
            backgroundImage: `linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity}))`,
          }}
        >
          {item.price}
        </Button>
      </Col>
    </>
  );
}

export default TableItem;
