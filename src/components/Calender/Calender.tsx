import {
  add,
  differenceInDays,
  endOfMonth,
  format,
  setDate,
  setMonth,
  setYear,
  startOfMonth,
  sub,
} from "date-fns";
import { useEffect, useState } from "react";
import styles from "./Calender.module.scss";
import { Colors } from "./Colors";
import Days from "./Days";
import Months from "./Months";
import Years from "./Years";

const monthsInYear = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const years = [
  2019, 2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
];
const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

type eventType = {
  title: string;
  date: Date;
  label: string;
};

interface Props {
  getSelectedDate?: (date: Date) => void;
  events?: Array<eventType>;
}

const Calender: React.FC<Props> = ({ getSelectedDate, events }) => {
  const [currentDate = new Date(), setCurrentDate] = useState(new Date());

  const handleReturnDate = () => {
    if (getSelectedDate !== undefined) {
      getSelectedDate(currentDate);
    }
  };

  useEffect(() => {
    handleReturnDate();
  }, [currentDate]);

  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const numDays = differenceInDays(endDate, startDate) + 1;

  const prefixDays = startDate.getDay();
  const suffixDays = 6 - endDate.getDate();

  const prevMonth = () => {
    (currentDate.getFullYear()! > years[0] ||
      currentDate.getMonth()! > monthsInYear.indexOf("January")) &&
      setCurrentDate(sub(currentDate, { months: 1 }));
  };
  const nextMonth = () => {
    (currentDate.getFullYear()! < years[years.length - 1] ||
      currentDate.getMonth()! < monthsInYear.indexOf("December")) &&
      setCurrentDate(add(currentDate, { months: 1 }));
  };
  const prevYear = () => {
    currentDate.getFullYear()! > years[0] &&
      setCurrentDate(sub(currentDate, { years: 1 }));
  };

  const nextYear = () => {
    currentDate.getFullYear()! < years[years.length - 1] &&
      setCurrentDate(add(currentDate, { years: 1 }));
  };

  const [showDetails, setShowDetails] = useState({
    monthYear: true,
    year: false,
    yearRange: false,
  });

  const handleDateChange = (index: number): void => {
    const newDate = setDate(currentDate, index);
    setCurrentDate(newDate);
  };
  const handleMonthChange = (index: number): void => {
    const newMonth = setMonth(currentDate, index);
    setCurrentDate(newMonth);
    setShowDetails({
      monthYear: true,
      year: false,
      yearRange: false,
    });
  };

  const handleYearChange = (year: number): void => {
    const newYear = setYear(currentDate, year);
    setCurrentDate(newYear);
    setShowDetails({
      monthYear: false,
      year: true,
      yearRange: false,
    });
  };

  return (
    <div className={styles.calender}>
      <div className={styles.top}>
        {!showDetails.yearRange && (
          <>
            <button onClick={prevYear}>{"<<"}</button>
            <button onClick={showDetails.monthYear ? prevMonth : prevYear}>
              {"<"}
            </button>
          </>
        )}
        <button
          className={styles.dateButton}
          onClick={(e) =>
            setShowDetails(
              showDetails.monthYear
                ? { ...showDetails, monthYear: false, year: true }
                : { ...showDetails, year: false, yearRange: true }
            )
          }
        >
          {showDetails.monthYear
            ? `${format(currentDate, "LLLL yyyy")}`
            : showDetails.year
            ? `${format(currentDate, "yyyy")}`
            : `${years[0]} - ${years[years.length - 1]}`}
        </button>
        {!showDetails.yearRange && (
          <>
            <button onClick={showDetails.monthYear ? nextMonth : nextYear}>
              {">"}
            </button>
            <button onClick={nextYear}>{">>"}</button>
          </>
        )}
      </div>

      {showDetails.yearRange ? (
        <Years years={years} handleYearChange={handleYearChange} />
      ) : showDetails.year ? (
        <Months
          handleMonthChange={handleMonthChange}
          monthsInYear={monthsInYear}
        />
      ) : (
        <Days
          weekDays={weekDays}
          numDays={numDays}
          prefixDays={prefixDays}
          suffixDays={suffixDays}
          currentDate={currentDate}
          handleDateChange={handleDateChange}
          events={events!}
        />
      )}

      <div className={styles.colorDescription}>
        {Colors.map((color, index) => (
          <div className={styles.colorSpec} key={index}>
            <span
              style={{
                width: "1.5rem",
                height: "1.5rem",
                backgroundColor: color.color,
                borderRadius: "50%",
              }}
            ></span>
            <span>{color.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calender;
