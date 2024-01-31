import { defineStore } from 'pinia';
import { api } from '@/boot/axios'
import { CreateSessionResponse, Session } from '@/types/session'
import { ref } from 'vue'

export const useSessionStore = defineStore('session', () => {
    async function create(hostUserName: string, gameName: string) {
        const sessionToken = ref<Session | null>(null)

        return api.post<CreateSessionResponse>('/session/create', {
            host: hostUserName,
            game: gameName,
        }).then(res =>
            sessionToken.value = res.data
        )
    }

    return {
        create,
    }
})
