import KeyboardButton from './KeyboardButton';
import './Keyboard.scss';

interface Props {
    rowLetters: string[];
}

const KeyboardRow = ({ rowLetters }: Props) => {
    return (
        <div className="keyboard__row">
            {rowLetters.map((letter, index) => (
                <KeyboardButton text={letter} key={index} disabled={false} />
            ))}
        </div>
    );
};

export default KeyboardRow;
