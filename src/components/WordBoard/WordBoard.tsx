import { useRecoilValue } from 'recoil';
import { boardState } from '../../state/board';
import { lettersStatusState } from '../../state/letters';
import './Wordboard.scss';

const Wordboard = () => {
    const { board } = useRecoilValue(boardState);
    const lettersStatus = useRecoilValue(lettersStatusState);

    return (
        <div className="wordboard-container">
            <section className="wordboard">
                {board.map((item, index) => {
                    return (
                        <div
                            className={`wordboard__letter status${lettersStatus[index]}`}
                            key={index}
                        >
                            {item}
                        </div>
                    );
                })}
            </section>
        </div>
    );
};

export default Wordboard;
