<template>
    <component
            :is="props.enableClick ? h('button', { disabled: !isClickable }) : h('div')"
            @click="props.enableClick && isClickable && emit('click')"
            class="grow p-1 flex flex-row items-center justify-center focus:outline focus:outline-1 focus:outline-black text-black disabled:text-black text-xl text-center"
    >
        <slot/>
    </component>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'

const emit = defineEmits(['click'])

const props = withDefaults(defineProps<{
    enableClick?: boolean
    clickable?: () => boolean
}>(), {
    enableClick: false,
    clickable: () => false,
})

const isClickable = computed(() => props.clickable())
</script>