<template>
    <div class="flex flex-col flex-nowrap items-stretch gap-2">
        <SimpleGameStateView
                v-if="useTicTacToe.state !== null && useSession.session !== null"
                :state="useTicTacToe.state.state"
                :winner="useTicTacToe.state.winner"
                :turn="useTicTacToe.state.turn"
                :userId="useSession.session.user.id"
        />
        <div class="flex flex-row items-start">
            <GameField
                    :fields="fields"
                    :enableClick="isRunning && hasTurn"
                    :clickable="clickable"
                    @click="onClick"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'
import { useTicTacToeStore } from '@/stores/games/ticTacToe'
import { computed } from 'vue'
import { useSessionStore } from '@/stores/session'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import SimpleGameStateView from '@/components/app/games/lib/SimpleGameStateView.vue'
import { SimpleGameState } from '@/enums/simpleGameState'

const $q = useQuasar()
const i18n = useI18n()
const useSession = useSessionStore()
const useTicTacToe = useTicTacToeStore()

const hasTurn = computed(() => useSession.session?.user.id === useTicTacToe.state?.turn)
const isRunning = computed(() => useTicTacToe.state?.state === SimpleGameState.RUNNING)

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

function updateGameState() {
    useTicTacToe.loadState().catch(error =>
            $q.notify({
                message: `${i18n.t('failed_to_load_game_state')}: ${error}`,
                color: 'red',
            })
    )
}

useSession.initSSE((msg: MessageEvent<string>) => {
    if (['TIC_TAC_TOE move happened', 'session joined'].includes(msg.data)) {
        updateGameState()
    }
}, error => {
    $q.notify({
        message: i18n.t('failed_to_connect_for_automatic_updates'),
        color: 'red',
    })
})

updateGameState()
</script>