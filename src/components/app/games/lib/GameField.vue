<template>
    <div
            class="grid border-t border-l border-gray-400"
            :style="`grid-template-columns: repeat(${colCount}, minmax(0, 1fr)); grid-template-rows: repeat(${rowCount}, minmax(0, 1fr));`"
    >
        <template v-for="(row, y) in props.fields">
            <div v-for="(item, x) in row" class="flex flex-row items-stretch justify-center border-r border-b border-gray-400">
                <GameFieldItem
                        :enableClick="props.enableClick"
                        :clickable="() => props.clickable(item, x, y)"
                        :class="props.itemClass(item, x, y)"
                        @click="emit('click', { x, y })"
                >
                    <slot :item="item" :x="x" :y="y">
                        <Icon :name="item"/>
                    </slot>
                </GameFieldItem>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import Icon from '@/components/lib/icons/Icon.vue'
import GameFieldItem from '@/components/app/games/lib/GameFieldItem.vue'
import { computed } from 'vue'

const emit = defineEmits<{
    'click': [{ x: number, y: number }],
}>()

const props = withDefaults(defineProps<{
    fields: string[][] // y, x
    enableClick?: boolean
    clickable?: (item: string, x: number, y: number) => boolean
    itemClass?: (item: string, x: number, y: number) => string
}>(), {
    enableClick: false,
    clickable: () => false,
    itemClass: () => '',
})

const rowCount = computed(() => props.fields.length)
const colCount = computed(() => props.fields[0]?.length)
</script>