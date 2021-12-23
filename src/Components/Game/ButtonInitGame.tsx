import React from "react";
import "./Button.css";
interface Props {
  initGame: () => void;
}

const ButtonInitGame = ({ initGame }: Props) => {
  return (
    <div>
      <button className="button-game" onClick={initGame}>
        <span> Init Game</span>
      </button>
    </div>
  );
};

export default ButtonInitGame;
