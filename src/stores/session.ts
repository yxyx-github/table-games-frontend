import { defineStore } from 'pinia';
import { api } from '@/boot/axios'
import { CreateSessionResponse, Session } from '@/types/session'
import { computed, ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
    const sessionData = ref<Session | null>(null)

    const session = computed<Session | null>({
        get: () => sessionData.value,
        set: value => {
            localStorage.setItem('session', JSON.stringify(value))
            sessionData.value = value
        },
    })

    function loadFromStorage() {
        const rawStoreValue = localStorage.getItem('session')
        if (rawStoreValue !== null) {
            session.value = JSON.parse(rawStoreValue)
            console.log('loaded from storage:', session.value)
        }
    }

    async function create(hostUserName: string, gameName: string) {
        return api.post<CreateSessionResponse>('/session/create', {
            host: hostUserName,
            game: gameName,
        }).then(res =>
            session.value = res.data
        )
    }

    return {
        session,
        loadFromStorage,
        create,
    }
})
