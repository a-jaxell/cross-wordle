import Header from "./components/Header";
import Game from "./components/Game";
import StartGame from "./components/StartGame";
import { useState } from "react";
import DisplayHighscore from "./components/DisplayHighscore";

type GameProps = {
  id: string;
  length: number;
};
export type HighscoreObject = {
  id: string;
  multi: boolean;
  length: number;
  correctWord: string;
  guesses: string[];
  startTime: string;
  endTime: string;
  name: string;
};

function App() {
  const [screen, setScreen] = useState<"start" | "game" | "highscore">("start");
  const [gameId, setGameId] = useState<GameProps | null>(null);
  const [highscore, setHighscore] = useState<HighscoreObject | null>(null);

  return (
    <>
      {/* <Header /> */}
      {screen === "start" && (
        <StartGame
          onStartGame={async (length, multi) => {
            const res = await fetch("/api/game", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                length,
                multi,
              }),
            });

            const data = await res.json();
            setGameId(data);
            setScreen("game");
          }}
        />
      )}
      {screen === "game" && gameId && (
        <Game
          gameId={gameId}
          gameComplete={(highscore) => {
            setHighscore(highscore);
            setGameId(null);
            setScreen("highscore");
          }}
        />
      )}
      {screen === "highscore" && highscore && (
        <>
          <DisplayHighscore
            highscore={highscore}
            onSubmit={() => {
              setHighscore(null);
              setScreen("start");
            }}
          />
        </>
      )}
    </>
  );
}

export default App;
