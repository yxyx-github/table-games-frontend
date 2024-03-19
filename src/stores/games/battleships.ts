import { defineStore } from 'pinia';
import { api } from '@/boot/axios'
import { ref } from 'vue'
import { useSessionStore } from '@/stores/session'
import { BattleshipsAttackAction, BattleshipsGame, BattleshipsPlaceShipAction } from '@/types/games/battleships'
import { ShipType } from '@/enums/battleships/shipType'

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
        })
    }

    async function placeShip(x: number, y: number, isHorizontal: boolean, shipType: ShipType) {
        return api.post<BattleshipsPlaceShipAction, void>('/games/battleships/placeShip', {
            sessionToken: useSession.session?.sessionToken,
            authToken: useSession.session?.authToken,
            userId: useSession.session?.user.id,
            x,
            y,
            shipType,
            isHorizontal,
        })
    }

    async function attack(x: number, y: number) {
        return api.post<BattleshipsAttackAction, void>('/games/battleships/attack', {
            sessionToken: useSession.session?.sessionToken,
            authToken: useSession.session?.authToken,
            userId: useSession.session?.user.id,
            x,
            y,
        })
    }

    return {
        state,
        loadState,
        placeShip,
        attack,
    }
})