# Cross-wordle

This is a clone of the famous wordle game. It lets the user guess a word and allows
them to select wether duplicate letters are allowed or not and what length of the word
they want to guess. When the user guesses a word correctly they can submit a highscore.

## Project

This project is boot-strapped with Create React App and developed with TypeScript.

By using Express, React, Node.js and MongoDB this is a fullstack app with
support for cloud database.

## Setup

### Run locally without database

To run the app locally without database, clone this repo and run the following commands
in the terminal:

``` bash

npm install 
npm start-backend

```
Then go to [localhost:5080/](http://localhost:5080/) and try it out.

### Run locally with MongoDB Atlas

To run with MongoDBs cloud database Atlas you need to create a `.env` file and set the
`MONGODB_URI`

```bash
MONGODB_URI = mongodb+srv://user:password@your-database.mongodb.net/your-collection
```

Then start the app like normally with
``` bash
npm start-backend
```

## Build

The build command builds resources in `./src` and copies required resources to `/backend/static/`.

``` bash
npm run build
```

## API

### /api/game
#### `POST /api/game`
    Sends input settings to server and receives an game id in return.
    Stores game Id on server.


#### `POST /api/game/:id/guess`
    Submits a guess and checks if it is correct.
    Adds guess to game object matching the id. 
    Returns matching letters and wether the word submitted is correct or not.

#### `POST /api/game/:id/highscore`
    Submits a new highscore to the database.
    Is only allowed if the game is finished(the correct word has been properly guessed).
    Returns the highscore entry.

### /api/highscore
#### `GET /api/highscore`
    Gets all submitted highscores from the database.
    It doesnt filter or sort at the moment. 