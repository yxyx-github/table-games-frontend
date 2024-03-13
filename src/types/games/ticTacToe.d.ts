import { TicTacToeGameState } from '@/enums/ticTacToeGameState'

export type TicTacToeGame = {
    board: number[][]
    turn: number
    state: TicTacToeGameState
    winner: number | null
}

export type TicTacToeGameAction = {
    sessionToken: string
    authToken: string
    userId: number
    x: number
    y: number
}