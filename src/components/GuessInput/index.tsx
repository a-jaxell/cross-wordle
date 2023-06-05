import { useState, FC } from "react";

type GuessInputProps = {
  onSubmit: (guess: string) => void;
  length: number;
};

const GuessInput: FC<GuessInputProps> = ({ onSubmit, length }) => {
  const [guessedWord, setGuessedWord] = useState("");
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(guessedWord);
        setGuessedWord('');
    }}>
      <input
        type="text"
        maxLength={length}
        value={guessedWord}
        onChange={(ev) => setGuessedWord(ev.target.value)}
      />
      <button type="submit" disabled={guessedWord.length !== length? true : false}>
        Guess
      </button>
    </form>
  );
};
export default GuessInput;
