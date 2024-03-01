<template>
    <div class="flex flex-col flex-nowrap items-stretch gap-2">
        Chess
        <div class="flex flex-row items-start">
            <GameField :fields="usedBoard"
                       v-slot="{ item, x, y }"
                       enableClick
                       :clickable="() => true"
                       :itemClass="(_, x, y) => x !== 0 && x !== 9 && y !== 0 && y !== 9 && (x % 2 === 0 ^ y % 2 === 0) ? 'bg-gray-400' : 'bg-white'"
            >
                <Icon v-if="x !== 0 && x !== 9 && y !== 0 && y !== 9" :name="item"/>
                <template v-else>
                    {{ item }}
                </template>
            </GameField>
        </div>
        <!-- TODO: insert attribution for icons -->
    </div>
</template>

<script setup lang="ts">
import GameField from '@/components/app/games/lib/GameField.vue'
import Icon from '@/components/lib/icons/Icon.vue'
import { computed } from 'vue'
import { useChessStore } from '@/stores/games/chess'
import { ChessPiece } from '@/enums/chessPiece'
import { useSessionStore } from '@/stores/session'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

const $q = useQuasar()
const i18n = useI18n()
const useSession = useSessionStore()
const useChess = useChessStore()

const board = computed<string[][]>(() => useChess.state === null ? [] :
        [
            ['', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', ''],
            ...(useChess.state.board.map((row, index) => [
                    `${ index + 1 }`,
                    ...(row.map(field =>
                            field === null ? ' ' : chessPieceToIconName(field)
                    )),
                    `${ index + 1 }`,
                ]
            )),
            ['', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', ''],
        ]
)
const reversedBoard = computed<string[][]>(() => board.value.toReversed().map(row => row.toReversed()))

const usedBoard = computed<string[][]>(() => useSession.session?.user.host ? reversedBoard.value : board.value)

function chessPieceToIconName(piece: ChessPiece): string {
    switch (piece) {
        case ChessPiece.BLACK_KING:
            return 'chess-king-d'
        case ChessPiece.BLACK_QUEEN:
            return 'chess-queen-d'
        case ChessPiece.BLACK_BISHOP:
            return 'chess-bishop-d'
        case ChessPiece.BLACK_KNIGHT:
            return 'chess-knight-d'
        case ChessPiece.BLACK_ROOK:
            return 'chess-rook-d'
        case ChessPiece.BLACK_PAWN:
            return 'chess-pawn-d'
        case ChessPiece.WHITE_KING:
            return 'chess-king-l'
        case ChessPiece.WHITE_QUEEN:
            return 'chess-queen-l'
        case ChessPiece.WHITE_BISHOP:
            return 'chess-bishop-l'
        case ChessPiece.WHITE_KNIGHT:
            return 'chess-knight-l'
        case ChessPiece.WHITE_ROOK:
            return 'chess-rook-l'
        case ChessPiece.WHITE_PAWN:
            return 'chess-pawn-l'
    }
}

function updateGameState() {
    useChess.loadState().catch(error =>
            $q.notify({
                message: `${i18n.t('failed_to_load_game_state')}: ${error}`,
                color: 'red',
            })
    )
}

useSession.initSSE((msg: MessageEvent<string>) => {
    console.log('sse:', msg)
    if (msg.data === 'CHESS move happened') {

    }
    updateGameState()
})

updateGameState()
</script>