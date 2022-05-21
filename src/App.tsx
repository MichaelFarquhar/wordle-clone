import { useState, useEffect, useCallback } from 'react';
import './App.css';
import './normalize.css';

import { Header, Body, Footer } from './components/layout';

import { getLetters } from './utils/getLetters';
import { LetterType } from './context/ContextTypes';

import { AppProvider } from './context/AppContext';

// Get all letters and set letter object in context
const letters = getLetters;
const lettersObject = letters.reduce((accumulator, value) => {
    return {
        ...accumulator,
        [value]: {
            letter: value,
            status: LetterType.DEFAULT,
        },
    };
}, {});

function App() {
    const [data, setData] = useState({});
    // const [wordList, setWordList] = useState<Set<string>>(new Set());

    // // Store Word Set into state
    // const memoizedFetchWords = useCallback(() => {
    //     fetchAllWords().then((wordSet) => {
    //         setWordList(wordSet);
    //     });
    // }, []);

    // useEffect(() => {
    //     memoizedFetchWords();
    // }, []);

    return (
        <div className="app">
            <AppProvider>
                <Header />
                <Body />
                <Footer />
            </AppProvider>
        </div>
    );
}

export default App;
