import React from 'react';
import { useBoardActions } from '../../hooks/useBoardActions';
import './Keyboard.scss';

interface Props {
    text: string;
    disabled: boolean;
}

const KeyboardButton = ({ text, disabled }: Props) => {
    const { addLetter, removeLetter, checkEnteredWord } = useBoardActions();

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
                checkEnteredWord();
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
