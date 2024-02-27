<template>
    TTT
    <GameField :fields="fields" :enableClick="true" :clickable="clickable"/>
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'

const fields = [
        ['x', 'circle', ' '],
        [' ', 'x', ' '],
        ['circle', 'circle', 'x'],
]

function clickable(item: string) {
    return item === ' '
}
</script>