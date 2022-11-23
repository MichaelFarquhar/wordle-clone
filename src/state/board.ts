import { atom, DefaultValue, selector } from 'recoil';

export interface IBoard {
    board: string[];
    currentIndex: number;
    currentRow: number;
}

// The backend of the board state
export const boardState = atom<IBoard>({
    key: 'boardState',
    default: {
        board: Array(30).fill(''),
        currentIndex: 0,
        currentRow: 0,
    },
});

// Will clear the current row of the board if the word entered was not a valid word
export const clearRowSelector = selector<IBoard>({
    key: 'clearRowSelector',
    get: ({ get }) => ({ ...get(boardState) }),
    set: ({ set }, oldBoard) => {
        set(
            boardState,
            oldBoard instanceof DefaultValue
                ? {
                      board: Array(30).fill(''),
                      currentIndex: 0,
                      currentRow: 0,
                  }
                : {
                      ...oldBoard,
                      board: [
                          ...oldBoard.board.slice(0, oldBoard.currentIndex - 5),
                          ...Array(30 - (oldBoard.currentIndex - 5)).fill(''),
                      ],
                      currentIndex: oldBoard.currentIndex - 5,
                  }
        );
        // console.log(oldBoard);
    },
});
