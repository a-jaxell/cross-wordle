import styles from "./style.module.scss";
import { FC, useState } from "react";

type StartGameProps = {
  onStartGame: (length: number, multi: boolean) => void;
};

const StartGame: FC<StartGameProps> = ({onStartGame}) => {
  const [multi, setMulti] = useState(true);
  const [length, setLength] = useState(5);

  return (
    <div className={styles.formContainer}>
      <div>
        <input
          className={styles.checkbox}
          type="checkbox"
          checked={multi}
          name="uniqueCharacters"
          onChange={() => {
            setMulti(!multi);
          }}
        />
        Unique characters
      </div>
      <div>
        <select
          name="selectLetters"
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        >
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </select>
        Letters
      </div>
      <button
        className={styles.submitButton}
        onClick={() => onStartGame(length, multi)}
      >
        Start Game
      </button>
    </div>
  );
}
export default StartGame;
