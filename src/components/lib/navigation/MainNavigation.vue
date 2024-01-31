<template>
    <Navigation class="justify-between">
        <div class="flex flex-row items-stretch justify-start">
            <NavigationItem :label="$t('home')" routeName="home"/>
            <NavigationItem v-if="useSession.session !== null" :label="$t('current_session')" routeName="session.current"/>
        </div>
        <div class="flex flex-row items-stretch justify-end" v-if="useSession.session !== null">
            <q-btn-dropdown color="primary" flat :label="useSession.session.user.name">
                <q-list>
                    <q-item clickable v-close-popup @click="leaveSession">
                        <q-item-section>
                            <q-item-label>{{ $t('leave_session') }}</q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item v-if="useSession.session.user.host" clickable v-close-popup @click="closeSession">
                        <q-item-section>
                            <q-item-label>{{ $t('close_session') }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-btn-dropdown>
        </div>
    </Navigation>
</template>

<script setup lang="ts">
import Navigation from '@/components/lib/navigation/Navigation.vue'
import NavigationItem from '@/components/lib/navigation/NavigationItem.vue'
import { useSessionStore } from '@/stores/session'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const $q = useQuasar()
const i18n = useI18n()
const router = useRouter()
const useSession = useSessionStore()

function leaveSession() {
    useSession.leave()
    router.push({ name: 'home' })
    // TODO: Feedback-Messages
}

function closeSession() {
    $q.dialog({
        title: i18n.t('close_session'),
        message: i18n.t('close_session_confirm_message'),
        cancel: true,
    }).onOk(() => {
        useSession.close()
        router.push({ name: 'home' })
    })
    // TODO: Feedback-Messages
}
</script>
