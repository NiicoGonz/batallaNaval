import { useEffect, useState } from "react";
import { firestore } from "../Firebase/config";
import { IGame } from "../Interfaces/IGame";
import { IUserAuth } from "../Interfaces/IUserAuth";

enum Orientation {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
}

const useFirestoreGames = (user: IUserAuth) => {
  const initialState: IGame = {
    id: "",
    shipsPosition: {},
    uidPlayer: "",
    playerMovements: {},
    destroyedShips: {},
    status: true,
  };
  const [games, setGames] = useState<IGame[]>([]);
  const [gameActually, setGameActually] = useState<IGame>(initialState);

  /**
   * Metodo que crea un arreglo con las posiciones de un barco segun su orientacion y posiciones iniciales
   * @param positionInitialRow
   * @param positionInitialColum
   * @param orientation
   * @returns Arreglo de string con las posiciones separados por espacio definido el primero como la fila y el segundo como la columna
   */
  const generateShip = (
    positionInitialRow: number,
    positionInitialColum: number,
    orientation: number
  ): string[] => {
    const positionShip = [];
    if (orientation === Orientation.Up) {
      for (let i = positionInitialRow; i >= positionInitialRow - 3; i--) {
        positionShip.push(i + " " + positionInitialColum);
      }
    } else if (orientation === Orientation.Down) {
      for (let i = positionInitialRow; i <= positionInitialRow + 3; i++) {
        positionShip.push(i + " " + positionInitialColum);
      }
    } else if (orientation === Orientation.Right) {
      for (let i = positionInitialColum; i <= positionInitialColum + 3; i++) {
        positionShip.push(positionInitialRow + " " + i);
      }
    } else if (orientation === Orientation.Left) {
      for (let i = positionInitialColum; i >= positionInitialColum - 3; i--) {
        positionShip.push(positionInitialRow + " " + i);
      }
    }
    return positionShip;
  };

  /**
   * Metodo que valida si el barco que se va a añadir se cruza con algun otro barco ya creado
   * @param positions
   * @param locateShip
   * @returns false: Si se cruza para no crearlo, true: si no se cruza es valido para añadir
   */
  const validatePosition = (
    positions: Array<string[]>,
    locateShip: string[]
  ): boolean => {
    if (positions.length === 0) return true;
    for (let i = 0; i < positions.length; i++) {
      for (let j = 0; j < positions[i].length; j++) {
        for (let k = 0; k < locateShip.length; k++) {
          if (locateShip[k] === positions[i][j]) {
            return false;
          }
        }
      }
    }
    return true;
  };

  /**
   * Metodo recursivo que crea la cantidad de barcos que se envia por parametro y los crea en posiciones aleatorioas en una matriz de  10x10 iniciando en posicion 0
   * @param positions
   * @param totalShips
   * @returns positions: Matriz con las posiciones de los barcos ubicados
   */
  const generatePositionRandom = (
    positions: Array<string[]>,
    totalShips: number
  ): Array<string[]> => {
    const positionInitialRow = Math.floor(Math.random() * 10);
    const positionInitialColumns = Math.floor(Math.random() * 10);
    if (totalShips !== 0) {
      let locateShip: string[] = []; //Localizar barcos
      const randomOrientation: Orientation = Math.floor(Math.random() * 4);
      if (randomOrientation === Orientation.Up) {
        if (positionInitialRow - 3 < 0)
          generatePositionRandom(positions, totalShips);
        else {
          locateShip = generateShip(
            positionInitialRow,
            positionInitialColumns,
            randomOrientation
          );
          if (validatePosition(positions, locateShip)) {
            positions.push(locateShip);
            generatePositionRandom(positions, totalShips - 1);
          } else {
            generatePositionRandom(positions, totalShips);
          }
        }
      } else if (randomOrientation === Orientation.Down) {
        if (positionInitialRow + 3 > 9)
          generatePositionRandom(positions, totalShips);
        else {
          locateShip = generateShip(
            positionInitialRow,
            positionInitialColumns,
            randomOrientation
          );
          if (validatePosition(positions, locateShip)) {
            positions.push(locateShip);
            generatePositionRandom(positions, totalShips - 1);
          } else {
            generatePositionRandom(positions, totalShips);
          }
        }
      } else if (randomOrientation === Orientation.Left) {
        if (positionInitialColumns - 3 < 0)
          generatePositionRandom(positions, totalShips);
        else {
          locateShip = generateShip(
            positionInitialRow,
            positionInitialColumns,
            randomOrientation
          );
          if (validatePosition(positions, locateShip)) {
            positions.push(locateShip);
            generatePositionRandom(positions, totalShips - 1);
          } else {
            generatePositionRandom(positions, totalShips);
          }
        }
      } else if (randomOrientation === Orientation.Right) {
        if (positionInitialColumns + 3 > 9)
          generatePositionRandom(positions, totalShips);
        else {
          locateShip = generateShip(
            positionInitialRow,
            positionInitialColumns,
            randomOrientation
          );
          if (validatePosition(positions, locateShip)) {
            positions.push(locateShip);
            generatePositionRandom(positions, totalShips - 1);
          } else {
            generatePositionRandom(positions, totalShips);
          }
        }
      }
    }
    return positions;
  };

  /**
   * Metodo que genera un objeto donde las llaves son las filas y dentro tiene un array que representa
   * las columnas para poder simular el tablero, se inicia vacios, pero se llenara con X si al lanzar ahi hay un barco
   * y O si no se le da a ningun barco
   * @return  playerMovements:
   */
  const generatePlayerMovements = (): any => {
    const playerMovements: any = {};
    for (let i = 0; i < 10; i++) {
      playerMovements[i] = ["", "", "", "", "", "", "", "", "", ""];
    }
    return playerMovements;
  };

  /**
   * Metodo que inicia un juego en firestore
   */
  const initGame = async () => {
    try {
      const isActived = games.find((game) => game.status === true);
      if (!isActived) {
        const newGame = generateDataEmptyShip();
        const refGame = await firestore.collection("Games").add(newGame);
        let newGames = [...games, newGame];
        setGames(newGames);
        setGameActually({...newGame, id:refGame.id});
      } else {
        console.log("ya hay un juego activo, para empezar uno nuevo debe terminarlo o haga click en Reset Game");
      }
      console.log("finis");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  /**
   * Metodo para crear un nuevo juego vacio
   * @returns IGame: objeto vacio con la data del juego en valores iniciales
   */
  const generateDataEmptyShip = ():IGame => {
    const playerMovements = generatePlayerMovements();
    const initialValuesDestroyed = 0;
    const positionsInit: Array<string[]> = [];
    const initialPositionShips = generatePositionRandom(positionsInit, 5);
    const newGame: IGame = {
      shipsPosition: {
        ship1: initialPositionShips[0],
        ship2: initialPositionShips[1],
        ship3: initialPositionShips[2],
        ship4: initialPositionShips[3],
        ship5: initialPositionShips[4],
      },
      uidPlayer: user.uid,
      playerMovements: playerMovements,
      destroyedShips: {
        ship1: initialValuesDestroyed,
        ship2: initialValuesDestroyed,
        ship3: initialValuesDestroyed,
        ship4: initialValuesDestroyed,
        ship5: initialValuesDestroyed,
      },
      status: true,
    };
    return newGame
  }

  /**
   * Obtienes los juegos de un usuario y verifica si hay un juego  activo
   */
  const getGamesByUser = async () => {
    const gamesByUser = await firestore
      .collection("Games")
      .where("uidPlayer", "==", user?.uid)
      .get();
      console.log(gamesByUser.docs.length);
    const data: IGame[] = [];
    for (const doc of gamesByUser.docs) {
      data.push({
        shipsPosition: doc.data().shipsPosition,
        uidPlayer: doc.data().uidPlayer,
        playerMovements: doc.data().playerMovements,
        destroyedShips: doc.data().destroyedShips,
        status: doc.data().status,
        id: doc.id,
      });
    }
    setGames(data);
    const tempgameActually:IGame | undefined =  data.find(item => item.status)
    if(tempgameActually === undefined) {
      setGameActually(initialState);
    }else {
      setGameActually(tempgameActually);
    }

  };

  /**
   * Actualia el estado el ultimo juego activo
   * @returns 
   */
  const resetGame = async ():Promise<IGame> => {
    try {
      const newGame = generateDataEmptyShip();
      await firestore.collection("Games").doc(gameActually.id).set(newGame);
      let newGames = [...games];
      const findIndexGameActually = newGames.findIndex((game) => game.id == gameActually.id)
      newGames[findIndexGameActually] = {...newGame, id: gameActually.id}
      setGames(newGames);
      return {...newGame,id: gameActually.id}
    } catch (error:any) {
      return error.message      
    }
  }

  useEffect(() => {
    getGamesByUser();
  }, []);
  return {
    getGamesByUser,
    initGame,
    games,
    setGames,
    gameActually,
    setGameActually,
    resetGame,
  };
};

export { useFirestoreGames };
