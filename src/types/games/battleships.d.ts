import { ShipStatus } from '@/enums/battleships/shipStatus'
import { BattleshipsGameState } from '@/enums/battleships/battleshipsGameState'

export type BattleshipsGame = {
    playerBoard: ShipStatus[][]
    opponentBoard: ShipStatus[][]
    yourTurn: number
    gameState: BattleshipsGameState
    winner: number
}

export type BoardName = 'playerBoard' | 'opponentBoard'