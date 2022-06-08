import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import {
    canAddLetterSelector,
    canRemoveLetterSelector,
    canCheckRowSelector,
    boardState,
} from '../../App';
import './Keyboard.scss';

interface Props {
    text: string;
    disabled: boolean;
}

const KeyboardButton = ({ text, disabled }: Props) => {
    const setBoard = useSetRecoilState(boardState);

    const canAddLetter = useRecoilValue(canAddLetterSelector);
    const canRemoveLetter = useRecoilValue(canRemoveLetterSelector);
    const canCheckRow = useRecoilValue(canCheckRowSelector);

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

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const button: HTMLElement = event.currentTarget;
        const letter = button.innerHTML;

        switch (letter) {
            // If DELETE button is clicked
            case 'delete':
                removeLetter();
                break;
            // if ENTER button is clicked
            case 'enter':
                console.log('check row');
                break;
            // Otherwise a letter was clicked
            default:
                addLetter(letter);
                break;
        }
    };

    return (
        <button
            className={`keyboard__btn ${disabled ? 'keyboard__btn--disabled' : ''}`}
            onClick={(e) => handleClick(e)}
        >
            {text}
        </button>
    );
};

export default KeyboardButton;
