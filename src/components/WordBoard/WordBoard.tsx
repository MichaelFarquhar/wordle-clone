import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import './Wordboard.scss';

const Wordboard = () => {
    const { board } = useContext(AppContext).store;

    return (
        <section className="wordboard">
            {Array(30)
                .fill('')
                .map((item, index) => (
                    <div className="wordboard__letter">
                        {board && (board[index] || '')}
                    </div>
                ))}
        </section>
    );
};

export default Wordboard;
