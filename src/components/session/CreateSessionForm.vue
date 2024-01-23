<template>
    CreateSessionForm
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Game } from '@/types/game'
import { useGamesStore } from '@/stores/games'

const useGames = useGamesStore()

const games = ref<Game[]>([])

function init() {
    useGames.gameList().then(gameList => games.value = gameList)
}

init()
</script>
