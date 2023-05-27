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
        id: uuidv4(),
        multi: multi,
        length: length,
        correctWord: newWord,
        guesses: [],
        startTime: new Date(),
        endTime: null,
    }

    GAMES.push(gameId);

    res.status(201).json({
        id: gameId.id,

    });
})

app.put('/api/game', (req, res) => {
    const {id, guess} = req.body;
    
    if(!GAMES.includes(id)){
        res.status(204).json({
         error: 'No such game Id'
        });
    } else {
        res.status(200).json(
            { submit: 'this is a guess going through'});
    }
})

export default app;