import { FC } from "react";
import styles from "./style.module.scss";
import { useState } from "react";
import GuessInput from "../GuessInput";
import SubmitHighscore from "../SubmitHighscore";
import { HighscoreObject } from "../../App";

type GameProps = {
  gameComplete: (highscore: HighscoreObject) => void;
  gameId: {
    id: string;
    length: number;
  }
};

const Game: FC<GameProps> = ({gameId, gameComplete}) =>
  {
    const [feedback, setFeedback] = useState<LetterMatch[][]>([]);
    const [correct, setCorrect] = useState<boolean>(false)
    return (
      <div>
        { feedback.map((guess, index) => {
        return <Word key={index} guessLetters={guess} />
        })
      }
      { !correct &&
        <GuessInput onSubmit={ async(guess)=>{
          const res = await fetch(`/api/game/${gameId.id}/guess`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              guessedWord: guess
            })
          })
          const data = await res.json();
          if(data.correct){
            setCorrect(true);
          }
          setFeedback(() => 
            [...feedback,
            data.match
            ]
          );
        }} length={gameId.length}/> }
        { correct && <SubmitHighscore onSubmit={ async(name)=> {
          const res = await fetch(`/api/game/${gameId.id}/highscore`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name, 
            })
          })
          const data = await res.json();
          gameComplete(data);
        }} />}
      </div>
    );
  };
export default Game;

//Helper functions

function Word({ guessLetters }: { guessLetters: LetterMatch[] }) {
  return (
    <ul className={styles.wordContainer}>
      {guessLetters.map((letter, index) => {
        return <Letter key={index} match={letter} />;
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
      <li className={`${matchResult} ${styles.letter}`}>{match.letter.toUpperCase()}</li>
    </>
  );
}
type LetterMatch = {
  letter: string;
  result: "correct" | "mismatched" | "incorrect" | string;
};
