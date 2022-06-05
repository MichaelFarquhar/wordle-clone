//     q: ILetter;
//     w: ILetter;
//     e: ILetter;
//     r: ILetter;
//     t: ILetter;
//     y: ILetter;
//     u: ILetter;
//     i: ILetter;
//     o: ILetter;
//     p: ILetter;
//     a: ILetter;
//     s: ILetter;
//     d: ILetter;
//     f: ILetter;
//     g: ILetter;
//     h: ILetter;
//     j: ILetter;
//     k: ILetter;
//     l: ILetter;
//     ENTER: ILetter;
//     z: ILetter;
//     x: ILetter;
//     c: ILetter;
//     v: ILetter;
//     b: ILetter;
//     n: ILetter;
//     m: ILetter;
//     DELETE: ILetter;
// }

export enum LetterType {
    DEFAULT, // Letter no entered
    YELLOW, // Letter is correct but in wrong space
    GREEN, // Letter is correct and in correct space
    DISABLED, // Letter is not in word and cannot be used
}

export interface ILetter {
    letter: string;
    status: LetterType;
}

export interface IStoreContext {
    allWords: Set<string>; // Master word list from txt file
    winningWord: string[]; // The word to be guessed to the win the game. Array of 5 letter characters.
    currentGuess: string[]; // The current word being guessed. Array of 5 letter characters
    currentRow: number; // The current row we are on in the word grid
    currentLetter: number; // The current letter spot we are on in the row
    board: string[]; // The string array matching each word cell in the board
    letters: Map<string, ILetter>; // Each letter has their own object property to be easier searched
}

export interface IAppContext {
    store: IStoreContext;
    actions: any;
}
