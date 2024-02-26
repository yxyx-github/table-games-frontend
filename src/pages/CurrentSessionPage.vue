<template>
    <TicTacToe v-if="useSession.session?.game.name === GameName.TicTacToe"/>
    <q-banner v-else class="rounded bg-warning">
        {{ $t('game_not_implemented') }}
    </q-banner>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import TicTacToe from '@/components/app/session/current/TicTacToe.vue'
import { GameName } from '@/enums/gameName'

const useSession = useSessionStore()
</script>