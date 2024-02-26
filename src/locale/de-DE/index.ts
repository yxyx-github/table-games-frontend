const messages = {
    click_to_copy: 'Klicke zum Kopieren',
    close_session: 'Sitzung beenden',
    close_session_confirm_message: 'Möchtest du die Sitzung wirklich beenden?',
    copied: 'Kopiert',
    create_new_session: 'Neue Sitzung erstellen',
    create_session: 'Sitzung erstellen',
    current_session: 'Aktuelle Sitzung',
    failed_to_close_session: 'Fehler beim Beenden der Sitzung',
    failed_to_create_session: 'Fehler beim Erstellen der Sitzung',
    failed_to_join_session: 'Fehler beim Beitreten der Sitzung',
    failed_to_load_game_list: 'Fehler beim Laden der Spieleliste',
    game_not_implemented: 'Das Spiel ist nicht implementiert',
    home: 'Startseite',
    join_session: 'Sitzung beitreten',
    leave_session: 'Sitzung verlassen',
    players: 'Spieler',
    session_token: 'Sitzungsschlüssel',
    username: 'Bentzername',
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
