import { atom } from 'recoil';

// True when the game is ended, either by a loss or a win.
export const gameEndState = atom<boolean>({
    key: 'gameEndState',
    default: false,
});

// True if the game has been won, false if lost
export const gameWinState = atom<boolean>({
    key: 'gameWinState',
    default: false,
});
