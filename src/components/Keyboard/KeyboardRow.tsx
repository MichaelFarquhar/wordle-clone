import React from "react";
import KeyboardButton from "./KeyboardButton";
import "./Keyboard.scss";

interface Props {
  letters: Array<string>;
}

const KeyboardRow = ({ letters }: Props) => {
  return (
    <div className="keyboard__row">
      {letters?.map((letter: string, id: number) => (
        <KeyboardButton text={letter} key={id} disabled={false} />
      ))}
    </div>
  );
};

export default KeyboardRow;
