<template>
    <button @click="useTicTacToe.loadState">TTT</button>
    <GameField :fields="fields" :enableClick="true" :clickable="clickable" @click="onClick"/>
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'
import { useTicTacToeStore } from '@/stores/games/ticTacToe'
import { computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useAutoRefresh } from '@/composables/autoRefresh'

const useSession = useSessionStore()
const useTicTacToe = useTicTacToeStore()

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