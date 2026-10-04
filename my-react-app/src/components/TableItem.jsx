import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";

function TableItem({ selectedItem, item, index, overlayOpacity, onClick }) {
  const getItemStatusStyle = () => {
    if (selectedItem) {
      return selectedItem.option == item.answer
        ? "option-chosen-correct"
        : "option-choosable option-chosen-incorrect";
    }

    return "option-choosable";
  };

  return (
    <>
      <Col className={`card-column-${index} w-100 text-center`}>
        <div
          className={`container-button ${getItemStatusStyle()}`}
          onClick={() => onClick(item)}
        >
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
            onClick={onClick}
          />
        </div>
      </Col>
    </>
  );
}

export default TableItem;
