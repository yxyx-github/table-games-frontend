import { GameName } from '@/enums/gameName'

export type Game = {
    name: GameName,
    minPlayerCount: number,
    maxPlayerCount: number,
}

export type GamesGeneralListResponse = {
    games: Game[],
}

export type GameAction = {
    sessionToken: string
    authToken: string
    userId: number
}