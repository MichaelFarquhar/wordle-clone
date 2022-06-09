import { selector, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { boardState, clearRowSelector } from '../state/board';
import { allWordsState, winningWordState } from '../state/allWords';
import { lettersStatusState, LetterStatus } from '../state/letters';
import { showErrorToast } from '../utils/showErrorToast';

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

export const useBoardActions = () => {
    const [board, setBoard] = useRecoilState(boardState);
    const allWords = useRecoilValue(allWordsState);
    const clearRow = useSetRecoilState(clearRowSelector);
    const winningWord = useRecoilValue(winningWordState);
    const setLettersStatus = useSetRecoilState(lettersStatusState);

    const canAddLetter = useRecoilValue(canAddLetterSelector);
    const canRemoveLetter = useRecoilValue(canRemoveLetterSelector);
    const canCheckRow = useRecoilValue(canCheckRowSelector);

    // ADD LETTER TO BOARD
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

    // REMOVE LETTER FROM BOARD
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

    const checkEnteredWord = () => {
        if (canCheckRow) {
            const current_word = [
                ...board.board.slice(board.currentIndex - 5, board.currentIndex),
            ].join('');

            // Entered word is not a valid word
            if (!allWords.has(current_word)) {
                showErrorToast('Not in word list');
                clearRow((board) => board);
            }
            // Word is a valid word, we perform letter checking
            else {
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

    return { addLetter, removeLetter, checkEnteredWord };
};
