# Wordle-klon

Using MongoDB, Express, React and Node.js this is an app that lets you
guess a word. It accepts settings on word length and wether you want
to play with duplicate letters or not.


To build and run this project locally run the commands below.

``` bash

npm install 
npm start

```
Then go to [localhost:5080/](http://localhost:5080/) and try it out.

---

### API

#### /api/game
##### `POST /api/game`
    Sends input settings to server and receives an game id in return.
    Stores game Id on server.


##### `POST /api/game/:id/guess`
    Submits a guess and checks if it is correct.
    Adds guess to game object matching the id. 
    Returns matching letters and wether the word submitted is correct or not.

##### `POST /api/game/:id/highscore`
    Submits a new highscore to the database.
    Is only allowed if the game is finished(the correct word has been properly guessed).
    Returns the highscore entry.

#### /api/highscore
##### `GET /api/highscore`
    Gets all submitted highscores from the database.
    It doesnt filter or sort at the moment. 