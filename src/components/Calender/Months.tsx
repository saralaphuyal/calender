import styles from "./Calender.module.scss";

interface Props {
  monthsInYear: string[];
  handleMonthChange: (index: number) => void;
}

const Months: React.FC<Props> = ({ monthsInYear, handleMonthChange }) => {
  return (
    <div className={styles.yearMonths}>
      {monthsInYear.map((month, index) => (
        <button key={month} onClick={() => handleMonthChange(index)}>
          {month}
        </button>
      ))}
    </div>
  );
};

export default Months;
