/* eslint-disable prettier/prettier */
const db = require("../database/connection");
const { camelCaseKeys } = require("../utils/text");

const Group = {
  getById: (id) => {
    const stmt = db.prepare("SELECT * FROM groups WHERE id = ?");
    const group = stmt.get(id);
    return camelCaseKeys(group);
  },
  getAll: () => {
    const stmt = db.prepare("SELECT * FROM groups");
    const groups = stmt.all();
    return camelCaseKeys(groups);
  },
  getByRegistrationId: (registrationId) => {
    const stmt = db.prepare("SELECT * FROM groups WHERE registration_id = ?");
    const groups = stmt.all(registrationId);
    return camelCaseKeys(groups);
  },
  getByName: (name) => {
    const stmt = db.prepare("SELECT * FROM groups WHERE name LIKE ?");
    const groups = stmt.all("%" + name + "%");
    return camelCaseKeys(groups);
  },
  create: (name, registrationId, capacity) => {
    const stmt = db.prepare(
      "INSERT INTO groups (name, registration_id, capacity) VALUES (?, ?, ?)"
    );
    const result = stmt.run(name, registrationId, capacity);

    if (result.lastInsertRowid) {
      return camelCaseKeys(Group.getById(result.lastInsertRowid));
    }
    return null;
  },
  update: (id, name, registrationId, capacity) => {
    const stmt = db.prepare(
      "UPDATE groups SET name = ?, registration_id = ?, capacity = ? WHERE id = ?"
    );
    const result = stmt.run(name, registrationId, capacity, id);

    if (result.changes === 1) {
      return camelCaseKeys(Group.getById(id));
    }
    return null;
  },
  delete: (id) => {
    const group = Group.getById(id);
    const stmt = db.prepare("DELETE FROM groups WHERE id = ?");
    const result = stmt.run(id);

    if (result.changes > 0) {
      return camelCaseKeys(group);
    }
    return null;
  },
};

module.exports = Group;
