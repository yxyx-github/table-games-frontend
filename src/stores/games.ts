import { defineStore } from 'pinia';
import { Game, GamesGeneralListResponse } from '@/types/game'
import { api } from '@/boot/axios'

export const useGamesStore = defineStore('games', () => {
    async function gameList(): Promise<Game[]> {
        return api.get<GamesGeneralListResponse>('/games/general/list').then(res =>
            res.data.games
        )
    }

    return {
        gameList,
    }
})