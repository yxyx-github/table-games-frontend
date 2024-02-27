<template>
    <div class="flex flex-row items-start justify-start">
        <div class="flex flex-col flex-nowrap items-start justify-start border-t border-l border-gray-400">
            <div class="flex flex-row flex-nowrap items-start justify-start border-b border-gray-400" v-for="row in props.fields">
                <div class="w-4 h-4 border-r border-gray-400" v-for="item in row">
                    {{ item }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{
    fields: string[][] // y, x
}>()
</script>