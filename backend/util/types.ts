export interface GameObject {
    id: string,
    multi: string,
    length: number,
    correctWord: string,
    guesses: string[],
    startTime: Date,
    endTime: null | Date,
}