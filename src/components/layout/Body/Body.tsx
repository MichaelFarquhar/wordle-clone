import React from 'react';
import Keyboard from '../../Keyboard/Keyboard';
import './Body.scss';

import { useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import Wordboard from '../../WordBoard/WordBoard';

export const Body = () => {
    const context = useContext(AppContext);
    console.log(context);

    return (
        <main className="main">
            <Wordboard />
            <Keyboard />
        </main>
    );
};
