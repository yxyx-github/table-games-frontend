import { defineStore } from 'pinia';
import { api } from '@/boot/axios'
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { ChessGame } from '@/types/games/chess'

export const useChessStore = defineStore('chess', () => {
    const useSession = useSessionStore()

    const state = ref<ChessGame | null>(null)

    async function loadState() {
        return api.get<ChessGame>(`/games/chess/state?sessionToken=${useSession.session?.sessionToken}`).then(res => {
            state.value = res.data
        })
    }

    return {
        state,
        loadState,
    }
})