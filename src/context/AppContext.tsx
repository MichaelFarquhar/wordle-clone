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
    },
    actions: {},
};

export const AppContext = createContext(initialContext);

export function AppProvider({ children }: IAppProvider) {
    const [allWords, setAllWords] = useState<Set<string>>(new Set());
    const [currentGuess, setCurrentGuess] = useState<string[]>([]);

    // Store Word Set into state
    const memoizedFetchWords = useCallback(() => {
        fetchAllWords().then((wordSet) => {
            setAllWords(wordSet);
        });
    }, []);

    // Handles keyboard press
    useEffect(() => {
        window.addEventListener('keyup', handleKeyUp);
        return () => {
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, []);

    const handleKeyUp = ({ key }: KeyboardEvent) => {
        if (letters.includes(key)) {
            setCurrentGuess((guess: string[]) => [...guess, key]);
        }
    };

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
                },
                actions: {
                    setAllWords,
                    setCurrentGuess,
                },
            }}
        >
            {children}
        </AppContext.Provider>
    );
}
