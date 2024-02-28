<template>
    <div class="flex flex-col gap-2">
        <button @click="useTicTacToe.loadState">TTT</button>
        <q-banner v-if="hasTurn" class="rounded bg-positive">
            {{ $t('its_your_turn') }}
        </q-banner>
        <q-banner v-else class="rounded bg-warning">
            {{ $t('wait_for_action_of_other_player') }}
        </q-banner>
        <GameField :fields="fields" :enableClick="hasTurn" :clickable="clickable" @click="onClick"/>
    </div>
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'
import { useTicTacToeStore } from '@/stores/games/ticTacToe'
import { computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useAutoRefresh } from '@/composables/autoRefresh'

const useSession = useSessionStore()
const useTicTacToe = useTicTacToeStore()

const hasTurn = computed(() => useSession.session?.user.id === useTicTacToe.state?.turn)

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

/*const fields = [
        ['x', 'circle', ' '],
        [' ', 'x', ' '],
        ['circle', 'circle', 'x'],
]*/

function clickable(item: string) {
    return item === ' '
}

function onClick({ x, y }: { x: number, y: number }) {
    console.log('clicked:', x, y)
    useTicTacToe.action(x, y).then(() =>
            useTicTacToe.loadState()
    )
}

useAutoRefresh(true, useTicTacToe.loadState, 3000)

/*useSession.initSSE(() => {
    console.log('sse update')
    useTicTacToe.loadState()
})

useTicTacToe.loadState()*/
</script>