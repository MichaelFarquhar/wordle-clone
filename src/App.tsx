import { useEffect, useRef } from 'react';
import './App.css';
import './normalize.css';

import { Header, Body, Footer } from './components/layout';
import { getLetters } from './utils/getLetters';
import { atom, DefaultValue, selector, useRecoilState, useSetRecoilState } from 'recoil';
import { showErrorToast } from './utils/showErrorToast';
import { ToastContainer } from 'react-toastify';

import { allWordsState, fetchAllWords } from './state/allWords';

// The current row we are on on the board, starting at 0
export const rowState = atom({
    key: 'rowState',
    default: 0,
});

interface IBoard {
    board: string[];
    currentIndex: number;
}
// The backend of the board state
export const boardState = atom<IBoard>({
    key: 'boardState',
    default: {
        board: Array(30).fill(''),
        currentIndex: 0,
    },
});

const invalidWordStateUpdateSelector = selector<IBoard>({
    key: 'invalidWordStateUpdate',
    get: ({ get }) => ({ ...get(boardState) }),
    set: ({ set }, oldBoard) => {
        set(
            boardState,
            oldBoard instanceof DefaultValue
                ? {
                      board: Array(30).fill(''),
                      currentIndex: 0,
                  }
                : {
                      ...oldBoard,
                      board: [
                          ...oldBoard.board.slice(0, oldBoard.currentIndex - 5),
                          ...Array(30 - (oldBoard.currentIndex - 5)).fill(''),
                      ],
                      currentIndex: oldBoard.currentIndex - 5,
                  }
        );
        console.log(oldBoard);
    },
});

const useEventListener = (eventName: any, handler: any, element = window) => {
    const savedHandler = useRef<any>();

    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
        const eventListener = (event: any) => savedHandler.current(event);
        element.addEventListener(eventName, eventListener);
        return () => {
            element.removeEventListener(eventName, eventListener);
        };
    }, [eventName, element]);
};

function App() {
    const lettersList = getLetters;

    const [board, setBoard] = useRecoilState(boardState);
    const [allWords, setAllWords] = useRecoilState(allWordsState);
    const setBoardSelector = useSetRecoilState(invalidWordStateUpdateSelector);

    const checkEnteredWord = () => {
        // If 5 letters have been entered, check letters
        if (board.currentIndex !== 0 && board.currentIndex % 5 === 0) {
            const current_word = [
                ...board.board.slice(board.currentIndex - 5, board.currentIndex),
            ].join('');

            // Entered word is not a valid word
            if (!allWords.has(current_word)) {
                showErrorToast('Not in word list');
                setBoardSelector((board) => board);
            }
            // Word is a valid word, we perform letter checking
            else {
                setBoard((oldBoard) => ({
                    ...oldBoard,
                    currentIndex: oldBoard.currentIndex + 1,
                }));
            }

            console.log(current_word);
        }
    };

    // Load all eligble words from txt file and save in state
    useEffect(() => {
        if (allWords.size <= 0) fetchAllWords().then((set) => setAllWords(set));
    }, []);

    const addLetter = (letter: string) => {
        // Dont add anymore letters if 5 or more are entered for the row
        if (board.currentIndex > 0 && board.currentIndex % 5 == 0) {
            return;
        }

        // Add letter
        setBoard((oldBoard) => ({
            board: [
                ...oldBoard.board.slice(0, oldBoard.currentIndex),
                letter,
                ...oldBoard.board.slice(oldBoard.currentIndex + 1),
            ],
            currentIndex: oldBoard.currentIndex + 1,
        }));

        console.log(board.currentIndex);
    };

    const removeLetter = () => {
        const letter = '';

        // Only remove letters if any can be removed
        if (board.currentIndex > 0) {
            setBoard((oldBoard) => ({
                board: [
                    ...oldBoard.board.slice(0, oldBoard.currentIndex - 1),
                    letter,
                    ...oldBoard.board.slice(oldBoard.currentIndex),
                ],
                currentIndex: oldBoard.currentIndex - 1,
            }));
        }
    };

    const handleKeyUp = ({ key }: KeyboardEvent) => {
        // If Backspace or Delete pressed, press latest letter
        if (key === 'Backspace' || key === 'Delete') {
            removeLetter();
            return;
        }

        // If Enter is pressed and 5 letters are present
        if (key === 'Enter' && board.currentIndex > 0 && board.currentIndex % 5 == 0) {
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
            <button onClick={() => setBoardSelector((board) => board)}>test</button>
            <Body />
            <Footer />
        </div>
    );
}

export default App;
