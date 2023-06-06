import app from './routes.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT_BACKEND = 5080;

app.listen(PORT_BACKEND, () => {
    console.log('[server]: Server is listening on localhost:' + PORT_BACKEND);
});