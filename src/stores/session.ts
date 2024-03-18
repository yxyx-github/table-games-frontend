import { defineStore } from 'pinia';
import { api, baseURL } from '@/boot/axios'
import { CreateSessionResponse, JoinSessionResponse, Session } from '@/types/session'
import { computed, ref } from 'vue'
import { Game } from '@/types/game'

export const useSessionStore = defineStore('session', () => {
    const sessionData = ref<Session | null>(null)

    const session = computed<Session | null>({
        get: () => sessionData.value,
        set: value => {
            localStorage.setItem('session', JSON.stringify(value))
            sessionData.value = value
        },
    })

    const sse = ref<EventSource | null>(null)

    function initSSE(handler: (msg: MessageEvent<string>) => void, error: (evt: Event) => void = () => {}) {
        sse.value = new EventSource(
            `${baseURL}/session/sse
            ?sessionToken=${encodeURIComponent(session.value?.sessionToken ?? '')}
            &authToken=${encodeURIComponent(session.value?.authToken ?? '')}`
        )
        sse.value.onmessage = handler
        sse.value.onerror = error
    }

    function loadFromStorage() {
        const rawStoreValue = localStorage.getItem('session')
        if (rawStoreValue !== null) {
            session.value = JSON.parse(rawStoreValue)
        }
    }

    async function create(hostUserName: string, game: Game) {
        return api.post<CreateSessionResponse>('/session/create', {
            host: hostUserName,
            game: game.name,
        }).then(res =>
            session.value = {
                sessionToken: res.data.sessionToken,
                authToken: res.data.authToken,
                user: {
                    id: res.data.userId,
                    name: hostUserName,
                    host: true,
                },
                game: game,
            }
        )
    }

    async function join(sessionToken: string, userName: string) {
        return api.post<JoinSessionResponse>('/session/join', {
            sessionToken: sessionToken,
            name: userName,
        }).then(res =>
            session.value = {
                sessionToken: sessionToken,
                authToken: res.data.authToken,
                user: res.data.user,
                game: res.data.game,
            }
        )
    }

    async function close() {
        if (session.value !== null) {
            return api.post('/session/close', {
                sessionToken: session.value.sessionToken,
                authToken: session.value.authToken,
            }).then(() =>
                leave()
            )
        }
    }

    function leave() {
        session.value = null
    }

    return {
        session,
        initSSE,
        loadFromStorage,
        create,
        join,
        close,
        leave,
    }
})
