interface Ships {
    [name: string]: number,
}
export interface IGame {
    id?: string,
    shipsPosition:object,
    uidPlayer:string,
    playerMovements: any,
    destroyedShips:Ships,
    status:boolean, //True en juego, false finalizado.
}