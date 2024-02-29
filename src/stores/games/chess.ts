import { defineStore } from 'pinia';
import { api } from '@/boot/axios'
import { TicTacToeGame, TicTacToeGameAction } from '@/types/games/ticTacToe'
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'

export const useChessStore = defineStore('chess', () => {
    const useSession = useSessionStore()

    const state = ref<TicTacToeGame | null>(null)

    async function loadState() {
        return api.get<TicTacToeGame>(`/games/tictactoe/state?sessionToken=${useSession.session?.sessionToken}`).then(res => {
            state.value = res.data
        })
    }

    async function action(x: number, y: number) {
        return api.post<TicTacToeGameAction, void>('/games/tictactoe/action', {
            sessionToken: useSession.session?.sessionToken,
            authToken: useSession.session?.authToken,
            userId: useSession.session?.user.id,
            // frontend requires y coordinate first for rendering, therefor actions have to swap coordinates in order to be consistent (mapping the board itself would be much harder)
            x: y,
            y: x,
        })
    }

    return {
        state,
        loadState,
        action,
    }
})