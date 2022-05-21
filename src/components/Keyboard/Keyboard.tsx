import KeyboardRow from './KeyboardRow';
import './Keyboard.scss';

const Keyboard = () => {
    const rowOneLetters = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
    const rowTwoLetters = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
    const rowThreeLetters = ['enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'delete'];

    return (
        <section className="keyboard">
            <KeyboardRow rowLetters={rowOneLetters} />
            <KeyboardRow rowLetters={rowTwoLetters} />
            <KeyboardRow rowLetters={rowThreeLetters} />
        </section>
    );
};

export default Keyboard;
