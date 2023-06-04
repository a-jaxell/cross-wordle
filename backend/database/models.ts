import mongoose from 'mongoose';

const { Schema, models, model } = mongoose;

interface GameObject {
    id: string,
    multi: string,
    length: number,
    correctWord: string,
    guesses: string[],
    startTime: Date,
    endTime: null | Date,
}

const GameSchema = new Schema<GameObject>({
    id: String,
    multi: Boolean,
    length: Number,
    correctWord: String,
    guesses: [String],
    startTime: Date,
    endTime: Date,
})

const GameModel = models.GameModel || model<GameObject>("GameModel", GameSchema);

interface Highscore extends GameObject {
    name: string,
}

const HighscoreSchema = new Schema<Highscore>({
    id: String,
    multi: Boolean,
    length: Number,
    correctWord: String,
    guesses: [String],
    startTime: Date,
    endTime: Date,
    name: String,
})

const HighscoreModel = models.HighscoreModel || model<Highscore>("Highscore", HighscoreSchema);

export {GameModel, HighscoreModel};