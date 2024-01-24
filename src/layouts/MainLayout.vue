<template>
    <div class="flex no-wrap flex-col items-stretch w-screen h-screen">
        <MainNavigation/>
        <div class="flex flex-col h-full grow shrink overflow-auto">
            <RouterView/>
        </div>
    </div>
</template>

<script setup lang="ts">
import MainNavigation from '@/components/lib/navigation/MainNavigation.vue'
</script>
