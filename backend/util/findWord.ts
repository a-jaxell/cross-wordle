type FindWordParameters = {
  wordList: string[];
  wordLength?: number;
  multiChars: boolean;
}


// input, en lista med ord samt en siffra som anger önskad längd, samt en indikation på om unika bokstäver är tilllåtna eller ej
export function findWord({wordList, wordLength = 5, multiChars}: FindWordParameters) {

    // Filters submitted array for words of the desired length and if multiple characters are allowed or not.
  const word = multiChars === true
    ? randomizeWord(wordList.filter((e) => e.length === wordLength))
    : randomizeWord(
        wordList
          .filter((e) => !hasMultipleChars(e))
          .filter((e) => e.length === wordLength)
      );
    // Handles event of not any words matching
    const multiBoolean = multiChars ? '' : 'not ';  
    return word ? word : `There isnt a matching word for ${wordLength} letters while ${multiBoolean}allowing multiple characters`; 
    }
 
// returns the value of an randomized index in an array
export const randomizeWord = (array: string[]) => {
  return array[Math.floor(Math.random() * array.length)];
};

// Checks wether a word has multiple characters
export const hasMultipleChars = (word: string) => {
  const result = [];

  // Iterates and checks if word[i] appears in the rest of the word from word[i +1]
  for (let i = 0; i < word.length; i++) {
    const string = word.slice(i + 1, word.length);
    result.push(string.includes(`${word[i]}`));
  }
  // Returns true in case any letter is included more than once in result
  return result.includes(true);
};