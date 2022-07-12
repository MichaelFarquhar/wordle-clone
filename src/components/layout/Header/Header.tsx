import './Header.scss';
import { FaGithub } from 'react-icons/fa';

export const Header = () => {
    return (
        <header className="header">
            <div className="header__spacer" />
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
