import React from 'react';
import './Keyboard.scss';

interface Props {
    text: string;
    disabled: boolean;
}

const KeyboardButton = ({ text, disabled }: Props) => {
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const button: HTMLElement = event.currentTarget;
        console.log(button.innerHTML);
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
