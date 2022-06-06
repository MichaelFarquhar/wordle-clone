import { useEffect, useRef } from 'react';
import './App.css';
import './normalize.css';

import { Header, Body, Footer } from './components/layout';
import { AppContext } from './context/AppContext';
import { getLetters } from './utils/getLetters';
import {
    atom,
    DefaultValue,
    GetRecoilValue,
    selector,
    useRecoilState,
    useSetRecoilState,
} from 'recoil';
import { showErrorToast } from './utils/showErrorToast';
import { ToastContainer } from 'react-toastify';

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

const allWordsState = atom<Set<string>>({
    key: 'allWordsState',
    default: new Set(),
});

interface ILetter {
    letter: string;
    status: boolean;
}

interface ILetters {
    [key: string]: ILetter;
}

const lettersState = atom<ILetters>({
    key: 'lettersState',
    default: {},
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
    const lettersList = getLetters;
    // const { board, currentRow, currentLetter } = useContext(AppContext).store;
    // const { setCurrentGuess, setCurrentLetter, setCurrentRow, updateBoard } =
    //     useContext(AppContext).actions;

    const [board, setBoard] = useRecoilState(boardState);
    const [letters, setLetters] = useRecoilState(lettersState);
    const [allWords, setAllWords] = useRecoilState(allWordsState);
    const setBoardSelector = useSetRecoilState(invalidWordStateUpdateSelector);

    console.log(allWords);

    // Load all eligble words from txt file and save in state
    useEffect(() => {
        if (allWords.size <= 0) fetchAllWords().then((set) => setAllWords(set));
    }, []);

    useEffect(() => {
        // If 5 letters have been entered, check letters
        if (board.currentIndex != 0 && board.currentIndex % 5 == 0) {
            const current_word = [
                ...board.board.slice(board.currentIndex - 5, board.currentIndex),
            ].join('');

            // Entered word is not a valid word
            if (!allWords.has(current_word)) {
                showErrorToast('Not in word list');
                setBoardSelector((board) => board);
            }

            console.log(current_word);
        }
        console.log(board);
    }, [board]);

    const addLetter = (letter: string) => {
        console.log(letter);
        setBoard((oldBoard) => ({
            board: [
                ...oldBoard.board.slice(0, oldBoard.currentIndex),
                letter,
                ...oldBoard.board.slice(oldBoard.currentIndex + 1),
            ],
            currentIndex: oldBoard.currentIndex + 1,
        }));

        console.log(board.currentIndex);
        // Where the + 1 in this case is the currentRow
        // if (board.currentIndex === 4 + 1 * 5) {
        //     console.log('check row');
        // }
    };

    const handleKeyUp = ({ key }: KeyboardEvent) => {
        if (lettersList.includes(key)) {
            addLetter(key);
        }
    };

    useEventListener('keydown', handleKeyUp);

    return (
        <div className="app">
            <Header />
            <button onClick={() => setBoardSelector((board) => board)}>test</button>
            <Body />
            <ToastContainer />
            <Footer />
        </div>
    );
}

export default App;
