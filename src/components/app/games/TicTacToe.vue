<template>
    TTT
    <GameField :fields="fields" :enableClick="true" :clickable="clickable" @click="onClick"/>
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

function onClick({ x, y }: { x: number, y: number }) {
    console.log('clicked:', x, y)
}
</script>