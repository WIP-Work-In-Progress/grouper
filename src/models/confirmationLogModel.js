const db = require("../database/connection");
const { camelCaseKeys } = require("../utils/text");

const ConfirmationLog = {
  getById: ({ id }) => {
    const stmt = db.prepare("SELECT * FROM confirmation_log WHERE id = ?");
    const log = stmt.get([id]);

    if (!log) {
      return null;
    }

    return camelCaseKeys(log);
  },

  getMany: ({ limit = 100, order = "ASC" } = {}) => {
    const stmt = db.prepare(
      `SELECT * FROM confirmation_log ORDER BY confirmed_at ${order} LIMIT ?`,
    );
    const logs = stmt.all([limit]);

    return logs.map((log) => camelCaseKeys(log));
  },

  getByParticipantId: ({ participantId, order = "ASC" } = {}) => {
    const stmt = db.prepare(
      `SELECT * FROM confirmation_log WHERE participant_id = ? ORDER BY confirmed_at ${order}`,
    );
    const logs = stmt.all([participantId]);

    return logs.map((l) => camelCaseKeys(l));
  },

  countAll: () => {
    const stmtTotal = db.prepare(
      "SELECT COUNT(*) as total FROM confirmation_log",
    );
    const result = stmtTotal.get();

    return result.total;
  },

  create: ({ participantId, confirmedAt }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        "INSERT INTO confirmation_log (participant_id, confirmed_at) VALUES (?, ?)",
      );
      const { lastInsertRowid } = stmt.run([participantId, confirmedAt]);

      if (lastInsertRowid) {
        return ConfirmationLog.getById({ id: lastInsertRowid });
      }

      return null;
    });

    return getTransactionResult();
  },

  update: ({ id, participantId, confirmedAt }) => {
    const getTransactionResult = db.transaction(() => {
      const stmt = db.prepare(
        "UPDATE confirmation_log SET participant_id = ?, confirmed_at = ? WHERE id = ?",
      );
      const result = stmt.run([participantId, confirmedAt, id]);

      if (result.changes === 1) {
        return ConfirmationLog.getById({ id });
      }

      return null;
    });

    return getTransactionResult();
  },

  deleteByParticipantId: ({ participantId }) => {
    const getTransactionResult = db.transaction(() => {
      const logs = ConfirmationLog.getByParticipantId({ participantId });
      const stmt = db.prepare(
        "DELETE FROM confirmation_log WHERE participant_id = ?",
      );
      const result = stmt.run([participantId]);

      if (result.changes > 0) {
        return logs;
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
        return log;
      }

      return null;
    });

    return getTransactionResult();
  },
};

module.exports = ConfirmationLog;
