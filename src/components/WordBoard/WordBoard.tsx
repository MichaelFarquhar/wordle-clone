import { useRecoilValue } from 'recoil';
import { boardState } from '../../App';
import './Wordboard.scss';

const Wordboard = () => {
    const { board } = useRecoilValue(boardState);

    return (
        <section className="wordboard">
            {board.map((item) => (
                <div className="wordboard__letter">{item}</div>
            ))}
        </section>
    );
};

export default Wordboard;
