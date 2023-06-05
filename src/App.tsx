import Header from "./components/Header";
import Game from "./components/Game";
import StartGame from "./components/StartGame";
import { useState } from "react";

function App() {
  const [gameId, setGameId] = useState();

  return (
    <>
      {/* <Header /> */}
      <StartGame onStartGame={ async (length, multi)=> {
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
        setGameId(data.id);
      }} />
      {/* <Game matchResponse={mockMatch} /> */}
    </>
  );
}

export default App;

const mockMatch = {
  id: "54088acb-c2e6-4c36-b8ac-b18fc2b45dd8",
  match: [
    {
      letter: "m",
      result: "correct",
    },
    {
      letter: "o",
      result: "correct",
    },
    {
      letter: "i",
      result: "correct",
    },
    {
      letter: "s",
      result: "correct",
    },
    {
      letter: "t",
      result: "correct",
    },
  ],
};
