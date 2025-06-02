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
-- TODO: change this schema to save how many seats are taken after assignments
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
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_id INTEGER NOT NULL,
    confirmed_at TEXT NOT NULL,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE
);

-- wyniki przydziałów do grup
-- changed this to take registration id as well (to avoid duplicates)
CREATE TABLE IF NOT EXISTS assignments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    registration_id INTEGER NOT NULL,
    participant_id INTEGER NOT NULL,
    assigned INTEGER NOT NULL DEFAULT 0, -- 0 - not registered, 1 - registered
    group_id INTEGER,
    assigned_at TEXT,
    FOREIGN KEY (participant_id) REFERENCES participants(id) ON DELETE CASCADE,
    FOREIGN KEY (group_id) REFERENCES groups(id) ON DELETE CASCADE
);

-- Przykladowe dane testowe
INSERT INTO registrations (name, token, admin_password_hash, preference_deadline, confirmation_deadline, results_publish_date) VALUES
('Zapisy na semestr letni', 'reg123token', 'hashed_password', '2025-05-20T23:59:00', '2025-05-21T23:59:00', '2025-05-22T23:59:00');

INSERT INTO groups (registration_id, name, capacity) VALUES
(1, 'Angielski, gr.1', 3),
(1, 'Angielski, gr.2', 3),
(1, 'Angielski, gr.3', 2);

INSERT INTO participants (registration_id, first_name, last_name, album_number, email, token, is_admin) VALUES
(1, 'Anna', 'Kowalska', '123451', 'anna@example.com', 'token_anna', 0),
(1, 'Jan', 'Nowak', '543211', 'jan@example.com', 'token_jan', 1),
(1, 'Piotr', 'Zielinski', '678901', 'piotr@example.com', 'token_piotr', 0),
(1, 'Katarzyna', 'Wójcik', '234567', 'kaska@wp.pl', 'token_kaska', 0),
(1, 'Marek', 'Lewandowski', '345678', 'mareczek@wp.pl', 'token_marek', 0),
(1, 'Ewa', 'Kowalczyk', '456789', 'efcia@wp.pl', 'token_ewa', 0),
(1, 'Tomasz', 'Wiśniewski', '567890', 'tomek@wp.pl', 'token_tomek', 0),
(1, 'Magdalena', 'Krawczyk', '678901', 'magda@wp.pl', 'token_magda', 0),
(1, 'Łukasz', 'Szymański', '789012', 'lukasz@wp.pl', 'token_lukasz', 0);

INSERT INTO preferences (participant_id, group_id, preference_order) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(2, 1, 1),
(2, 2, 2),
(2, 3, 3),
(3, 1, 1),
(3, 2, 2),
(3, 3, 3),
(4, 1, 1),
(4, 2, 2),
(4, 3, 3),
(5, 1, 1),
(5, 2, 2),
(5, 3, 3),
(6, 1, 1),
(6, 2, 2),
(6, 3, 3),
(7, 1, 1),
(7, 2, 2),
(7, 3, 3),
(8, 1, 1),
(8, 2, 2),
(8, 3, 3),
(9, 1, 1),
(9, 2, 2),
(9, 3, 3);

INSERT INTO confirmation_log (participant_id, confirmed_at) VALUES
(1, '2025-05-20T10:00:00'),
(2, '2025-05-20T11:30:00'),
(2, '2025-05-20T12:50:00'),
(3, '2025-05-20T13:00:00'),
(4, '2025-05-20T14:15:00'),
(5, '2025-05-20T15:30:00'),
(6, '2025-05-20T16:45:00'),
(7, '2025-05-20T17:50:00'),
(8, '2025-05-20T18:55:00'),
(9, '2025-05-20T19:30:00');

INSERT INTO assignments (registration_id, participant_id, group_id, assigned_at) VALUES
(1, 1, 1, '2025-05-22T00:00:00'),
(1, 1, 3, '2025-05-22T00:30:00'),
(1, 2, 2, '2025-05-22T10:15:00'),
(1, 2, 3, '2025-05-22T10:20:00');
