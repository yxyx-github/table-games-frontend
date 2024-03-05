<template>
    <div class="flex flex-col flex-nowrap items-stretch gap-2">
        <template v-if="isRunning">
            <q-banner v-if="hasTurn" class="rounded bg-primary text-white">
                {{ $t('its_your_turn') }}
            </q-banner>
            <q-banner v-else class="rounded bg-info text-white">
                {{ $t('wait_for_action_of_other_player') }}
            </q-banner>
        </template>
        <q-banner v-else-if="isDraw" class="rounded bg-warning text-white">
            {{ $t('no_winner') }}
        </q-banner>
        <template v-else-if="isDecided">
            <q-banner v-if="hasWon" class="rounded bg-positive text-white">
                {{ $t('you_won') }}
            </q-banner>
            <q-banner v-else class="rounded bg-negative text-white">
                {{ $t('you_lost') }}
            </q-banner>
        </template>
        <div class="flex flex-row items-start">
            <GameField :fields="usedBoard"
                       v-slot="{ item, x, y }"
                       enableClick
                       :clickable="clickable"
                       @click="onClick"
                       :itemClass="itemClass"
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
import { computed, ref } from 'vue'
import { useChessStore } from '@/stores/games/chess'
import { ChessPiece } from '@/enums/chessPiece'
import { useSessionStore } from '@/stores/session'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { ChessGameState } from '@/enums/chessGameState'
import { ChessPieceType } from '@/enums/chessPieceType'

const $q = useQuasar()
const i18n = useI18n()
const useSession = useSessionStore()
const useChess = useChessStore()

// TODO: refactor
const hasWon = computed(() => useSession.session?.user.id === useChess.state?.winner)
const hasTurn = computed(() => useSession.session?.user.id === useChess.state?.turn)

// TODO: refactor
const isRunning = computed(() => useChess.state?.state === ChessGameState.RUNNING)
const isDraw = computed(() => useChess.state?.state === ChessGameState.DRAW)
const isDecided = computed(() => useChess.state?.state === ChessGameState.DECIDED)

const board = computed<string[][]>(() => useChess.state === null ? [] :
        [
            [' ', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', ' '],
            ...(useChess.state.board.map((row, index) => [
                    `${ index + 1 }`,
                    ...(row.map(field =>
                            field === null ? ' ' : chessPieceToIconName(field)
                    )),
                    `${ index + 1 }`,
                ]
            )),
            [' ', 'H', 'G', 'F', 'E', 'D', 'C', 'B', 'A', ' '],
        ]
)
const reversedBoard = computed<string[][]>(() => board.value.toReversed().map(row => row.toReversed()))

const enableReversedBoard = computed<boolean>(() => useSession.session?.user.host ?? false)
const usedBoard = computed<string[][]>(() => enableReversedBoard.value ? reversedBoard.value : board.value)

const selectedField = ref<{ x: number, y: number } | null>(null)

function clickable(item: string, x: number, y: number) {
    return ![0, 9].includes(x) && ![0, 9].includes(y)
}

const chessPieceTypeOptions = [
    { value: ChessPieceType.QUEEN, label: ChessPieceType.QUEEN.toString() },
    { value: ChessPieceType.BISHOP, label: ChessPieceType.BISHOP.toString() },
    { value: ChessPieceType.KNIGHT, label: ChessPieceType.KNIGHT.toString() },
    { value: ChessPieceType.ROOK, label: ChessPieceType.ROOK.toString() },
]

// TODO: display error messages
function onClick(field: { x: number, y: number }) {
    if (selectedField.value === null) {
        selectedField.value = field
    } else {
        console.log('move:', selectedField.value, '->', field)
        const selected = JSON.parse(JSON.stringify(selectedField.value))

        if (field.y === 1 && usedBoard.value[selected.y][selected.x].includes('pawn')) {
            $q.dialog({
                title: i18n.t('promote'),
                message: i18n.t('choose_piece_to_promote'),
                options: {
                    type: 'radio',
                    model: ChessPieceType.QUEEN,
                    items: chessPieceTypeOptions,
                }
            }).onOk(promoteTo => {
                if (enableReversedBoard.value) {
                    useChess.move(
                            8 - selected.x,
                            8 - selected.y,
                            8 - field.x,
                            8 - field.y,
                            promoteTo,
                    )
                } else {
                    useChess.move(
                            selected.x - 1,
                            selected.y - 1,
                            field.x - 1,
                            field.y - 1,
                            promoteTo,
                    )
                }
            })
        } else {
            if (enableReversedBoard.value) {
                useChess.move(
                        8 - selected.x,
                        8 - selected.y,
                        8 - field.x,
                        8 - field.y,
                )
            } else {
                useChess.move(
                        selected.x - 1,
                        selected.y - 1,
                        field.x - 1,
                        field.y - 1,
                )
            }
        }
        selectedField.value = null
    }
}

function itemClass(item: string, x: number, y: number) {
    if (selectedField.value?.x === x && selectedField.value?.y === y) {
        return 'bg-yellow-400'
    } else if (
            x !== 0 && x !== 9 && y !== 0 && y !== 9
            && (
                    + (x % 2 === 0)
                    ^ + (y % 2 === 0)
            )
    ) {
        return 'bg-gray-400'
    } else {
        return 'bg-white'
    }
}

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
        // TODO: check msg
    }
    updateGameState()
})

updateGameState()
</script>