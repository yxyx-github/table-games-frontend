<template>
    <div class="flex flex-col flex-nowrap items-stretch gap-2">
        Chess
        <div class="flex flex-row items-start">
            <GameField :fields="board"
                       v-slot="{ item, x, y }"
                       enableClick
                       :clickable="() => true"
                       :itemClass="(_, x, y) => x !== 0 && x !== 9 && y !== 0 && y !== 9 && (x % 2 === 0 ^ y % 2 === 0) ? 'bg-gray-400' : 'bg-white'"
            >
                <Icon v-if="x !== 0 && x !== 9 && y !== 0 && y !== 9" :name="item"/>
                <template v-else>
                    {{ item }}
                </template>
            </GameField>
        </div>
        <!-- TODO: insert attribution for icons -->
    </div>
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'
import Icon from '@/components/lib/icons/Icon.vue'
import { computed } from 'vue'

const board = computed(() =>
        [
            ['', '1', '2', '3', '4', '5', '6', '7', '8', ''],
            ...(fields.map((row, index) => {
                const letter = String.fromCharCode((fields.length - 1 - index) + 65)
                return [letter, ...row, letter]
            })),
            ['', '1', '2', '3', '4', '5', '6', '7', '8', ''],
        ]
)

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