import { useState, FC } from "react";

type GuessInputProps = {
  onSubmit: (guess: string) => void;
  length: number;
};

const GuessInput: FC<GuessInputProps> = ({ onSubmit, length }) => {
  const [guessedWord, setGuessedWord] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit(guessedWord);
        setGuessedWord('');
    }}>
      <input
        type="text"
        value={guessedWord}
        onChange={(ev) => setGuessedWord(ev.target.value)}
      />
      <button type="submit" placeholder="Guess">
        Guess
      </button>
    </form>
  );
};
export default GuessInput;
