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

  getByRegistrationId: ({ registrationId }) => {
    const stmt = db.prepare(
      "SELECT * FROM assignments WHERE registration_id = ?",
    );
    const assignments = stmt.all([registrationId]);
    const result = camelCaseKeys(assignments); // conversion function can take list so no map in needed

    return result.length > 0 ? result : null;
  },

  create: ({
    registrationId,
    participantId,
    assigned,
    groupId,
    assignedAt,
  }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        "INSERT INTO assignments(registration_id, participant_id, assigned, group_id, assigned_at) VALUES (?, ?, ?, ?, ?)",
      );
      const result = stmt.run([
        registrationId,
        participantId,
        assigned ? 1 : 0,
        groupId,
        assignedAt,
      ]);

      if (result.lastInsertRowid && result.changes === 1) {
        return Assignments.getById({ id: result.lastInsertRowid });
      }
      return null;
    });

    return getTransactionResult();
  },

  update: ({
    id,
    registrationId,
    participantId,
    assigned,
    groupId,
    assignedAt,
  }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        `UPDATE assignments SET 
          registration_id = ?,
          participant_id = ?,
          assigned = ?,
          group_id = ?,
          assigned_at = ?
        WHERE id = ?`,
      );
      const result = stmt.run([
        registrationId,
        participantId,
        assigned ? 1 : 0,
        groupId,
        assignedAt,
        id,
      ]);

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

      if (!assignmentBackup) return null;
      if (result.changes === 1) return assignmentBackup;

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

      if (!assignmentsBackup) return null;
      if (result.changes === assignmentsBackup.length) return assignmentsBackup;

      return null;
    });

    return getTransactionResult();
  },

  deleteByGroupId: ({ groupId }) => {
    const getTransactionResult = db.transaction(() => {
      const assignmentsBackup = Assignments.getByGroupId({ groupId });
      const stmt = db.prepare("DELETE FROM assignments WHERE group_id = ?");
      const result = stmt.run([groupId]);

      if (!assignmentsBackup) return null;
      if (result.changes === assignmentsBackup.length) return assignmentsBackup;

      return null;
    });

    return getTransactionResult();
  },

  deleteByRegistrationId: ({ registrationId }) => {
    const getTransactionResult = db.transaction(() => {
      const assignmentsBackup = Assignments.getByRegistrationId({
        registrationId,
      });
      const stmt = db.prepare(
        "DELETE FROM assignments WHERE registration_id = ?",
      );
      const result = stmt.run([registrationId]);

      if (!assignmentsBackup) return null;
      if (result.changes === assignmentsBackup.length) return assignmentsBackup;

      return null;
    });

    return getTransactionResult();
  },
};

module.exports = Assignments;
