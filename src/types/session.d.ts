import { Game } from '@/types/game'
import { User } from '@/types/user'

export type Session = {
    sessionToken: string,
    authToken: string,
    user: User
    game: Game,
}

export type CreateSessionResponse = {
    sessionToken: string
    authToken: string
    userId: number
}

export type JoinSessionResponse = {
    authToken: string
    user: User
    game: Game
}