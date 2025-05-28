const db = require("../database/connection");
const { camelCaseKeys } = require("../utils/text");

const Assignments = {
  getById: ({ id }) => {
    const stmt = db.prepare("SELECT * FROM assignments WHERE id = ?");
    const assignment = stmt.get([id]);

    return camelCaseKeys(assignment);
  },

  getByParticipantId: ({ participantId }) => {
    const stmt = db.prepare(
      "SELECT * FROM assignments WHERE participant_id = ?",
    );
    const assignments = stmt.all([participantId]);
    const result = assignments.map((row) => camelCaseKeys(row));

    if (result.length > 0) {
      return result;
    }
    return null;
  },

  getByGroupId: ({ groupId }) => {
    const stmt = db.prepare("SELECT * FROM assignments WHERE group_id = ?");
    const assignments = stmt.all([groupId]);
    const result = assignments.map((row) => camelCaseKeys(row));

    if (result.length > 0) {
      return result;
    }
    return null;
  },

  create: ({ participantId, groupId, assignedAt }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        "INSERT INTO assignments(participant_id, group_id, assigned_at) VALUES (?, ?, ?)",
      );
      const result = stmt.run([participantId, groupId, assignedAt]);

      if (result.lastInsertRowid && result.changes === 1) {
        return Assignments.getById({ id: result.lastInsertRowid });
      }
      return null;
    });

    return getTransactionResult();
  },

  update: ({ id, participantId, groupId, assignedAt }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        "UPDATE assignments SET participant_id = ?, group_id = ?, assigned_at = ? WHERE id = ?",
      );
      const result = stmt.run([participantId, groupId, assignedAt, id]);

      if (result.changes === 1) {
        return Assignments.getById({ id });
      }
      return null;
    });

    return getTransactionResult();
  },

  delete: ({ id }) => {
    const getTransactionResult = db.transaction(() => {
      const assignmentBackup = Assignments.getById({ id });
      const stmt = db.prepare("DELETE FROM assignments WHERE id = ?");
      const result = stmt.run([id]);

      if (result.changes === 1) {
        return assignmentBackup;
      }
      return null;
    });

    return getTransactionResult();
  },

  deleteByParticipantId: ({ participantId }) => {
    const getTransactionResult = db.transaction(() => {
      const assignmentsBackup = Assignments.getByParticipantId({
        participantId,
      });
      const stmt = db.prepare(
        "DELETE FROM assignments WHERE participant_id = ?",
      );
      const result = stmt.run([participantId]);

      if (result.changes === assignmentsBackup.length) {
        return assignmentsBackup;
      }
      return null;
    });

    return getTransactionResult();
  },

  deleteByGroupId: ({ groupId }) => {
    const getTransactionResult = db.transaction(() => {
      const assignmentsBackup = Assignments.getByGroupId({ groupId });
      const stmt = db.prepare("DELETE FROM assignments WHERE group_id = ?");
      const result = stmt.run([groupId]);

      if (result.changes === assignmentsBackup.length) {
        return assignmentsBackup;
      }
      return null;
    });

    return getTransactionResult();
  },
};

module.exports = Assignments;
