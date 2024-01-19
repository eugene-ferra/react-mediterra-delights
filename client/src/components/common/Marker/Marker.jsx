import styles from "./Marker.module.scss";

const Marker = ({ type, children }) => {
  let className;

  switch (type) {
    case "green":
      className = styles.markerGreen;
      break;
    case "blue":
      className = styles.markerBlue;
      break;
    case "red":
      className = styles.markerRed;
      break;

    default:
      className = styles.marker;
      break;
  }

  return <div className={className}>{children}</div>;
};

export default Marker;
