import { atom } from 'recoil';

// Wordle word list found here: https://gist.github.com/cfreshman/a7b776506c73284511034e63af1017ee

// Atom for all words set
export const allWordsState = atom<Set<string>>({
    key: 'allWordsState',
    default: new Set(),
});

// Atom for the current winning word to be guessed
export const winningWordState = atom<string>({
    key: 'winningWordState',
    default: '',
});

// Fetch all words from txt file and return as a Set -- to be stored into atom
export async function fetchAllWords(): Promise<Set<string>> {
    const wordleList = require('../wordle-list.txt');
    let wordleListArray: Array<string>;

    // Get word list from file reader
    const fetchFile = await fetch(wordleList)
        .then((resp) => resp.text())
        .then((text) => {
            // Turn string into array, then return as a new Set
            wordleListArray = text.split(/\r?\n/);
            return new Set(wordleListArray);
        })
        .catch((err) => console.log(err));

    return fetchFile ?? new Set();
}
