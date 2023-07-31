import PropTypes from "prop-types";

function AttributeLabel(props) {
  const calcColour = () => {
    const error = props.attributeError;
    if (0 <= error && error < 40) {
      return "red";
    } else if (40 <= error && error < 60) {
      return "orange";
    } else if (60 <= error && error < 80) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <div
      className="card"
      style={{
        marginLeft: "10px",
        marginRight: "10px",
        textAlign: "center",
        marginTop: "20px",
        width: "45%",
      }}
    >
      <h4 className="card-header">{props.attributeName}</h4>
      <div className="card-body">
        <h3>{props.attributeValue}</h3>
        {props.attributeError && (
          <h5 style={{ color: calcColour() }}>
            {Math.round(props.attributeError * 100) / 100}
          </h5>
        )}
      </div>
    </div>
  );
}

AttributeLabel.propTypes = {
  attributeName: PropTypes.string,
  attributeValue: PropTypes.string,
  attributeError: PropTypes.number,
};

export default AttributeLabel;
