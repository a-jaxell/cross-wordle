import { FC } from "react";
import { HighscoreObject } from "../../App";
import { DateTime, Interval } from "luxon";

type DisplayHighscoreProps = {
  highscore: HighscoreObject;
};

const DisplayHighscore: FC<DisplayHighscoreProps> = ({ highscore }) => {
  const start = DateTime.fromISO(highscore.startTime);
  const end = DateTime.fromISO(highscore.endTime);
  const time = end.diff(start, ["minutes", "seconds"]).toFormat("mm:ss");
  console.log(time)

  return (
    <div>
      <h4>{`Well done ${highscore.name}!`}</h4>
      <p>{`It took you ${highscore.guesses.length} guesses and ${time} to guess
      ${highscore.correctWord} correctly`}</p>
    </div>
  );
};
export default DisplayHighscore;
