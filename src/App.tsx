import { useEffect } from 'react';
import './App.css';
import './normalize.css';

import { Header, Body, Footer } from './components/layout';
import { getLetters } from './utils/getLetters';
import { useRecoilState } from 'recoil';
import { ToastContainer } from 'react-toastify';

import { allWordsState, fetchAllWords } from './state/allWords';
import { useBoardActions } from './hooks/useBoardActions';
import { useEventListener } from './hooks/useEventListener';

function App() {
    const lettersList = getLetters;
    const [allWords, setAllWords] = useRecoilState(allWordsState);

    const { addLetter, removeLetter, checkEnteredWord } = useBoardActions();

    // Load all eligble words from txt file and save in state
    useEffect(() => {
        if (allWords.size <= 0) fetchAllWords().then((set) => setAllWords(set));
    }, [allWords.size, setAllWords]);

    const handleKeyUp = ({ key }: KeyboardEvent) => {
        // If Backspace or Delete pressed, press latest letter
        if (key === 'Backspace' || key === 'Delete') {
            removeLetter();
            return;
        }

        // If Enter is pressed and 5 letters are present
        if (key === 'Enter') {
            checkEnteredWord();
        }

        // Otherwise check for a valid key press
        if (lettersList.includes(key)) {
            // Otherwise add a letter
            addLetter(key);
        }
    };

    useEventListener('keydown', handleKeyUp);

    return (
        <div className="app">
            {/* Contained to show a toast -- handled in showErrorToast.ts file*/}
            <ToastContainer />

            <Header />
            <Body />
            <Footer />
        </div>
    );
}

export default App;
