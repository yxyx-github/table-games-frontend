import { TicTacToeGameState } from '@/enums/ticTacToeGameState'
import { GameAction } from '@/types/game'

export type TicTacToeGame = {
    board: number[][]
    turn: number
    state: TicTacToeGameState
    winner: number | null
}

export type TicTacToeGameAction = GameAction | {
    x: number
    y: number
}