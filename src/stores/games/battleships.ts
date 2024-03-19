import { defineStore } from 'pinia';
import { api } from '@/boot/axios'
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { ChessGame, ChessGameCastleAction, ChessGameMoveAction, ChessGamePromoteAction } from '@/types/games/chess'
import { ChessPieceType } from '@/enums/chess/chessPieceType'
import { BattleshipsGame } from '@/types/games/battleships'

export const useBattleshipsStore = defineStore('battleships', () => {
    const useSession = useSessionStore()

    const state = ref<BattleshipsGame | null>(null)

    async function loadState() {
        return api.get<BattleshipsGame>(
            `/games/battleships/state?sessionToken=${
                encodeURIComponent(useSession.session?.sessionToken ?? '')
            }&authToken=${
                encodeURIComponent(useSession.session?.authToken ?? '')
            }&userId=${
                encodeURIComponent(useSession.session?.user.id ?? '')
            }`
        ).then(res => {
            state.value = res.data
            console.log(state.value)
        })
    }

    return {
        state,
        loadState,
    }
})