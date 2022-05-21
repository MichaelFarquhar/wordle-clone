import { useState, useEffect, useCallback } from 'react';
import './App.css';
import './normalize.css';
import { AppContext } from './context/AppContext';

import { Header, Body, Footer } from './components/layout';

// Wordle word list found here: https://gist.github.com/cfreshman/a7b776506c73284511034e63af1017ee
async function fetchAllWords(): Promise<Set<string>> {
    const wordleList = require('./wordle-list.txt');
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

function App() {
    const [data, setData] = useState({});
    const [wordList, setWordList] = useState<Set<string>>(new Set());

    // Store Word Set into state
    const memoizedFetchWords = useCallback(() => {
        fetchAllWords().then((wordSet) => {
            setWordList(wordSet);
        });
    }, [wordList]);

    useEffect(() => {
        memoizedFetchWords();
    }, []);

    return (
        <div className="app">
            <Header />
            <AppContext.Provider
                value={{
                    wordList,
                }}
            >
                <Body />
            </AppContext.Provider>
            <Footer />
        </div>
    );
}

export default App;
