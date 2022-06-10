import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { fetchAllWords, winningWordState } from '../state/allWords';
import { boardState } from '../state/board';
import { gameEndState, gameWinState } from '../state/game';
import { lettersStatusState } from '../state/letters';

// Full reset the game to defaults
export const useResetGame = () => {
    const resetBoard = useResetRecoilState(boardState);
    const resetEndGameFlag = useResetRecoilState(gameEndState);
    const resetGameWinFlag = useResetRecoilState(gameWinState);
    const resetLettersStatus = useResetRecoilState(lettersStatusState);

    const setWinningWord = useSetRecoilState(winningWordState);

    const resetGame = () => {
        // Generate a new random word
        fetchAllWords().then((arr) => {
            const winningWord = arr[Math.floor(Math.random() * arr.length)];
            setWinningWord(winningWord);

            // Reset everything else needed
            resetBoard();
            resetEndGameFlag();
            resetGameWinFlag();
            resetLettersStatus();
        });
    };

    return resetGame;
};
