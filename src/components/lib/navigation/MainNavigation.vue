<template>
    <Navigation>
        <NavigationItem :label="$t('home')" routeName="home"/>
        <NavigationItem v-if="useSession.session !== null" :label="$t('current_session')" routeName="session.current"/>
    </Navigation>
</template>

<script setup lang="ts">
import Navigation from '@/components/lib/navigation/Navigation.vue'
import NavigationItem from '@/components/lib/navigation/NavigationItem.vue'
import { useSessionStore } from '@/stores/session'

const useSession = useSessionStore()
</script>
