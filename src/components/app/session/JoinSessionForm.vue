<template>
    <CenteredContainer class="mb:min-w-full xs:min-w-96">
        <Form @submit.prevent="submit">
            <q-input v-model="sessionToken" :label="$t('session_token')"/>
            <q-input v-model="userName" :label="$t('username')"/>
            <q-btn :disable="!valid" type="submit" color="primary" :label="$t('join_session')"/>
        </Form>
    </CenteredContainer>
</template>

<script setup lang="ts">
import Form from '@/components/lib/forms/Form.vue'
import CenteredContainer from '@/components/lib/layouts/CenteredContainer.vue'
import { computed, ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { Game } from '@/types/game'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const $q = useQuasar()
const i18n = useI18n()
const router = useRouter()
const useSession = useSessionStore()

const sessionToken = ref<string>('')
const userName = ref<string>('')

const valid = computed<boolean>(() => sessionToken.value !== '' && userName.value !== '')

function submit() {
    if (valid.value) {
        useSession.join(sessionToken.value, userName.value).then(session =>
                router.push({ name: 'session.current' })
        ).catch(error =>
                $q.notify({
                    message: `${i18n.t('failed_to_join_session')}: ${error}`,
                    color: 'red',
                })
        )
    }
}
</script>