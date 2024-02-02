<template>
    <CenteredContainer>
        <q-btn color="primary" :label="$t('create_new_session')" @click="$router.push({ name: 'session.create' })"/>
        <q-btn color="primary" :label="$t('join_session')" @click="$router.push({ name: 'session.join' })"/>
    </CenteredContainer>
</template>

<script setup lang="ts">
import CenteredContainer from '@/components/lib/layouts/CenteredContainer.vue'
</script>
