import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import findWord from './util/findWord.js';
import Ordel from './util/matchWord.js';
import words from './words/words.js';

const app = express();

type GameObject = {
    id: string;
    multi: boolean;
    length: number;
    correctWord: string;
    guesses: string[];
    startTime: Date;
    endTime: null | Date;
}

const GAMES: GameObject[] = []; //Database Game object

app.use(express.json());

app.get('/', (req, res) => {
    res.send('App is responding');
});

app.post('/api/game', (req, res) => {
    
    const {length, multi } = req.body;
    const newWord = findWord(words, length, multi);

    const gameId: GameObject = {
        id: uuidv4().toString(),
        multi: multi,
        length: length,
        correctWord: newWord,
        guesses: [],
        startTime: new Date(),
        endTime: null,
    }

    GAMES.push(gameId);
    res.status(201).json({
        id: gameId.id
    });
})

app.post('/api/game/:id/guess', async (req, res) => {
    const {guessedWord} = req.body;
    const {id} = req.params;
    
    const game = GAMES.find((game) => game.id == id)

    if(!game){
      return res.status(404).end();
    }
    const match = new Ordel;
    match.input(game.correctWord, guessedWord);

    res.status(201).json({
        id: id,
        match: match.match(),
    });
})

export default app;