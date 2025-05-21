const db = require("../database/connection");
const { camelCaseKeys } = require("../utils/text");

const Preference = {
  getById: (id) => {
    const stmt = db.prepare("SELECT * FROM preferences WHERE id = ?");
    const preference = stmt.get(id);
    return camelCaseKeys(preference);
  },
  getAll: () => {
    const stmt = db.prepare("SELECT * FROM preferences");
    const preferences = stmt.all();
    return camelCaseKeys(preferences);
  },
  getByRegistrationId: (registrationId) => {
    const stmt = db.prepare("SELECT * FROM preferences WHERE registration_id = ?");
    const preferences = stmt.all(registrationId);
    return camelCaseKeys(preferences);
  },
  getByGroupId: (groupId) => {
    const stmt = db.prepare("SELECT * FROM preferences WHERE group_id = ?");
    const preferences = stmt.all(groupId);
    return camelCaseKeys(preferences);
  },
  create: (participant_id, group_id, preference_order) => {
    const stmt = db.prepare(
      "INSERT INTO preferences (participant_id, group_id, preference_order) VALUES (?, ?, ?)",
    );
    const result = stmt.run(participant_id, group_id, preference_order);

    if (result.lastInsertRowid) {
      return camelCaseKeys(Preference.getById(result.lastInsertRowid));
    }
    return null;
  },
  update: (id, participant_id, group_id, preference_order) => {
    const stmt = db.prepare(
      "UPDATE preferences SET participant_id = ?, group_id = ?, preference_order = ? WHERE id = ?",
    );
    const result = stmt.run(participant_id, group_id, preference_order, id);

    if (result.changes === 1) {
      return camelCaseKeys(Preference.getById(id));
    }
    return null;
  },
  delete: (id) => {
    const preference = Preference.getById(id);
    const stmt = db.prepare("DELETE FROM preferences WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes === 1) {
      return camelCaseKeys(preference);
    }
    return null;
  },
};

module.exports = Preference;
