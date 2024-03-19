const messages = {
    choose_piece_to_promote: 'Wähle ein Teil zum Befördern aus.',
    click_to_copy: 'Klicke zum Kopieren',
    close_session: 'Sitzung beenden',
    close_session_confirm_message: 'Möchtest du die Sitzung wirklich beenden?',
    copied: 'Kopiert',
    create_new_session: 'Neue Sitzung erstellen',
    create_session: 'Sitzung erstellen',
    current_session: 'Aktuelle Sitzung',
    game_has_not_started_yet: 'Das Spiel hat noch nicht begonnen. Wahrscheinlich sind noch nicht alle Mitspieler beigetreten.',
    failed_to_attack: 'Fehler beim Attackieren',
    failed_to_castle: 'Fehler beim Rochieren',
    failed_to_close_session: 'Fehler beim Beenden der Sitzung',
    failed_to_connect_for_automatic_updates: 'Fehler beim Verbinden für automatische Aktualisierungen.',
    failed_to_create_session: 'Fehler beim Erstellen der Sitzung',
    failed_to_join_session: 'Fehler beim Beitreten der Sitzung',
    failed_to_load_game_list: 'Fehler beim Laden der Spieleliste',
    failed_to_load_game_state: 'Fehler beim Laden des Spielstandes',
    failed_to_move: 'Fehler beim Verschieben',
    failed_to_place_ship: 'Fehler beim Platzieren des Schiffes',
    failed_to_promote: 'Fehler beim Befördern',
    game_not_implemented: 'Das Spiel ist nicht implementiert',
    home: 'Startseite',
    invalid_ship_type: 'Ungültiges Schiff (ungültige Schiffslänge)',
    its_your_turn: 'Du bist am Zug.',
    join_session: 'Sitzung beitreten',
    leave_session: 'Sitzung verlassen',
    no_winner: 'Es gibt keinen Gewinner',
    players: 'Spieler',
    promote: 'Befördern',
    session_token: 'Sitzungsschlüssel',
    ships_cannot_be_placed_diagonal: 'Schiffe können nicht diagonal angeordnet werden',
    username: 'Bentzername',
    wait_for_action_of_other_player: 'Warte auf Aktion von einem Mitspieler.',
    you_won: 'Du hast gewonnen.',
    you_lost: 'Du hast verloren.',
}

const numberFormats = {
    currency: {
        style: 'currency',
        currency: 'EUR',
    },
    decimal: {
        style: 'decimal',
    },
}

const dateTimeFormats = {
    date: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    },
    datetime: {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    },
}

const deDE = {
    messages,
    numberFormats,
    dateTimeFormats,
}

export default deDE
