<template>
    <div class="grow flex flex-col items-center justify-center">
        <div class="flex flex-col items-stretch justify-center gap-2" :="$attrs">
            <slot/>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false,
})
</script>
