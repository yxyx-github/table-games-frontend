<template>
    <div class="flex flex-row items-start justify-start">
        <div class="flex flex-col flex-nowrap items-start justify-start border-t border-l border-gray-400">
            <div class="flex flex-row flex-nowrap items-start justify-start border-b border-gray-400" v-for="(row, y) in props.fields">
                <div class="flex flex-row items-start justify-start border-r border-gray-400" v-for="(item, x) in row">
                    <GameFieldItem :enableClick="props.enableClick" :clickable="() => props.clickable(item, x, y)">
                        <Icon :name="item"/>
                    </GameFieldItem>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/lib/icons/Icon.vue'
import GameFieldItem from '@/components/app/games/lib/GameFieldItem.vue'

const props = withDefaults(defineProps<{
    fields: string[][] // y, x
    enableClick?: boolean
    clickable?: (item: string, x: number, y: number) => boolean
}>(), {
    enableClick: false,
    clickable: () => false,
})
</script>