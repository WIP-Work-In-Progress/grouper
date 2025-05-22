/* eslint-disable prettier/prettier */
const db = require("../database/connection");
const { camelCaseKeys } = require("../utils/text");

const ConfirmationLog = {
  getById: ({ id }) => {
    const stmt = db.prepare("SELECT * FROM confirmation_log WHERE id = ?");
    const confirmationLog = stmt.get([id]);
    return camelCaseKeys(confirmationLog);
  },

  getMany: ({ limit = 100, order = "ASC" } = {}) => {
    return db.transaction(() => {
      const stmtTotal = db.prepare(
        "SELECT COUNT(*) as total FROM confirmation_log"
      );
      const stmtData = db.prepare(
        "SELECT * FROM confirmation_log ORDER BY confirmed_at ? LIMIT ?"
      );
      const total = stmtTotal.get().total;
      const logs = stmtData.all([order, limit]);
      return logs.map((log) => camelCaseKeys(log)), total;
    })();
  },

  getByParticipantId: ({ participantId, order = "ASC" } = {}) => {
    return db.transaction(() => {
      const stmtData = db.prepare(
        "SELECT * FROM confirmation_log WHERE participant_id = ? ORDER BY confirmed_at ?"
      );
      const logs = stmtData.all([participantId, order]);
      return logs.map((l) => camelCaseKeys(l));
    })();
  },

  create: ({ participantId, confirmedAt }) => {
    return db.transaction(() => {
      const stmt = db.prepare(
        "INSERT INTO confirmation_log (participant_id, confirmed_at) VALUES (?, ?)"
      );
      const result = stmt.run([participantId, confirmedAt]);
      if (result.lastInsertRowid) {
        return camelCaseKeys(this.getById({ id: result.lastInsertRowid }));
      }
      return null;
    })();
  },

  update: ({ id, participantId, confirmedAt }) => {
    return db.transaction(() => {
      const stmt = db.prepare(
        "UPDATE confirmation_log SET participant_id = ?, confirmed_at = ? WHERE id = ?"
      );
      const result = stmt.run([participantId, confirmedAt, id]);
      if (result.changes === 1) {
        return camelCaseKeys(this.getById({ id }));
      }
      return null;
    })();
  },

  deleteByParticipantId: ({ participantId }) => {
    return db.transaction(() => {
      const logs = this.getByParticipantId({ participantId });
      const stmt = db.prepare(
        "DELETE FROM confirmation_log WHERE participant_id = ?"
      );
      const result = stmt.run([participantId]);
      if (result.changes > 0) {
        return { data: logs.map((l) => camelCaseKeys(l)) };
      }
      return null;
    })();
  },

  delete: ({ id }) => {
    return db.transaction(() => {
      const log = this.getById({ id });
      const stmt = db.prepare("DELETE FROM confirmation_log WHERE id = ?");
      const result = stmt.run([id]);
      if (result.changes > 0) {
        return { data: camelCaseKeys(log) };
      }
      return null;
    })();
  },
};

module.exports = ConfirmationLog;
