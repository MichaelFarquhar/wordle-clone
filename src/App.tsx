import { useEffect, useRef } from 'react';
import './App.css';
import './normalize.css';

import { Header, Body, Footer } from './components/layout';
import { getLetters } from './utils/getLetters';
import {
    atom,
    DefaultValue,
    selector,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from 'recoil';
import { showErrorToast } from './utils/showErrorToast';
import { ToastContainer } from 'react-toastify';

import { allWordsState, fetchAllWords, winningWordState } from './state/allWords';
import { lettersStatusState, LetterStatus } from './state/letters';

interface IBoard {
    board: string[];
    currentIndex: number;
    currentRow: number;
}

// The backend of the board state
export const boardState = atom<IBoard>({
    key: 'boardState',
    default: {
        board: Array(30).fill(''),
        currentIndex: 0,
        currentRow: 0,
    },
});

// Returns true if a letter can be added to the board
export const canAddLetterSelector = selector<boolean>({
    key: 'canAddLetterSelector',
    get: ({ get }) => {
        const { currentIndex, currentRow } = get(boardState);
        return !(currentIndex > 0 + currentRow * 5 && currentIndex % 5 === 0);
    },
});

// Returns true if a letter can be removed to the board
export const canRemoveLetterSelector = selector<boolean>({
    key: 'canRemoveLetterSelector',
    get: ({ get }) => {
        const { currentIndex, currentRow } = get(boardState);
        return currentIndex > 0 + currentRow * 5;
    },
});

// Returns true if there are 5 letters present in the row
export const canCheckRowSelector = selector<boolean>({
    key: 'canCheckRowSelector',
    get: ({ get }) => {
        const { currentIndex, currentRow } = get(boardState);
        return currentIndex > 0 + currentRow * 5 && currentIndex % 5 === 0;
    },
});

// Will clear the current row of the board if the word entered was not a valid word
const invalidWordSelector = selector<IBoard>({
    key: 'invalidWordSelector',
    get: ({ get }) => ({ ...get(boardState) }),
    set: ({ set }, oldBoard) => {
        set(
            boardState,
            oldBoard instanceof DefaultValue
                ? {
                      board: Array(30).fill(''),
                      currentIndex: 0,
                      currentRow: 0,
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
    const setBoardSelector = useSetRecoilState(invalidWordSelector);
    const winningWord = useRecoilValue(winningWordState);
    const [lettersStatus, setLettersStatus] = useRecoilState(lettersStatusState);

    const canAddLetter = useRecoilValue(canAddLetterSelector);
    const canRemoveLetter = useRecoilValue(canRemoveLetterSelector);
    const canCheckRow = useRecoilValue(canCheckRowSelector);

    const checkEnteredWord = () => {
        if (canCheckRow) {
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
                // Check word

                let statuses: LetterStatus[] = [];
                // Loop 5 times (once per character)
                for (let i = 0; i < 5; i++) {
                    // If letter is in correct spot
                    if (current_word.charAt(i) === winningWord.charAt(i)) {
                        statuses.push(LetterStatus.GREEN);
                    }
                    // If letter somewhere else
                    else if (winningWord.includes(current_word.charAt(i))) {
                        statuses.push(LetterStatus.YELLOW);
                    } else {
                        statuses.push(LetterStatus.NONE);
                    }
                }

                setLettersStatus((oldStatus) => [
                    ...oldStatus.slice(0, board.currentIndex - 5),
                    ...statuses,
                    ...Array(30 - board.currentIndex).fill(LetterStatus.DEFAULT),
                ]);

                setBoard((oldBoard) => ({
                    ...oldBoard,
                    currentRow: oldBoard.currentRow + 1,
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
        if (canAddLetter) {
            setBoard((oldBoard) => ({
                ...oldBoard,
                board: [
                    ...oldBoard.board.slice(0, oldBoard.currentIndex),
                    letter,
                    ...oldBoard.board.slice(oldBoard.currentIndex + 1),
                ],
                currentIndex: oldBoard.currentIndex + 1,
            }));
        }
    };

    const removeLetter = () => {
        if (canRemoveLetter) {
            setBoard((oldBoard) => ({
                ...oldBoard,
                board: [
                    ...oldBoard.board.slice(0, oldBoard.currentIndex - 1),
                    '',
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
