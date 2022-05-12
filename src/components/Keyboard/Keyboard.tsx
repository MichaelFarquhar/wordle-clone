import React from 'react';
import KeyboardRow from './KeyboardRow';
import './Keyboard.scss';

const Keyboard = () => {
    const rowOneLetters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
    const rowTwoLetters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
    const rowThreeLetters = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DELETE'];

    return (
        <section className="keyboard">
            <KeyboardRow letters={rowOneLetters} />
            <KeyboardRow letters={rowTwoLetters} />
            <KeyboardRow letters={rowThreeLetters} />
        </section>
    );
};

export default Keyboard;
