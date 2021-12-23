interface Props {
    resetGame:() => void
}
const ButtonResetGame = ({resetGame}:Props) => {
    return (
            <button className="button-game" onClick={resetGame}>
                <span>Reset Game</span> 
                </button>
    )
}

export default ButtonResetGame
