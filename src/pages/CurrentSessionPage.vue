<template>
    Current Session Token: {{ useSession.session?.sessionToken }}
</template>

<script setup lang="ts">
import { useSessionStore } from '@/stores/session'

const useSession = useSessionStore()
</script>