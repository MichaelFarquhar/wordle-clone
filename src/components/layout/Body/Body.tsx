import './Body.scss';
import Keyboard from '../../Keyboard/Keyboard';
import Wordboard from '../../WordBoard/WordBoard';

export const Body = () => {
    return (
        <main className="main">
            <Wordboard />
            <Keyboard />
        </main>
    );
};
