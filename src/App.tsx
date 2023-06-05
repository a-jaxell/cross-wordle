import Header from "./components/Header";
import Game from "./components/Game";
import StartGame from "./components/StartGame";
import { useState } from "react";

type GameProps = {
    id: string;
    length: number;
}
;

function App() {
  const [screen, setScreen] = useState<'start' | 'game' | 'highscore'>('start');
  const [gameId, setGameId] = useState<GameProps | null>(null);

  return (
    <>
      {/* <Header /> */}
      {screen == 'start' && <StartGame onStartGame={ async (length, multi)=> {
        const res = await fetch('/api/game', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            length,
            multi
          })
        })

        const data = await res.json()
        setGameId(data);
        setScreen('game');
      }} />
    }
      { screen == 'game' && gameId && <Game gameId={gameId} />}
    </>
  );
}

export default App;
