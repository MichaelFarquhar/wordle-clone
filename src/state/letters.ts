import { atom } from 'recoil';

// export interface ILetter {
//     letter: string;
//     status: boolean;
// }

// export interface ILetters {
//     [key: string]: ILetter;
// }

// export const lettersState = atom<ILetters>({
//     key: 'lettersState',
//     default: {},
// });

export enum LetterStatus {
    DEFAULT,
    NONE,
    YELLOW,
    GREEN,
}

export const lettersStatusState = atom<LetterStatus[]>({
    key: 'lettersStatsState',
    default: Array(30).fill(LetterStatus.DEFAULT),
});
