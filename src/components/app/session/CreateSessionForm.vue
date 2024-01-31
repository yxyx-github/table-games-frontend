<template>
    <QuickActions class="mb:min-w-full xs:min-w-96">
        <q-input v-model="hostUserName" :label="$t('username')"/>
        <q-select v-model="selectedGameOption" :options="gameOptions"/>
        <q-btn @click="submit" :disable="!valid" type="submit" color="primary" :label="$t('create_session')"/>
    </QuickActions>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Game } from '@/types/game'
import { useGamesStore } from '@/stores/games'
import { useI18n } from 'vue-i18n'
import QuickActions from '@/components/lib/layouts/QuickActions.vue'
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'

const i18n = useI18n()
const router = useRouter()
const useGames = useGamesStore()
const useSession = useSessionStore()

const hostUserName = ref<string>('')
const games = ref<Game[]>([])
const selectedGame = computed<Game | null>(() => games.value.find(game => game.name === selectedGameOption.value?.value ?? '') ?? null)

const gameOptions = computed<{ label: string, value: string }[]>(() =>
        games.value.map(game =>
                ({
                    label: `${game.name} (${game.minPlayerCount === game.maxPlayerCount ? '' : `${game.minPlayerCount} - `}${game.maxPlayerCount} ${i18n.t('players')})`,
                    value: game.name,
                })
        )
)
const selectedGameOption = ref<{ label: string, value: string } | null>(null)

const valid = computed<boolean>(() => selectedGame.value !== null && hostUserName.value !== '')

function submit() {
    if (valid.value) {
        useSession.create(hostUserName.value, selectedGame.value?.name ?? '').then(session =>
            router.push({ name: 'session.current' })
        )
    }
    // TODO: Feedback-Message in case of error
}

function init() {
    useGames.gameList().then(gameList => games.value = gameList)
    // TODO: Feedback-Message in case of error
}

init()
</script>
