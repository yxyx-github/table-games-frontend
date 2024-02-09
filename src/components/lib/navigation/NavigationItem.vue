<template>
    <q-btn color="primary" :flat="!isCurrent" :outline="isCurrent" :label="props.label" @click="$router.push({ name: props.routeName })"/>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { computed } from 'vue'

const props = defineProps<{
    label: string
    routeName: string
}>()

const router = useRouter()

const isCurrent = computed<boolean>(() => router.currentRoute.value.name === props.routeName)
</script>
