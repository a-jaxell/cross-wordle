import express from 'express';
import dotenv from 'dotenv';

dotenv.config();
const PORT_BACKEND = 3080;

const app = express();
app.listen(PORT_BACKEND, () => {
    console.log('[server]: Server is listening on localhost:' + PORT_BACKEND);
});

app.get('/', (req, res) => {
    res.send('App is responding');
})

