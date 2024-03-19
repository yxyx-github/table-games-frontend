import { defineStore } from 'pinia';
import { api } from '@/boot/axios'
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { ChessGame, ChessGameCastleAction, ChessGameMoveAction, ChessGamePromoteAction } from '@/types/games/chess'
import { ChessPieceType } from '@/enums/chess/chessPieceType'

export const useBattleshipsStore = defineStore('battleships', () => {
    const useSession = useSessionStore()

    const state = ref<any | null>(null)

    async function loadState() {
        return api.get<any>(`/battleships/chess/state?sessionToken=${useSession.session?.sessionToken}`).then(res => {
            state.value = res.data
        })
    }

    return {
    }
})