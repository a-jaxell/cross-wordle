import express from 'express';
import { v4 as uuidv4 } from 'uuid';
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('App is responding');
});

app.post('/api/game', (req, res) => {
    

    res.status(201).json(gameId);
})

export default app;