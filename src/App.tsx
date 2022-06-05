import { useEffect, useContext } from 'react';
import './App.css';
import './normalize.css';

import { Header, Body, Footer } from './components/layout';
import { AppContext } from './context/AppContext';
import { getLetters } from './utils/getLetters';

function App() {
    const letters = getLetters;
    const { board, currentRow, currentLetter } = useContext(AppContext).store;
    const { setCurrentGuess, setCurrentLetter, setCurrentRow, updateBoard } =
        useContext(AppContext).actions;

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
            setCurrentLetter((curr: number) => curr + 1);
            setCurrentRow((curr: number) => curr + 1);
            updateBoard(key);
        }
    };

    return (
        <div className="app">
            <Header />
            <Body />
            <Footer />
        </div>
    );
}

export default App;
