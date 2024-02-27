<template>
    TTT
    <GameField :fields="fields"/>
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'

const fields = [
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['i', 'h', 'i'],
]
</script>