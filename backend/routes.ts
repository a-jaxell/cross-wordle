import express from "express";
import { v4 as uuidv4 } from "uuid";
import findWord from "./util/findWord.js";
import Ordel from "./util/matchWord.js";
import words from "./words/words.js";
import databaseConnect from "./database/databaseConnect.js";
import { GameObject } from "./util/types.js";
import { HighscoreModel } from "./database/models.js";
import { engine } from "express-handlebars";
import { DateTime } from "luxon";

const app = express();

const GAMES: GameObject[] = [];

app.use(express.json());
app.use("/static", express.static("./backend/static"));

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./backend/templates");

app.get("/", (req, res) => {
  res.render("game.handlebars");
});

app.get("/about", (req, res) => {
  res.render("about.handlebars");
});

app.get("/highscores", async (req, res) => {

  databaseConnect();

  const entryModels = await HighscoreModel.find();
  const highscores = entryModels.map((model) => {
    const start = DateTime.fromJSDate(model.startTime);
    const end = DateTime.fromJSDate(model.endTime);
    const time = end.diff(start, ["minutes", "seconds"]).toFormat("mm:ss");
    return {
      ...model.toJSON(),
      duration: time,
    };
  });
  res.render("highscores.handlebars", { highscores });
});

app.post("/api/game", (req, res) => {
  const { length, multi } = req.body;
  const newWord = findWord(words, length, multi);

  const gameId: GameObject = {
    id: uuidv4().toString(),
    multi: multi,
    length: length,
    correctWord: newWord,
    guesses: [],
    startTime: new Date(),
    endTime: null,
  };

  GAMES.push(gameId);
  res.status(201).json({
    id: gameId.id,
    length: gameId.length,
  });
});

app.post("/api/game/:id/guess", async (req, res) => {
  const { guessedWord } = req.body;
  const { id } = req.params;

  const game = GAMES.find((game) => game.id == id);

  if (!game) {
    return res.status(404).end();
  }
  const match = new Ordel();
  match.input(game.correctWord, guessedWord);
  const letters = match.match();
  game.guesses.push(guessedWord);

  const correct = letters.every((letter) => letter.result === "correct");

  if (correct) {
    game.endTime = new Date();
  }

  res.status(201).json({
    id: id,
    correct: correct,
    match: letters,
  });
});
app.post("/api/game/:id/highscore", async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const game = GAMES.find((game) => game.id == id);

  if (!game) {
    return res.status(404).end();
  }
  if (!game.endTime) {
    return res.status(409).end();
  }

  await databaseConnect();
  const entry = new HighscoreModel({
    ...game,
    name,
  });
  await entry.save();

  res.status(201).json(entry.toJSON());
});
export default app;
