import { useContext, useState } from "react";
import ButtonInitGame from "../../Components/Game/ButtonInitGame";
import GameTable from "../../Components/Game/GameTable";
import UserAuthContext from "../../Context/UserAuth/UserAuthContext";
import { useFirestoreGames } from "../../hook/useFirestoreGames";
import Layout from "../../Layout";

const Home = () => {
  const { user } = useContext(UserAuthContext);

  const { initGame, gameActually, setGameActually, resetGame } =
    useFirestoreGames(user);

  return (
    <Layout>
      <div>
        {gameActually.id !== "" ? (
          <GameTable
            resetGame={resetGame}
            gameActually={gameActually}
            setGameActually={setGameActually}
          />
        ) : (
          <div>
            <ButtonInitGame initGame={initGame} />
            <p>No hay ningun juego activo.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
