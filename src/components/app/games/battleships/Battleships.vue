<template>
    <div class="flex flex-col flex-nowrap items-stretch gap-2">
        Battleships {{ useBattleships.state?.gameState }}
        <div
                v-if="useBattleships.state !== null && useSession.session !== null"
                class="flex flex-row flex-wrap items-start gap-2"
        >
            <GameField :fields="playerBoard"
                       v-slot="{ item, x, y }"
                       :enableClick="useBattleships.state.gameState === BattleshipsGameState.PLACING"
                       :clickable="playerBoardClickable"
                       @click="onPlayerBoardClick"
                       :itemClass="(item, x, y) => itemClass('playerBoard', item, x, y)"
            >
                <Icon v-if="coordInsideField(x, y)" :name="item"/>
                <template v-else>
                    {{ item }}
                </template>
            </GameField>
            <GameField :fields="opponentBoard"
                       v-slot="{ item, x, y }"
                       :itemClass="(item, x, y) => itemClass('opponentBoard', item, x, y)"
                       @click="onOpponentBoardClick"
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

const $q = useQuasar()
const i18n = useI18n()
const useSession = useSessionStore()
const useBattleships = useBattleshipsStore()

const playerBoard = computed<string[][]>(() => prepareBoard('playerBoard'))
const opponentBoard = computed<string[][]>(() => prepareBoard('opponentBoard'))

function prepareBoard(boardName: BoardName) {
    return useBattleships.state === null ? [] :
            [
                [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', ' '],
                ...(useBattleships.state[boardName].map((row, index) => [
                            `${ index + 1 }`,
                            ...(row.map(field =>
                                    field === ShipStatus.HIT ? 'x' : ' '
                            )),
                            `${ index + 1 }`,
                        ]
                )),
                [' ', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', ' '],
            ]
}

function itemClass(boardName: BoardName, item: string, x: number, y: number) {
    if (!coordInsideField(x, y)) {
        return ''
    } else if (boardName === 'playerBoard' && selectedPlayerBoardField.value?.x === x && selectedPlayerBoardField.value?.y === y) {
        return 'bg-yellow-400'
    } else if (useBattleships.state?.[boardName][x - 1]?.[y - 1] === ShipStatus.EMPTY) {
        return 'bg-white'
    } else if (useBattleships.state?.[boardName][x - 1]?.[y - 1] === ShipStatus.MISS) {
        return 'bg-gray-200'
    } else {
        return 'bg-gray-400'
    }
}

function coordInsideField(x: number, y: number) {
    return x !== 0 && x !== 11 && y !== 0 && y !== 11
}

const selectedPlayerBoardField = ref<{ x: number, y: number } | null>(null)

function onPlayerBoardClick(field: { x: number, y: number }) {
    console.log('playerBoard clicked:', field)
    selectedPlayerBoardField.value = field
}

function onOpponentBoardClick(field: { x: number, y: number }) {
    console.log('opponentBoard clicked:', field)
}

function playerBoardClickable(item: string, x: number, y: number) {
    return coordInsideField(x, y);
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
    // TODO: add messages
    if (true || [''].includes(msg.data)) {
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