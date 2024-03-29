<template>
    <Navigation>
        <template #start>
            <NavigationItem :label="$t('home')" routeName="home"/>
            <NavigationItem v-if="useSession.session !== null" :label="$t('current_session')" routeName="session.current"/>
        </template>
        <template #end v-if="useSession.session !== null">
            <q-btn-dropdown color="primary" flat :label="useSession.session.user.name">
                <q-list>
                    <q-item clickable v-close-popup @click="copySessionToken" :title="$t('click_to_copy')">
                        <q-item-section>
                            <q-item-label>
                                {{ $t('session_token') }}: {{ useSession.session?.sessionToken }}
                            </q-item-label>
                        </q-item-section>
                    </q-item>
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
        </template>
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

function copySessionToken() {
    if (useSession.session !== null) {
        navigator.clipboard.writeText(useSession.session.sessionToken)
        $q.notify({
            message: i18n.t('copied'),
            color: 'green',
        })
    }
}

function leaveSession() {
    useSession.leave()
    router.push({ name: 'home' })
}

function closeSession() {
    $q.dialog({
        title: i18n.t('close_session'),
        message: i18n.t('close_session_confirm_message'),
        cancel: true,
    }).onOk(() => {
        useSession.close().then(() =>
                router.push({ name: 'home' })
        ).catch(error =>
                $q.notify({
                    message: `${i18n.t('failed_to_close_session')}: ${error}`,
                    color: 'red',
                })
        )
    })
}
</script>
