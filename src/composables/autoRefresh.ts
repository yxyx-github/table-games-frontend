import type { MaybeRefOrGetter } from 'vue'
import { onMounted, onUnmounted, ref, toValue, watch } from 'vue'

export function useAutoRefresh(enable: MaybeRefOrGetter<boolean>, cb: () => void, delay: number = 100) {
    const timeoutID = ref<NodeJS.Timeout | null>(null)

    watch(() => toValue(enable), value => {
        if (value && timeoutID.value === null) {
            loadNext()
        }
    })

    function loadNext() {
        if (toValue(enable)) {
            cb()
            timeoutID.value = setTimeout(loadNext, delay) // TODO: add setting
        } else {
            timeoutID.value = null
        }
    }

    function stop() {
        if (timeoutID.value !== null) {
            clearTimeout(timeoutID.value)
            timeoutID.value = null
        }
    }

    onMounted(loadNext)

    onUnmounted(stop)
}