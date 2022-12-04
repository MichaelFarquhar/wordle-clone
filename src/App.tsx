import { useEffect } from 'react';
import './App.css';
import './normalize.css';

import { Header } from './components/layout';
import { getLetters } from './utils/getLetters';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ToastContainer } from 'react-toastify';

import { allWordsState, fetchAllWords, winningWordState } from './state/allWords';
import { useBoardActions } from './hooks/useBoardActions';
import { useEventListener } from './hooks/useEventListener';
import Wordboard from './components/WordBoard/WordBoard';
import Keyboard from './components/Keyboard/Keyboard';
import { GameEndModal } from './components/GameEndModal';

function App() {
    const lettersList = getLetters;
    const [allWords, setAllWords] = useRecoilState(allWordsState);
    const setWinningWord = useSetRecoilState(winningWordState);

    const { addLetter, removeLetter, checkEnteredWord } = useBoardActions();

    // Load all eligble words from txt file and save in state
    useEffect(() => {
        if (allWords.size <= 0)
            fetchAllWords().then((arr) => {
                const winningWord = arr[Math.floor(Math.random() * arr.length)];

                setAllWords(new Set(arr));
                setWinningWord(winningWord);
                // console.log(winningWord);
            });
    }, [allWords.size, setAllWords, setWinningWord]);

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
            <GameEndModal />

            <Header />
            <Wordboard />
            <Keyboard />
        </div>
    );
}

export default App;
