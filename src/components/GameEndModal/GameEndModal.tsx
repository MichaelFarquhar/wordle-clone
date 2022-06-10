import React, { FC, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useResetGame } from '../../hooks/useResetGame';
import { winningWordState } from '../../state/allWords';
import { gameEndState, gameWinState } from '../../state/game';

import './GameEndModal.scss';

const ModalTitle = (hasWon: boolean) => {
    return <h1>You Have {hasWon ? 'Won' : 'Lost'}</h1>;
};

export const GameEndModal: FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [gameHasEnded, setGameHasEnded] = useRecoilState(gameEndState);
    const playerHasWon = useRecoilValue(gameWinState);
    const winningWord = useRecoilValue(winningWordState);
    const resetGame = useResetGame();

    // Checks for when the game has ended and opens the modal
    useEffect(() => {
        if (gameHasEnded) {
            setIsOpen(true);
        }
    }, [gameHasEnded]);

    const closeModal = () => {
        // setGameHasEnded(false);
        setIsOpen(false);

        // Give time for the modal animation to finish
        setTimeout(function () {
            resetGame();
        }, 250);
    };

    return (
        <>
            <>
                <div className={`modal-window ${isOpen ? 'visible' : ''}`}>
                    <div>
                        <h1>
                            You Have{' '}
                            {playerHasWon ? (
                                <span className="win">Won</span>
                            ) : (
                                <span className="loss">Lost</span>
                            )}
                        </h1>
                        <div>
                            {playerHasWon
                                ? 'Press the button to generate a new word.'
                                : 'The winning word was ' + winningWord.toUpperCase()}
                        </div>
                        <button className="modal-button" onClick={() => closeModal()}>
                            New Game
                        </button>
                    </div>
                </div>
            </>
        </>
    );
};
