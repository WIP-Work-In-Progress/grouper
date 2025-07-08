const db = require("../database/connection");
const { camelCaseKeys } = require("../utils/text");

const Participant = {
  getById: (id) => {
    const stmt = db.prepare("SELECT * FROM participants WHERE id = ?");
    const participant = stmt.get(id);
    return camelCaseKeys(participant);
  },

  getAll: () => {
    const stmt = db.prepare("SELECT * FROM participants");
    const participants = stmt.all();
    return camelCaseKeys(participants);
  },

  getByRegistrationId: (registrationId) => {
    const stmt = db.prepare(
      "SELECT * FROM participants WHERE registration_id = ?",
    );
    const participants = stmt.all(registrationId);
    return camelCaseKeys(participants);
  },

  getByLastName: (name) => {
    const stmt = db.prepare(
      "SELECT * FROM participants WHERE last_name LIKE ?",
    );
    const participants = stmt.all("%" + name + "%");
    return camelCaseKeys(participants);
  },

  getByFirstName: (name) => {
    const stmt = db.prepare(
      "SELECT * FROM participants WHERE first_name LIKE ?",
    );
    const participants = stmt.all("%" + name + "%");
    return camelCaseKeys(participants);
  },

  getByAlbumNumber: (album) => {
    const stmt = db.prepare(
      "SELECT * FROM participants WHERE album_number = ?",
    );
    const participants = stmt.get(album);
    return camelCaseKeys(participants);
  },

  getByEmail: (email) => {
    const stmt = db.prepare("SELECT * FROM participants WHERE email = ?");
    const participants = stmt.get(email);
    return camelCaseKeys(participants);
  },

  create: (
    firstName,
    lastName,
    registrationId,
    albumNumber,
    email,
    token,
    admin,
  ) => {
    const stmt = db.prepare(
      "INSERT INTO participants (first_name, last_name, registration_id, album_number, email, token, is_admin) VALUES (?, ?, ?, ?, ?, ?, ?)",
    );
    const result = stmt.run(
      firstName,
      lastName,
      registrationId,
      albumNumber,
      email,
      token,
      admin,
    );

    if (result.lastInsertRowid) {
      return camelCaseKeys(Participant.getById(result.lastInsertRowid));
    }
    return null;
  },

  update: (
    id,
    firstName,
    lastName,
    registrationId,
    albumNumber,
    email,
    token,
    admin,
  ) => {
    const stmt = db.prepare(
      "UPDATE participants SET first_name = ?, last_name = ?, registration_id = ?, album_number = ?, email = ?, token = ?, is_admin = ?  WHERE id = ?",
    );
    const result = stmt.run(
      firstName,
      lastName,
      registrationId,
      albumNumber,
      email,
      token,
      admin,
      id,
    );

    if (result.changes === 1) {
      return camelCaseKeys(Participant.getById(id));
    }
    return null;
  },

  delete: (id) => {
    const participant = Participant.getById(id);
    const stmt = db.prepare("DELETE FROM participants WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes > 0) {
      return camelCaseKeys(participant);
    }
    return null;
  },
};

module.exports = Participant;
