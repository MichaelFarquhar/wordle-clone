import React from 'react';
import './Header.scss';
import { FaGithub } from 'react-icons/fa';

export const Header = () => {
    return (
        <header className="header">
            <div>{/* Spacing to center the title */}</div>
            <h1>Wordle</h1>
            <a
                href="https://github.com/MichaelFarquhar/wordle-clone"
                target="blank"
                rel="noopener noreferrer"
            >
                <FaGithub />
            </a>
        </header>
    );
};
