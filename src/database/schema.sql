PRAGMA foreign_keys = ON;

-- zapisy
CREATE TABLE IF NOT EXISTS registrations (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    admin_password_hash TEXT NOT NULL,
    preference_deadline TEXT NOT NULL,
    confirmation_deadline TEXT NOT NULL,
    results_publish_date TEXT NOT NULL
);

-- grupy
CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_id INTEGER NOT NULL,
    name TEXT NOT NULL, -- np. "Przedmiot A - Grupa 1"
    capacity INTEGER NOT NULL,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
);

-- uczestnicy (uczestnik może być adminem)
CREATE TABLE IF NOT EXISTS participants (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_id INTEGER NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    album_number TEXT NOT NULL,
    email TEXT NOT NULL,
    token TEXT UNIQUE NOT NULL,
    is_admin INTEGER NOT NULL DEFAULT 0,
    FOREIGN KEY (registration_id) REFERENCES registrations(id) ON DELETE CASCADE
);

-- preferencje uczestników do grup
CREATE TABLE IF NOT EXISTS preferences (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_id INTEGER NOT NULL,
    group_id INTEGER NOT NULL,
    preference_order INTEGER NOT NULL,
    UNIQUE (participant_id, group_id),
    UNIQUE (participant_id, preference_order),
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- czas potwierdzenia preferencji
CREATE TABLE IF NOT EXISTS confirmation_log (
    participant_id INTEGER PRIMARY KEY,
    confirmed_at TEXT NOT NULL,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
);

-- wyniki przydziałów do grup
CREATE TABLE IF NOT EXISTS assignments (
    participant_id INTEGER PRIMARY KEY,
    group_id INTEGER NOT NULL,
    assigned_at TEXT NOT NULL,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Przykladowe dane testowe
INSERT INTO registrations (name, token, admin_password_hash, preference_deadline, confirmation_deadline, results_publish_date) VALUES
('Zapisy na semestr letni', 'reg123token', 'hashed_password', '2025-05-20T23:59:00', '2025-05-21T23:59:00', '2025-05-22T23:59:00');

INSERT INTO groups (registration_id, name, capacity) VALUES
(1, 'Przedmiot A - Grupa 1', 2),
(1, 'Przedmiot A - Grupa 2', 2),
(1, 'Przedmiot B - Grupa 1', 2);

INSERT INTO participants (registration_id, first_name, last_name, album_number, email, token, is_admin) VALUES
(1, 'Anna', 'Kowalska', '123451', 'anna@example.com', 'token_anna', 0),
(1, 'Jan', 'Nowak', '543211', 'jan@example.com', 'token_jan', 1);

INSERT INTO preferences (participant_id, group_id, preference_order) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3);

INSERT INTO confirmation_log (participant_id, confirmed_at) VALUES
(1, '2025-05-20T10:00:00');

INSERT INTO assignments (participant_id, group_id, assigned_at) VALUES
(1, 1, '2025-05-22T00:00:00');
