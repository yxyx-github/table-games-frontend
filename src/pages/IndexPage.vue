<template>
    <div class="grow flex flex-row items-center justify-center">
        <q-btn color="primary" :label="$t('create_new_session')" @click="$router.push({ name: 'session.create' })"/>
    </div>
</template>

<script setup lang="ts">
</script>
