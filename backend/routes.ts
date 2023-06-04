import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import findWord from './util/findWord.js';
import Ordel from './util/matchWord.js';
import words from './words/words.js';
import databaseConnect from './database/databaseConnect.js';
import { GameObject } from './util/types.js';
import { HighscoreModel, GameModel } from './database/models.js';

const app = express();

const GAMES: GameObject[] = []; 

app.use(express.json());

app.get('/', async (req, res) => {
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
    const letters = match.match()
    game.guesses.push(guessedWord);

    const correct = letters.every(letter => letter.result === 'correct');

    if(correct){
        game.endTime = new Date();
    }

    res.status(201).json({
        id: id,
        correct: correct,
        match: letters,
    });
})
app.post('/api/game/:id/highscore', async (req, res) => {
    const { name } = req.body;
    const { id } = req.params;

    const game = GAMES.find((game) => game.id == id)

    if(!game){
      return res.status(404).end();
    }
    if(!game.endTime){
        return res.status(409).end();
    }
    
    await databaseConnect();
    const entry = new HighscoreModel({
        ...game,
       name 
    });
    await entry.save();
    
    res.status(201).json(entry.toJSON());
})
export default app;