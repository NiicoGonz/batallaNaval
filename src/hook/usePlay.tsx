import UserAuthContext from "Context/UserAuth/UserAuthContext";
import { useContext, useState } from "react";
import { firestore } from "../Firebase/config";
import { RowsName } from "../Interfaces/EnumRows";
import { IGame } from "../Interfaces/IGame";

const usePlay = (gameActually: IGame, setGameActually: any) => {

  const [loading, setLoading] = useState(false)
  const {  user } = useContext(UserAuthContext);

  const validateShipsDestroyed = (objectDestroyedShips:any):number => {
    const values = Object.values(objectDestroyedShips);
    const shipsDestroyed = values.filter( item => item === 4)
    return shipsDestroyed.length
  }

  const [shipsDestroyed, setShipsDestroyed] = useState<number>(validateShipsDestroyed(gameActually.destroyedShips));
  const [movements, setmovements] = useState<string[]>(
    Object.values(gameActually.playerMovements)
  );

  const [gameOver, setGameOver] = useState<boolean>(validateShipsDestroyed(gameActually.destroyedShips) === 5)

  /**
   * Metodo que formatea la entrada  de la fila en letras a valores numeros
   * @param letter
   * @returns
   */
  const valueLetters = (letter: string): number => {
    switch (letter) {
      case "A":
        return 0;
      case "B":
        return 1;
      case "C":
        return 2;
      case "D":
        return 3;
      case "E":
        return 4;
      case "F":
        return 5;
      case "G":
        return 6;
      case "H":
        return 7;
      case "I":
        return 8;
      case "J":
        return 9;
    }
    return -1;
  };

  /**
   * Metodo que valid si la posicion a la cual se envio el comando
   * ya tiene un valor de un ataque o si esta vacio
   * @param row
   * @param col
   * @returns  true:si no existen ataques, false: si existen ataques.
   */
  const emptyPosition = (row: number, col: number): boolean => {
    return gameActually.playerMovements[row][col] === "";
  };

  const findShip = (objects: any, array2: string[]): string => {
    for (const key in objects) {
      if (array2 === objects[key]) {
        return key;
      }
    }
    return "error";
  };



  //TODO: Manejar errores a firestore
  /**
   * Metodo que se ejecutada cuando se inicia un ataque, valid si ya habia un ataque,
   * envia ataques nuevas y segun donde realice el ataque valida si le dio a un barco
   * y almacena la informacion en la base de datos.
   * @param command : string de posiciones del ataque en formato (A0, B5, C10 ...etc)
   */
  const executeCommandsAttack = async (command: string) => {
    setLoading(true);
    const positionsCommands: string[] = command.split("");
    const rowPosition = positionsCommands[0].toUpperCase();
    let colPosition = 0;
    if (positionsCommands.length === 3) {
      colPosition =
        parseInt(`${positionsCommands[1]}${positionsCommands[2]}`) - 1;
    } else {
      colPosition = parseInt(positionsCommands[1]) - 1;
    }
    if (emptyPosition(valueLetters(rowPosition), colPosition)) {
      if (positionsCommands.length <= 3) {
        if (rowPosition in RowsName) {
          if (colPosition >= 0 && colPosition <= 9) {
            const shipsPosition = Object.values(gameActually.shipsPosition);
            const objectDestroyedShips = gameActually.destroyedShips
            let cantShipsDestroyed = 0
            let destroyedShip: boolean = false;
            const attackPositionPlayer: string = `${valueLetters(
              rowPosition
            )} ${colPosition}`;
            for (let i = 0; i < shipsPosition.length; i++) {
              for (let j = 0; j < shipsPosition[i].length; j++) {
                if (shipsPosition[i][j] === attackPositionPlayer) {
                  destroyedShip = true;
                  const nameFindShip = findShip(
                    gameActually.shipsPosition,
                    shipsPosition[i]
                  );
                  let cantPositionsDestroyed:number = objectDestroyedShips[`${nameFindShip}`];
                  objectDestroyedShips[`${nameFindShip}`] =  cantPositionsDestroyed + 1
                  cantShipsDestroyed = validateShipsDestroyed(objectDestroyedShips)
                  setShipsDestroyed(cantShipsDestroyed)
                  try {
                    await firestore
                      .collection("Games")
                      .doc(gameActually.id)
                      .update({
                        destroyedShips: 
                        objectDestroyedShips,
                      });
                  } catch (error: any) {
                    setLoading(false)
                    console.log(error.message);
                  }
                }
              }
            }
            let attackInFirestore: string[] = [
              gameActually.playerMovements[valueLetters(rowPosition)],
            ];
            let newRow: string[] = [];
            if (destroyedShip === true) {
              for (let i = 0; i < attackInFirestore[0].length; i++) {
                if (i === colPosition) {
                  newRow.push("X");
                } else {
                  newRow.push(attackInFirestore[0][i]);
                }
              }
            } else {
              for (let i = 0; i < attackInFirestore[0].length; i++) {
                if (i === colPosition) {
                  newRow.push("O");
                } else {
                  newRow.push(attackInFirestore[0][i]);
                }
              }
            }
            try {
              await firestore
                .collection("Games")
                .doc(gameActually.id)
                .update({
                  [`playerMovements.${valueLetters(rowPosition)}`]: newRow,
                });

              const cloneGameActually = gameActually;
              cloneGameActually.playerMovements[valueLetters(rowPosition)] =
                newRow;
              if(cantShipsDestroyed === 5) {
               
                await firestore
                .collection("Games")
                .doc(gameActually.id)
                .update({
                  status: false,
                });
                await firestore
                .collection("User")
                .doc(user.uid)
                .update({
                  victories: user.victories+1 ,
                });
                setGameOver(true)
                cloneGameActually.status = false
                alert('Felicidades le ha dado al ultimo barco, el tablero se borrara para que inice un nuevo juego')
              }
              setGameActually({...cloneGameActually, destroyedShip: objectDestroyedShips});
              setmovements(Object.values(gameActually.playerMovements));
            } catch (error: any) {
              setLoading(false)
              alert("Ah ocurrido un error " + error.message);
            }
          } else {
            alert("Error en columnas");
          }
        } else {
          alert("Error en filas");
        }
      } else {
        alert("Cantidad de caracteres invalidos");
      }
    } else {
      alert("Este campo ya fue atacado");
    }
    setLoading(false)
  };

  return {
    valueLetters,
    movements,
    setmovements,
    emptyPosition,
    executeCommandsAttack,
    shipsDestroyed,
    gameOver,
    setShipsDestroyed,
    loading,
  };
};

export default usePlay;
