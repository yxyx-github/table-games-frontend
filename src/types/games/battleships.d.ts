import { ShipStatus } from '@/enums/battleships/shipStatus'
import { BattleshipsGameState } from '@/enums/battleships/battleshipsGameState'
import { GameAction } from '@/types/game'

export type BattleshipsGame = {
    playerBoard: ShipStatus[][]
    opponentBoard: ShipStatus[][]
    yourTurn: number
    gameState: BattleshipsGameState
    winner: number
}

export type BoardName = 'playerBoard' | 'opponentBoard'

export type BattleshipsPlaceShipAction = GameAction & {
    x: number
    y: number
    shipType: number
    isHorizontal: boolean
}