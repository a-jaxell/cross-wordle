import styles from "./style.module.scss";

export default function Game({
  matchResponse,
}: {
  matchResponse: MatchResponse;
}) {
  const currentPage = "";
  return (
    <div>
      <Word guessLetters={matchResponse.match} />
      <form>
        <input type="text" />
        <input type="submit" placeholder="Guess" />
      </form>
    </div>
  );
}

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
