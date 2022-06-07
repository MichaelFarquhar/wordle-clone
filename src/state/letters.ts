import { atom } from 'recoil';

export interface ILetter {
    letter: string;
    status: boolean;
}

export interface ILetters {
    [key: string]: ILetter;
}

export const lettersState = atom<ILetters>({
    key: 'lettersState',
    default: {},
});
