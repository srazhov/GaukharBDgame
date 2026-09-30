import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function TableItem({ item, index, overlayOpacity }) {
  return (
    <>
      <Col className={`card-column-${index} w-100 text-center`}>
        <div className="container-button">
          <div className="hover bt-1"></div>
          <div className="hover bt-2"></div>
          <div className="hover bt-3"></div>
          <div className="hover bt-4"></div>
          <div className="hover bt-5"></div>
          <div className="hover bt-6"></div>

          <Button
            className="w-100 rounded-0 fw-bold shadow-sm"
            data-price={item.price}
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,${overlayOpacity}), rgba(0,0,0,${overlayOpacity}))`,
            }}
          />
        </div>
      </Col>
    </>
  );
}

export default TableItem;
