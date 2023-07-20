import styles from "./Calender.module.scss";
import SingleDays from "./SingleDay";

type eventType = {
  title: string;
  date: Date;
  label: string;
};

interface Props {
  weekDays: string[];
  numDays: number;
  prefixDays: number;
  suffixDays: number;
  currentDate: Date;
  handleDateChange: (date: number) => void;
  events?: Array<eventType>;
}

const Days: React.FC<Props> = ({
  weekDays,
  numDays,
  prefixDays,
  suffixDays,
  currentDate,
  handleDateChange,
  events,
}) => {
  return (
    <>
      <div className={styles.weekDays}>
        {weekDays.map((day, index) => (
          <div key={index}>{day}</div>
        ))}
      </div>
      <div className={styles.days}>
        {Array.from({ length: prefixDays }).map((_, index) => (
          <SingleDays key={index} />
        ))}

        {Array.from({ length: numDays }).map((_, index) => {
          const date = index + 1;
          const isCurrentDate = date === currentDate.getDate();

          const newDate = new Date();
          let isTodayDate =
            `${newDate.getFullYear()}${newDate.getMonth()}${newDate.getDate()}` ===
            `${currentDate.getFullYear()}${currentDate.getMonth()}${date}`;
          const matchedEvent = events?.find(
            (e, index) =>
              `${e.date.getFullYear()}${e.date.getMonth()}${e.date.getDate()}` ===
              `${currentDate.getFullYear()}${currentDate.getMonth()}${date}`
          );

          return (
            <SingleDays
              key={index}
              label={matchedEvent?.label}
              event={matchedEvent?.title}
              num={date}
              onClick={() => {
                handleDateChange(date);
              }}
              isActive={isCurrentDate}
              isToday={isTodayDate}
              data-tip
              data-for={matchedEvent?.title}
            />
          );
        })}
        {Array.from({ length: suffixDays }).map((_, index) => (
          <SingleDays key={index} />
        ))}
      </div>
    </>
  );
};

export default Days;
