import { useState, FC } from "react";
import styles from  './style.module.scss'
type GuessInputProps = {
  onSubmit: (guess: string) => void;
  length: number;
};

const GuessInput: FC<GuessInputProps> = ({ onSubmit, length }) => {
  const [guessedWord, setGuessedWord] = useState("");
  const isDisabled = guessedWord.length !== length;

  return (
    <form className={styles.container} onSubmit={(e) => {
        e.preventDefault();
        if(!isDisabled){
        onSubmit(guessedWord);
        setGuessedWord('');
        }
    }}>
      <input
        type="text"
        maxLength={length}
        value={guessedWord}
        onChange={(ev) => setGuessedWord(ev.target.value)}
      />
      <button type="submit" disabled={isDisabled}>
        Guess
      </button>
    </form>
  );
};
export default GuessInput;
