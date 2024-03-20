import { GameAction } from '@/types/game'
import { SimpleGameState } from '@/enums/simpleGameState'

export type TicTacToeGame = {
    board: number[][]
    turn: number
    state: SimpleGameState
    winner: number | null
}

export type TicTacToeGameAction = GameAction | {
    x: number
    y: number
}