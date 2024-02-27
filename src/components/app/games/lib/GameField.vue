<template>
    <div class="flex flex-row items-start justify-start">
        <div class="flex flex-col flex-nowrap items-start justify-start border-t border-l border-gray-400">
            <div class="flex flex-row flex-nowrap items-start justify-start border-b border-gray-400" v-for="row in props.fields">
                <div class="aspect-square w-full p-1 border-r border-gray-400 text-xl" v-for="item in row">
                    <Icon :name="item"/>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/lib/icons/Icon.vue'

const props = defineProps<{
    fields: string[][] // y, x
}>()
</script>