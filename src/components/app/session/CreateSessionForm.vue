<template>
    <CenteredContainer class="mb:min-w-full xs:min-w-96">
        <Form @submit.prevent="submit">
            <q-input v-model="hostUserName" :label="$t('username')"/>
            <q-select v-model="selectedGameOption" :options="gameOptions"/>
            <q-btn :disable="!valid" type="submit" color="primary" :label="$t('create_session')"/>
        </Form>
    </CenteredContainer>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { Game } from '@/types/game'
import { useGamesStore } from '@/stores/games'
import { useI18n } from 'vue-i18n'
import CenteredContainer from '@/components/lib/layouts/CenteredContainer.vue'
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import Form from '@/components/lib/forms/Form.vue'

const $q = useQuasar()
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
        useSession.create(hostUserName.value, selectedGame.value as Game).then(session =>
            router.push({ name: 'session.current' })
        ).catch(error =>
            $q.notify({
                message: `${i18n.t('failed_to_create_session')}: ${error}`,
                color: 'red',
            })
        )
    }
}

function init() {
    useGames.gameList().then(gameList => games.value = gameList).catch(error =>
            $q.notify({
                message: `${i18n.t('failed_to_load_game_list')}: ${error}`,
                color: 'red',
            })
    )
}

init()
</script>
