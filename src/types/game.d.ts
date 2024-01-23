export enum GameName {
    TicTacTow = 'TIC_TAC_TOE',
}

export type Game = {
    name: GameName,
    minPlayerCount: number,
    maxPlayerCount: number,
}

export type GamesGeneralListResponse = {
    games: Game[],
}
