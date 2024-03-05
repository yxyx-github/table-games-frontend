import { defineStore } from 'pinia';
import { api } from '@/boot/axios'
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { ChessGame, ChessGameMoveAction, ChessGamePromoteAction } from '@/types/games/chess'
import { ChessPieceType } from '@/enums/chessPieceType'

export const useChessStore = defineStore('chess', () => {
    const useSession = useSessionStore()

    const state = ref<ChessGame | null>(null)

    async function loadState() {
        return api.get<ChessGame>(`/games/chess/state?sessionToken=${useSession.session?.sessionToken}`).then(res => {
            state.value = res.data
        })
    }

    async function move(fromX: number, fromY: number, toX: number, toY: number, promoteTo?: ChessPieceType) {
        return api.post<ChessGameMoveAction | ChessGamePromoteAction, void>(`/games/chess/${promoteTo === undefined ? 'move' : 'promote'}`, {
            sessionToken: useSession.session?.sessionToken,
            authToken: useSession.session?.authToken,
            userId: useSession.session?.user.id,
            fromX,
            fromY,
            toX,
            toY,
            promoteTo,
        })
    }

    return {
        state,
        loadState,
        move,
    }
})