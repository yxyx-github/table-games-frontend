export enum GameName {
    TicTacToe = 'TIC_TAC_TOE',
}

export type Game = {
    name: GameName,
    minPlayerCount: number,
    maxPlayerCount: number,
}

export type GamesGeneralListResponse = {
    games: Game[],
}
