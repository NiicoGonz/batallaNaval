import React from 'react'
import {ReactComponent as Boat} from './boat.svg'
import './Destroyedship.css'
interface Props {
    totalShipsDestroyed:number
}
const DestroyedShips = ({totalShipsDestroyed}:Props) => {
    return (
        <div>
            <h2 className='title-center'>Barcos destruidos: {totalShipsDestroyed} <Boat/> </h2>
        </div>
    )
}

export default DestroyedShips;

