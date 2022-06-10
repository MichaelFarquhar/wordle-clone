import React, { FC, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
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

    // Checks for when the game has ended and opens the modal
    useEffect(() => {
        console.log('hey');
        if (gameHasEnded) {
            setIsOpen(true);
        }
    }, [gameHasEnded]);

    const closeModal = () => {
        // setGameHasEnded(false);
        setIsOpen(false);
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
                        <div>{playerHasWon ? 'Win!' : 'Lose!'}</div>
                        <div>
                            {playerHasWon
                                ? 'Win!'
                                : 'The winning word was: ' + winningWord}
                        </div>
                        <button className="close-button" onClick={() => closeModal()}>
                            Close
                        </button>
                    </div>
                </div>
            </>
        </>
    );
};
