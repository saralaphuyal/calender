import { useState } from "react";
import styles from "./Calender.module.scss";
import ReactTooltip from "react-tooltip";
import { Colors } from "./Colors";

interface Props {
  num?: number;
  label?: string;
  event?: string;
  onClick?: () => void;
  isActive?: boolean;
  isToday?: boolean;
}

const SingleDays: React.FC<Props> = ({
  num,
  label = "",
  event = "",
  onClick,
  isActive = false,
  isToday = false,
}) => {
  const [isHovering, setIsHovering] = useState(false);

  let labelStyle: string = "transparent";

  const matchedColor = Colors.find(
    (c, i) => c.label.toLowerCase() === label.toLowerCase()
  );
  labelStyle = matchedColor?.color || "transparent";

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      style={{
        backgroundColor: isHovering
          ? "#8F9693"
          : isActive
          ? "#73AB95"
          : isToday
          ? "#07AE6C"
          : labelStyle,
        cursor: "pointer",
      }}
      className={styles.singleDays}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-tip
      data-for={event}
    >
      <span>{num}</span>

      <span>
        {event !== "" && (
          <ReactTooltip id={event} place="bottom" effect="solid">
            {event}
          </ReactTooltip>
        )}
      </span>
    </div>
  );
};

export default SingleDays;
