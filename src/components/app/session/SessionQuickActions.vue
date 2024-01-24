<template>
    <QuickActions>
        <q-btn color="primary" :label="$t('create_new_session')" @click="$router.push({ name: 'session.create' })"/>
        <q-btn color="primary" :label="$t('join_session')" @click="$router.push({ name: 'session.join' })"/>
    </QuickActions>
</template>

<script setup lang="ts">
import QuickActions from '@/components/lib/layouts/QuickActions.vue'
</script>
