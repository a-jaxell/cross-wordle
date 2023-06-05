import { FC } from "react";
import styles from "./style.module.scss";
import { useState } from "react";
import GuessInput from "../GuessInput";
type GameProps = {
  gameId: {
    id: string;
    length: number;
  }
};

const Game: FC<GameProps> = ({gameId}) =>
  // state for handling amount of guesses. (as in how many)
  {
    const [feedback, setFeedback] = useState<MatchResponse>();
    return (
      <div>
        {/* <Word guessLetters={} /> */}
        <GuessInput onSubmit={()=>{}} length={gameId.length}/>
      </div>
    );
  };
export default Game;

//Helper functions

function Word({ guessLetters }: { guessLetters: LetterMatch[] }) {
  return (
    <ul className={styles.wordContainer}>
      {guessLetters.map((letter) => {
        return <Letter match={letter} />;
      })}
    </ul>
  );
}
function Letter({ match }: { match: LetterMatch }) {
  const matchResult =
    match.result !== "incorrect"
      ? match.result === "mismatched"
        ? styles.mismatched
        : styles.correct
      : "";
  return (
    <>
      <li className={`${matchResult} ${styles.letter}`}>{match.letter}</li>
    </>
  );
}
type LetterMatch = {
  letter: string;
  result: "correct" | "mismatched" | "incorrect" | string;
};
type MatchResponse = {
  id: string;
  match: LetterMatch[];
};
