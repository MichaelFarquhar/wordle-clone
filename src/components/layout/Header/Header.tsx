import React from 'react';
import styles from './Header.module.css';
import { FaGithub } from 'react-icons/fa';

export const Header = () => {
    return (
        <div className={styles.header}>
            <div>{/* Spacing to center the title */}</div>
            <h1>Wordle</h1>
            <a
                href="https://github.com/MichaelFarquhar/wordle-clone"
                target="blank"
                rel="noopener noreferrer"
            >
                <FaGithub />
            </a>
        </div>
    );
};
