<template>
    <TicTacToe v-if="useSession.session?.game.name === GameName.TicTacToe"/>
    <Chess v-else-if="useSession.session?.game.name === GameName.Chess"/>
    <Battleships v-else-if="useSession.session?.game.name === GameName.Battleships"/>
    <q-banner v-else class="rounded bg-warning">
        {{ $t('game_not_implemented') }}
    </q-banner>
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'
import TicTacToe from '@/components/app/games/ticTacToe/TicTacToe.vue'
import { GameName } from '@/enums/gameName'
import Chess from '@/components/app/games/chess/Chess.vue'
import Battleships from '@/components/app/games/battleships/Battleships.vue'

const useSession = useSessionStore()
</script>