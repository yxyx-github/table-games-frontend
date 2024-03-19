<template>
    <div class="flex flex-col flex-nowrap items-stretch gap-2">
        Battleships {{ useBattleships.state?.gameState }} {{ useBattleships.state?.yourTurn ? 'has Turn' : 'wait' }}
        <div
                v-if="useBattleships.state !== null && useSession.session !== null"
                class="flex flex-row flex-wrap items-start gap-2"
        >
            <GameField
                    class="grid-flow-col"
                    :fields="playerBoard"
                    v-slot="{ item, x, y }"
                    :enableClick="useBattleships.state.gameState === BattleshipsGameState.PLACING"
                    :clickable="playerBoardClickable"
                    @click="({ x, y }) => onPlayerBoardClick({ y: x, x: y })"
                    :itemClass="(item, x, y) => itemClass('playerBoard', item, y, x)"
            >
                <Icon v-if="coordInsideField(x, y)" :name="item"/>
                <template v-else>
                    {{ item }}
                </template>
            </GameField>
            <GameField
                    class="grid-flow-col"
                    :fields="opponentBoard"
                    v-slot="{ item, x, y }"
                    :enableClick="useBattleships.state.gameState === BattleshipsGameState.ATTACKING && useBattleships.state?.yourTurn"
                    :clickable="opponentBoardClickable"
                    @click="({ x, y }) => onOpponentBoardClick({ y: x, x: y })"
                    :itemClass="(item, x, y) => itemClass('opponentBoard', item, y, x)"
            >
                <Icon v-if="coordInsideField(x, y)" :name="item"/>
                <template v-else>
                    {{ item }}
                </template>
            </GameField>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useBattleshipsStore } from '@/stores/games/battleships'
import { computed, ref } from 'vue'
import Icon from '@/components/lib/icons/Icon.vue'
import GameField from '@/components/app/games/lib/GameField.vue'
import { ShipStatus } from '@/enums/battleships/shipStatus'
import { BattleshipsGameState } from '@/enums/battleships/battleshipsGameState'
import { BoardName } from '@/types/games/battleships'
import { ShipType } from '@/enums/battleships/shipType'

const $q = useQuasar()
const i18n = useI18n()
const useSession = useSessionStore()
const useBattleships = useBattleshipsStore()

const playerBoard = computed<string[][]>(() => prepareBoard('playerBoard'))
const opponentBoard = computed<string[][]>(() => prepareBoard('opponentBoard'))

function prepareBoard(boardName: BoardName) {
    return useBattleships.state === null ? [] :
            [
                [' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', ' '],
                ...(useBattleships.state[boardName].map((row, index) => [
                            `${ String.fromCharCode(index + 65) }`,
                            ...(row.map(field =>
                                    [ShipStatus.HIT, ShipStatus.MISS].includes(field) ? 'x' : ' '
                            )),
                            `${String.fromCharCode(index + 65) }`,
                        ]
                )),
                [' ', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', ' '],
            ]
}

/*function prepareBoard(boardName: BoardName) {
    return useBattleships.state === null ? [] :
            [
                [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', ' '],
                ...(useBattleships.state[boardName].map((row, index) => [
                            `${ index + 1 }`,
                            ...(row.map(field =>
                                    [ShipStatus.HIT, ShipStatus.MISS].includes(field) ? 'x' : ' '
                            )),
                            `${ index + 1 }`,
                        ]
                )),
                [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', ' '],
            ]
}*/

function itemClass(boardName: BoardName, item: string, x: number, y: number) {
    if (!coordInsideField(x, y)) {
        return ''
    } else if (boardName === 'playerBoard' && selectedPlayerBoardField.value?.x === x && selectedPlayerBoardField.value?.y === y) {
        return 'bg-yellow-400'
    } else if (
            ([ShipStatus.EMPTY, ShipStatus.MISS] as (ShipStatus | undefined)[])
                    .includes(useBattleships.state?.[boardName][x - 1]?.[y - 1])
    ) {
        return 'bg-white'
    } else {
        return 'bg-gray-400'
    }
}

function coordInsideField(x: number, y: number) {
    return x !== 0 && x !== 11 && y !== 0 && y !== 11
}

const selectedPlayerBoardField = ref<{ x: number, y: number } | null>(null)

function onPlayerBoardClick(field: { x: number, y: number }) {
    if (selectedPlayerBoardField.value === null) {
        selectedPlayerBoardField.value = field
    } /*else if (selectedPlayerBoardField.value.x === field.x && selectedPlayerBoardField.value.y === field.y) {
        selectedPlayerBoardField.value = null // TODO improve field selection, fix clearing
    }*/ else if (field.x === selectedPlayerBoardField.value.x || field.y === selectedPlayerBoardField.value.y) {
        const isHorizontal = field.y === selectedPlayerBoardField.value.y
        const startField: { x: number, y: number } = isHorizontal ? (
                field.x > selectedPlayerBoardField.value.x
                        ? selectedPlayerBoardField.value
                        : field
        ) : (
                field.y > selectedPlayerBoardField.value.y
                        ? selectedPlayerBoardField.value
                        : field
        )
        const size = Math.abs(
                isHorizontal
                        ? field.x - selectedPlayerBoardField.value.x
                        : field.y - selectedPlayerBoardField.value.y
        ) + 1
        const shipType: ShipType | null = shipSizeToShipType(size)
        if (shipType === null) {
            $q.notify({
                message: i18n.t('invalid_ship_type'),
                color: 'red',
            })
        } else {
            selectedPlayerBoardField.value = null
            useBattleships.placeShip(startField.x - 1, startField.y - 1, isHorizontal, shipType).catch(error =>
                    $q.notify({
                        message: `${i18n.t('failed_to_place_ship')}: ${error}`,
                        color: 'red',
                    })
            )
        }
    } else {
        $q.notify({
            message: i18n.t('ships_cannot_be_placed_diagonal'),
            color: 'red',
        })
    }
}

function onOpponentBoardClick(field: { x: number, y: number }) {
    useBattleships.attack(field.x - 1, field.y - 1).catch(error =>
            $q.notify({
                message: `${i18n.t('failed_to_attack')}: ${error}`,
                color: 'red',
            })
    )
}

function playerBoardClickable(item: string, x: number, y: number) {
    return coordInsideField(x, y); // TODO: check if field is ship or has ship as neighbour
}

function opponentBoardClickable(item: string, x: number, y: number) {
    return coordInsideField(x, y); // TODO: check if field was already attacked
}

function shipSizeToShipType(size: number): ShipType | null {
    switch (size) {
        case 1:
            return ShipType.DESTROYER
        case 2:
            return ShipType.SUBMARINE
        case 3:
            return ShipType.CRUISER
        case 4:
            return ShipType.BATTLESHIP
        case 5:
            return ShipType.CARRIER
        default:
            return null
    }
}

function updateGameState() {
    useBattleships.loadState().catch(error => {
        if (error.response.status === 425) {
            $q.notify({
                message: `${i18n.t('game_has_not_started_yet')}: ${error}`,
                color: 'warning',
            })
        } else {
            throw error
        }
    }).catch(error =>
            $q.notify({
                message: `${i18n.t('failed_to_load_game_state')}: ${error}`,
                color: 'red',
            })
    )
}

useSession.initSSE((msg: MessageEvent<string>) => {
    if (['BATTLESHIPS ship placed', 'BATTLESHIPS attack happened', 'session joined'].includes(msg.data)) {
        updateGameState()
    }
}, () => {
    $q.notify({
        message: i18n.t('failed_to_connect_for_automatic_updates'),
        color: 'red',
    })
})

updateGameState()
</script>