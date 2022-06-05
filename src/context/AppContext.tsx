import React, { createContext, useState, useEffect, useCallback } from 'react';
import { getLetters } from '../utils/getLetters';
import { IAppContext, LetterType } from './ContextTypes';

// const letters = getLetters;

// const lettersObject = letters.reduce((accumulator, value) => {
//     return {
//         ...accumulator,
//         [value]: {
//             letter: value,
//             status: LetterType.DEFAULT,
//         },
//     };
// }, {});

interface IAppProvider {
    children: React.ReactNode;
}

// Get all letters and set letter object in context
const letters = getLetters;
const letterMap = new Map();
letters.forEach((item) => {
    letterMap.set(item, {
        letter: item,
        status: LetterType.DEFAULT,
    });
});

// const lettersObject = letters.reduce((accumulator, value) => {
//     return {
//         ...accumulator,
//         [value]: {
//             letter: value,
//             status: LetterType.DEFAULT,
//         },
//     };
// }, {});

// Wordle word list found here: https://gist.github.com/cfreshman/a7b776506c73284511034e63af1017ee
async function fetchAllWords(): Promise<Set<string>> {
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

const initialContext: IAppContext = {
    store: {
        allWords: new Set(),
        winningWord: [],
        currentGuess: [],
        currentRow: 0,
        letters: new Map(),
        board: Array(30).fill(''),
        currentLetter: 0,
    },
    actions: {},
};

export const AppContext = createContext(initialContext);

export function AppProvider({ children }: IAppProvider) {
    const [allWords, setAllWords] = useState<Set<string>>(new Set());
    const [currentGuess, setCurrentGuess] = useState<string[]>([]);
    const [board, setBoard] = useState<string[]>(Array(30).fill(''));
    const [winningWord, setWinningWord] = useState<string[]>([]);

    const [currentRow, setCurrentRow] = useState(0);
    const [currentLetter, setCurrentLetter] = useState(0);

    console.log(currentRow);

    const updateBoard = (key: string) => {
        let position = currentRow + currentLetter;
        console.log(position);
        console.log(currentRow);
        console.log(currentLetter);
        const currentBoard = board;
        currentBoard[position] = key;

        setBoard(() => [...currentBoard]);
    };

    // Store Word Set into state
    const memoizedFetchWords = useCallback(() => {
        fetchAllWords().then((wordSet) => {
            setAllWords(wordSet);
        });
    }, []);

    useEffect(() => {
        memoizedFetchWords();
    }, [memoizedFetchWords]);

    return (
        <AppContext.Provider
            value={{
                store: {
                    allWords,
                    letters: letterMap,
                    currentGuess,
                    board,
                    currentRow,
                    currentLetter,
                    winningWord,
                },
                actions: {
                    setAllWords,
                    setCurrentGuess,
                    setCurrentLetter,
                    setCurrentRow,
                    updateBoard,
                    setWinningWord,
                },
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
