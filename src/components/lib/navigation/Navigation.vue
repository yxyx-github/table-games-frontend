<template>
    <q-bar class="justify-between">
        <div class="flex flex-row items-stretch justify-start">
            <slot name="start"/>
        </div>
        <div class="flex flex-row items-stretch justify-end">
            <slot name="end"/>
        </div>
    </q-bar>
</template>

<script setup lang="ts">
</script>
