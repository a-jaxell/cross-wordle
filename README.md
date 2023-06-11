# Wordle-klon

To build and run this project locally run the commands below.

``` bash

npm install 
npm start

```

---
### API

#### /api/game
##### `POST /api/game`
Starts a new game and stores game data in database.
    * Ta emot inställningar
    * Välja ord efter inställningar
    * Skapa spelobjekt med ord, gissade ord, inställningar och unikt id
    * svarar med unikt id

##### `POST /api/game/:id/guess`
    Submits a guess and checks if it is correct.
    Returns matching letters nd wether the word submitted is correct or not.

##### `POST /api/game/:id/highscore`
    Submits a new highscore to the database.
    Is only allowed if the game is finished(the correct word has been properly guessed).
    Returns the highscore entry.

#### /api/highscore
##### `GET /api/highscore`
Gets the top ten fastest times according to settings
    * ta emot inställningar
    * filtrera efter färdiga spel
    * filtrera databas efter inställningar 
    * returnera array med objekt 