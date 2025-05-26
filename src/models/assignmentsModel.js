/* eslint-disable prettier/prettier */
const db = require("../database/connection");
const { camelCaseKeys } = require("../utils/text");

const Assignments = {
  getById: ({ id }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare("SELECT * FROM assignments WHERE id = ?");
      const assignment = stmt.get([id]);

      return camelCaseKeys(assignment);
    });

    return getTransactionResult();
  },

  getByParticipantId: ({ participantId }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare("SELECT * FROM assignments WHERE participant_id = ?");
      const assignments = stmt.all([participantId]);
      const result = assignments.map((row) => camelCaseKeys(row));

      if (result.length > 0) {
        return { data: result };
      }
      return null;
    });

    return getTransactionResult();
  },

  getByGroupId: ({ groupId }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare("SELECT * FROM assignments WHERE group_id = ?");
      const assignments = stmt.all([groupId]);
      const result = assignments.map((row) => camelCaseKeys(row));

      if (result.length > 0) {
        return { data: result };
      }
      return null;
    });

    return getTransactionResult();
  },

  create: ({ participantId, groupId, assignedAt }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        "INSERT INTO assignments(participant_id, group_id, assigned_at) VALUES (?, ?, ?)"
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
        "UPDATE assignments SET participant_id = ?, group_id = ?, assigned_at = ? WHERE id = ?"
      );
      const result = stmt.run([participantId, groupId, assignedAt, id]);

      if (result.changes === 1) {
        return Assignments.getById({ id: id });
      }
      return null;
    });

    return getTransactionResult();
  },

  delete: ({ id }) => {
    const getTransactionResult = db.transaction(() => {
      const assignmentBackup = Assignments.getById({ id: id });
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
      const assignmentsBackup = Assignments.getByParticipantId({ participantId: participantId });
      const stmt = db.prepare("DELETE FROM assignments WHERE participant_id = ?");
      const result = stmt.run([participantId]);

      if (result.changes === assignmentsBackup.data.length) {
        return assignmentsBackup;
      }
      return null;
    });

    return getTransactionResult();
  },

  deleteByGroupId: ({ groupId }) => {
    const getTransactionResult = db.transaction(() => {
      const assignmentsBackup = Assignments.getByGroupId({ groupId: groupId });
      const stmt = db.prepare("DELETE FROM assignments WHERE group_id = ?");
      const result = stmt.run([groupId]);

      if (result.changes === assignmentsBackup.data.length) {
        return assignmentsBackup;
      }
      return null;
    });

    return getTransactionResult();
  },
};

module.exports = Assignments;
