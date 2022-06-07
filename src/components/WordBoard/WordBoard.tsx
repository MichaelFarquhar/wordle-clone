import { useRecoilValue } from 'recoil';
import { boardState } from '../../App';
import './Wordboard.scss';

const Wordboard = () => {
    const { board } = useRecoilValue(boardState);

    return (
        <section className="wordboard">
            {board.map((item, index) => (
                <div className="wordboard__letter" key={index}>
                    {item}
                </div>
            ))}
        </section>
    );
};

export default Wordboard;
