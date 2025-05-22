const db = require("../database/connection");
const { camelCaseKeys } = require("../utils/text");

const Registration = {
  getById: (id) => {
    const stmt = db.prepare("SELECT * FROM registrations WHERE id = ?");
    const registration = stmt.get(id);
    return camelCaseKeys(registration);
  },
  getAll: () => {
    const stmt = db.prepare("SELECT * FROM registrations");
    const registrations = stmt.all();
    return camelCaseKeys(registrations);
  },
  getByName: (name) => {
    const stmt = db.prepare("SELECT * FROM registrations WHERE name LIKE ?");
    const registrations = stmt.all("%" + name + "%");
    return camelCaseKeys(registrations);
  },
  create: (name, token, admin_password_hash, preference_deadline, confirmation_deadline, results_publish_date) => {
    const stmt = db.prepare(
      "INSERT INTO registrations (name, token, admin_password_hash, preference_deadline, confirmation_deadline, results_publish_date) VALUES (?, ?, ?, ?, ?, ?)"
    );
    const result = stmt.run(name, token, admin_password_hash, preference_deadline, confirmation_deadline, results_publish_date);

    if (result.lastInsertRowid) {
      return camelCaseKeys(Registration.getById(result.lastInsertRowid));
    }
    return null;
  },
  update: (id, name, token, admin_password_hash, preference_deadline, confirmation_deadline, results_publish_date) => {
    const stmt = db.prepare(
      "UPDATE registrations SET name = ?, token = ?, admin_password_hash = ?, preference_deadline = ?, confirmation_deadline = ?, results_publish_date = ? WHERE id = ?"
    );
    const result = stmt.run(name, token, admin_password_hash, preference_deadline, confirmation_deadline, results_publish_date, id);

    if (result.changes === 1) {
      return camelCaseKeys(Registration.getById(id));
    }
    return null;
  },
  delete: (id) => {
    const registration = Registration.getById(id);
    const stmt = db.prepare("DELETE FROM registrations WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes > 0) {
      return camelCaseKeys(registration);
    }
    return null;
  },
};

module.exports = Registration;
