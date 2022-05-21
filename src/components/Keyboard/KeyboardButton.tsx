import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import './Keyboard.scss';

interface Props {
    text: string;
    disabled: boolean;
}

const KeyboardButton = ({ text, disabled }: Props) => {
    const { setCurrentGuess } = useContext(AppContext).actions;

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();

        const button: HTMLElement = event.currentTarget;
        setCurrentGuess((guess: string[]) => [...guess, button.innerHTML]);
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
