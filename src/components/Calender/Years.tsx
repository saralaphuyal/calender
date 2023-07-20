import styles from "./Calender.module.scss";

interface Props {
  years: number[];
  handleYearChange: (year: number) => void;
}

const Years: React.FC<Props> = ({ years, handleYearChange }) => {
  return (
    <div className={styles.years}>
      {years.map((year, index) => (
        <button key={year} onClick={() => handleYearChange(year)}>
          {year}
        </button>
      ))}
    </div>
  );
};

export default Years;
