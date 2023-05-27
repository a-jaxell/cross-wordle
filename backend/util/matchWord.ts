interface OrdelProps {
    correctWord: string[];
    guessedWord: string[];
    formatCheck: (string: string) => boolean;
  }



export default class Ordel implements OrdelProps  {
  
  correctWord: string[];
  guessedWord: string[];
  formatCheck: (string: string) => boolean;

  constructor() {
    this.correctWord = [];
    this.guessedWord = [];
    this.formatCheck = (string) => {
      const regex = /^[a-zåäöA-ZÅÄÖ]+$/;
      return regex.test(string);
    };
  }
  // this function formats and validates the input made.
  input(correctWord: string, guessedWord: string) {
    if (correctWord.length !== guessedWord.length) {
      return "Submitted strings should be of the same length.";
    } else if (this.formatCheck(correctWord) && this.formatCheck(guessedWord)) {
      this.correctWord.push(...correctWord.toLowerCase().split(""));
      this.guessedWord.push(...guessedWord.toLowerCase().split(""));
    } else {
      return "Submitted strings may only contain letters and can't be empty.";
    }
  }
  // This function checks the two submitted words against eachother without handling any validation
  match() {
    // Create an empty array
    const result = [];
    const unmatched = this.correctWord.filter(
      (e, i) => e != this.guessedWord[i]
    );

    for (let i = 0; i < this.correctWord.length; i++) {
      let guess = this.guessedWord[i];
      let correct = this.correctWord[i];

      if (guess === correct) {
        result.push({ letter: guess, result: "correct" });
      } else if (unmatched.includes(guess)) {
        result.push({ letter: guess, result: "mismatched" });
      } else {
        result.push({ letter: guess, result: "incorrect" });
      }
    }
    return result;
  }
}
