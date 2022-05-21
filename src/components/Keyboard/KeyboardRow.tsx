import { useContext } from 'react';
import KeyboardButton from './KeyboardButton';
import './Keyboard.scss';
import { AppContext } from '../../context/AppContext';

interface Props {
    rowLetters: string[];
}

const KeyboardRow = ({ rowLetters }: Props) => {
    const { letters } = useContext(AppContext).store;
    // console.log(letters);

    return (
        <div className="keyboard__row">
            {letters &&
                rowLetters?.map((letter: string, id: number) => (
                    <KeyboardButton
                        text={letters.get(letter)?.letter || ''}
                        key={id}
                        disabled={false}
                    />
                ))}
        </div>
    );
};

export default KeyboardRow;
