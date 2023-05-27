import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import findWord from './util/findWord.js';
import Ordel from './util/matchWord.js';
import words from './words/words.js';

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('App is responding');
});

app.post('/api/game', (req, res) => {
    
    const {length, multi } = req.body;
    const newWord = findWord(words, length, multi);

    const gameId = {
        id: uuidv4(),
        multi: multi,
        length: length,
        correctWord: newWord,
        guesses: [],
        startTime: new Date(),
        endTime: null,
    }

    // Push to database and then respond with correctWord omitted.

    res.status(201).json(gameId);
})

export default app;