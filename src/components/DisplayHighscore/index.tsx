import { FC } from "react";
import { HighscoreObject } from "../../App";
import { DateTime } from "luxon";
import styles from './style.module.scss'

type DisplayHighscoreProps = {
  highscore: HighscoreObject;
};

const DisplayHighscore: FC<DisplayHighscoreProps> = ({ highscore }) => {
  const start = DateTime.fromISO(highscore.startTime);
  const end = DateTime.fromISO(highscore.endTime);
  const time = end.diff(start, ["minutes", "seconds"]).toFormat("mm:ss");

  return (
    <div className={styles.formContainer}>
      <h4>{`Well done ${highscore.name}!`}</h4>
      <p>{`It took you ${highscore.guesses.length} guesses and ${time} to guess
      ${highscore.correctWord} correctly`}</p>
    </div>
  );
};
export default DisplayHighscore;
