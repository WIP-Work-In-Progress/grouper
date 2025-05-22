/* eslint-disable prettier/prettier */
const db = require("../database/connection");
const { camelCaseKeys } = require("../utils/text");

const ConfirmationLog = {
  getById: ({ id }) => {
    const stmt = db.prepare("SELECT * FROM confirmation_log WHERE id = ?");
    const log = stmt.get([id]);
    return camelCaseKeys(log);
  },

  getMany: ({ limit = 100, order = "ASC" } = {}) => {
    const getTransactionResult = db.transaction(() => {
      const stmtTotal = db.prepare(
        "SELECT COUNT(*) as total FROM confirmation_log"
      );
      const stmtData = db.prepare(
        `SELECT * FROM confirmation_log ORDER BY confirmed_at ${order} LIMIT ?`
      );
      const total = stmtTotal.get().total;
      const logs = stmtData.all([limit]);
      return { data: logs.map((log) => camelCaseKeys(log)), total: total };
    });

    return getTransactionResult();
  },

  getByParticipantId: ({ participantId, order = "ASC" } = {}) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        `SELECT * FROM confirmation_log WHERE participant_id = ? ORDER BY confirmed_at ${order}`
      );
      const logs = stmt.all([participantId]);
      return logs.map((l) => camelCaseKeys(l));
    });

    const result = getTransactionResult();

    if (result.length > 0) {
      return { data: result };
    }
    return null;
  },

  create: ({ participantId, confirmedAt }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        "INSERT INTO confirmation_log (participant_id, confirmed_at) VALUES (?, ?)"
      );
      const result = stmt.run([participantId, confirmedAt]);
      if (result.lastInsertRowid) {
        return camelCaseKeys(
          ConfirmationLog.getById({ id: result.lastInsertRowid })
        );
      }
      return null;
    });

    return getTransactionResult();
  },

  update: ({ id, participantId, confirmedAt }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        "UPDATE confirmation_log SET participant_id = ?, confirmed_at = ? WHERE id = ?"
      );
      const result = stmt.run([participantId, confirmedAt, id]);
      if (result.changes === 1) {
        return camelCaseKeys(ConfirmationLog.getById({ id }));
      }
      return null;
    });

    return getTransactionResult();
  },

  deleteByParticipantId: ({ participantId }) => {
    const getTransactionResult = db.transaction(() => {
      const logs = ConfirmationLog.getByParticipantId({ participantId });
      const stmt = db.prepare(
        "DELETE FROM confirmation_log WHERE participant_id = ?"
      );
      const result = stmt.run([participantId]);
      if (result.changes > 0) {
        return { data: logs.data.map((l) => camelCaseKeys(l)) };
      }
      return null;
    });

    return getTransactionResult();
  },

  delete: ({ id }) => {
    const getTransactionResult = db.transaction(() => {
      const log = ConfirmationLog.getById({ id });
      const stmt = db.prepare("DELETE FROM confirmation_log WHERE id = ?");
      const result = stmt.run([id]);
      if (result.changes > 0) {
        return camelCaseKeys(log);
      }
      return null;
    });

    return getTransactionResult();
  },
};

module.exports = ConfirmationLog;
