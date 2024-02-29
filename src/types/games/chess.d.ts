import { ChessPiece } from '@/enums/chessPiece'
import { ChessGameState } from '@/enums/chessGameState'

export type ChessGame = {
    board: ChessPiece[]
    turn: number
    state: ChessGameState
    winner: number | null
}