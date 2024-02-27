<template>
    TTT
    <GameField :fields="fields"/>
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'

const fields = [
        ['x', 'circle', ' '],
        [' ', 'x', ' '],
        ['circle', 'circle', 'x'],
]
</script>