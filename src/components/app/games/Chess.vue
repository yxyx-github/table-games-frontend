<template>
    Chess
    <GameField :fields/>
    <!-- TODO: insert attribution for icons -->
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'

const fields = [
    [
        'chess-rook-d',
        'chess-knight-d',
        'chess-bishop-d',
        'chess-queen-d',
        'chess-king-d',
        'chess-bishop-d',
        'chess-knight-d',
        'chess-rook-d',
    ], [
        'chess-pawn-d',
        'chess-pawn-d',
        'chess-pawn-d',
        'chess-pawn-d',
        'chess-pawn-d',
        'chess-pawn-d',
        'chess-pawn-d',
        'chess-pawn-d',
    ], [
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ], [
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ], [
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ], [
        ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ',
    ], [
        'chess-pawn-l',
        'chess-pawn-l',
        'chess-pawn-l',
        'chess-pawn-l',
        'chess-pawn-l',
        'chess-pawn-l',
        'chess-pawn-l',
        'chess-pawn-l',
    ], [
        'chess-rook-l',
        'chess-knight-l',
        'chess-bishop-l',
        'chess-queen-l',
        'chess-king-l',
        'chess-bishop-l',
        'chess-knight-l',
        'chess-rook-l',
    ],
]
</script>