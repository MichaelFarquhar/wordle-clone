import React, { useRef } from 'react';
import { useBoardActions } from '../../hooks/useBoardActions';
import './Keyboard.scss';

interface Props {
    text: string;
    disabled: boolean;
}

const ButtonText = ({ text }: { text: string }) => {
    if (text === 'delete') {
        return (
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
                />
            </svg>
        );
    }

    return <>{text}</>;
};

const KeyboardButton = ({ text, disabled }: Props) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const { addLetter, removeLetter, checkEnteredWord } = useBoardActions();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        buttonRef.current?.blur();
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
            ref={buttonRef}
        >
            <ButtonText text={text} />
        </button>
    );
};

export default KeyboardButton;
