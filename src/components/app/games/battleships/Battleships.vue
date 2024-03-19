<template>
    Battleships
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useBattleshipsStore } from '@/stores/games/battleships'

const $q = useQuasar()
const i18n = useI18n()
const useSession = useSessionStore()
const useBattleships = useBattleshipsStore()

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