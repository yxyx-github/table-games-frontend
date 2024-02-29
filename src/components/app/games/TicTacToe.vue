<template>
    <div class="flex flex-col gap-2">
        <template v-if="isRunning">
            <q-banner v-if="hasTurn" class="rounded bg-primary text-white">
                {{ $t('its_your_turn') }}
            </q-banner>
            <q-banner v-else class="rounded bg-info text-white">
                {{ $t('wait_for_action_of_other_player') }}
            </q-banner>
        </template>
        <q-banner v-else-if="isDraw" class="rounded bg-warning text-white">
            {{ $t('no_winner') }}
        </q-banner>
        <template v-else-if="isDecided">
            <q-banner v-if="hasWon" class="rounded bg-positive text-white">
                {{ $t('you_won') }}
            </q-banner>
            <q-banner v-else class="rounded bg-negative text-white">
                {{ $t('you_lost') }}
            </q-banner>
        </template>
        <GameField
                :fields="fields"
                :enableClick="isRunning && hasTurn"
                :clickable="clickable"
                @click="onClick"
        />
    </div>
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'
import { useTicTacToeStore } from '@/stores/games/ticTacToe'
import { computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { TicTacToeGameState } from '@/enums/ticTacToeGameState'

const useSession = useSessionStore()
const useTicTacToe = useTicTacToeStore()

const hasWon = computed(() => useSession.session?.user.id === useTicTacToe.state?.winner)
const hasTurn = computed(() => useSession.session?.user.id === useTicTacToe.state?.turn)

const isRunning = computed(() => useTicTacToe.state?.state === TicTacToeGameState.RUNNING)
const isDraw = computed(() => useTicTacToe.state?.state === TicTacToeGameState.DRAW)
const isDecided = computed(() => useTicTacToe.state?.state === TicTacToeGameState.DECIDED)

const fields = computed<string[][]>(() =>
        useTicTacToe.state?.board.map(
                row => row.map(
                        field => field === -1 ? ' ' : (
                                field === useSession.session?.user.id
                                        ? 'x'
                                        : 'circle'
                        )
                )
        )
        ?? []
)

function clickable(item: string) {
    return item === ' '
}

function onClick({ x, y }: { x: number, y: number }) {
    useTicTacToe.action(x, y).then(() =>
            useTicTacToe.loadState()
    )
}

useSession.initSSE((msg: MessageEvent<string>) => {
    if (msg.data === 'TIC_TAC_TOE move happened') {
        useTicTacToe.loadState()
    }
})

useTicTacToe.loadState()
</script>