<template>
    <div class="flex flex-row flex-nowrap items-center justify-between bg-slate-200">
        <div class="flex flex-nowrap flex-row items-stretch justify-start">
            <slot name="start"/>
        </div>
        <div class="flex flex-nowrap flex-row items-stretch justify-end">
            <slot name="end"/>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
