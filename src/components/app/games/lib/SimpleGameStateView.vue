<template>
    <template v-if="isRunning">
        <q-banner v-if="hasTurn" class="rounded bg-primary text-white">
            {{ $t('its_your_turn') }}
        </q-banner>
        <q-banner v-else class="rounded bg-info text-white">
            {{ $t('wait_for_action_of_other_player') }}
        </q-banner>
    </template>
    <q-banner v-else-if="isDraw" class="rounded bg-warning text-white">
        {{ $t('no_winner') }}
    </q-banner>
    <template v-else-if="isDecided">
        <q-banner v-if="hasWon" class="rounded bg-positive text-white">
            {{ $t('you_won') }}
        </q-banner>
        <q-banner v-else class="rounded bg-negative text-white">
            {{ $t('you_lost') }}
        </q-banner>
    </template>
</template>

<script setup lang="ts">
import { SimpleGameState } from '@/enums/simpleGameState'
import { computed } from 'vue'

const props = defineProps<{
    userId: number
    winner: number | null
    turn: number
    state: SimpleGameState
}>()

const hasWon = computed(() => props.userId === props.winner)
const hasTurn = computed(() => props.userId === props.turn)

const isRunning = computed(() => props.state === SimpleGameState.RUNNING)
const isDraw = computed(() => props.state === SimpleGameState.DRAW)
const isDecided = computed(() => props.state === SimpleGameState.DECIDED)
</script>