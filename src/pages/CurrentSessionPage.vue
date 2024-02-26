<template>
    Current Session Token: {{ useSession.session?.sessionToken }}
    <TicTacToe v-if="useSession.session?.game.name === GameName.TicTacToe"/>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import TicTacToe from '@/components/app/session/current/TicTacToe.vue'
import { GameName } from '@/enums/gameName'

const useSession = useSessionStore()
</script>