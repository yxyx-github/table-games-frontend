<template>
    <span v-if="props.name !== ''" class="block font-inherit w-[1em] h-[1em]">
        <SvgIconLoader v-if="props.name !== ' '" :name="props.name"/>
    </span>
</template>

<script setup lang="ts">
import SvgIconLoader from '@/components/lib/icons/SvgIconLoader.vue'

const props = defineProps<{
    name: string,
}>()
</script>