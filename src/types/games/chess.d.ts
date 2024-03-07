import { ChessPiece } from '@/enums/chessPiece'
import { GameAction } from '@/types/game'
import { ChessPieceType } from '@/enums/chessPieceType'
import { SimpleGameState } from '@/enums/simpleGameState'

export type ChessGame = {
    board: (ChessPiece | null)[][]
    turn: number
    state: SimpleGameState
    winner: number | null
}

export type ChessGameMoveAction = GameAction | {
    fromX: number
    fromY: number
    toX: number
    toY: number
}

export type ChessGamePromoteAction = ChessGameMoveAction | {
    promoteTo: ChessPieceType
}

export type ChessGameCastleAction = GameAction | {
    kingside: boolean
}