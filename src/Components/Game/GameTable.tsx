import { useState } from "react";

import { IGame } from "../../Interfaces/IGame";
import { RowsName } from "../../Interfaces/EnumRows";

//Componentes
import Location from "./Location";
import InputCommands from "./InputCommands";
import ButtonResetGame from "./ButtonResetGame";
import DestroyedShips from "./DestroyedShips";

//hook personalizado
import usePlay from "../../hook/usePlay";
import "./GameTable.css";

interface Props {
  gameActually: IGame;
  setGameActually: any;
  resetGame: any;
}

const GameTable = ({ gameActually, setGameActually, resetGame }: Props) => {
  const {
    movements,
    setmovements,
    executeCommandsAttack,
    shipsDestroyed,
    gameOver,
    setShipsDestroyed,
    loading,
  } = usePlay(gameActually, setGameActually);

  const resetGameActually = async () => {
    const data: IGame = await resetGame();
    setGameActually(data);
    setmovements(Object.values(data.playerMovements));
    setShipsDestroyed(0);
  };

  let rows: number[] = [];

  for (let i = 0; i < 10; i++) {
    rows.push(i);
  }

  return (
    <div className="Game">
      {gameOver ? (
        <p>Felicidades has ganado el juego</p>
      ) : (
        <div className="container-actions">
          <InputCommands executeCommandsAttack={executeCommandsAttack} />
          <ButtonResetGame resetGame={resetGameActually} />
        </div>
      )}

      {loading && (
        <p>Enviando ataque, pronto impactará espera un momento...</p>
      )}
      <DestroyedShips totalShipsDestroyed={shipsDestroyed} />
      {gameActually.id && movements.length > 0 && (
        <div className="table-container">
          {rows.map((i) => (
            <div key={"row" + i}>
              {i === 0 && (
                <div className="columns-title">
                  {rows.map((j) => (
                    <p key={"column" + j}>{j + 1}</p>
                  ))}
                </div>
              )}
              <div className="row-container">
                <p>{RowsName[i]}</p>
                <div className="row">
                  {rows.map((j) => (
                    <Location
                      key={i + j}
                      idLocation={`${i} ${j}`}
                      movementData={movements[i][j]}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default GameTable;
