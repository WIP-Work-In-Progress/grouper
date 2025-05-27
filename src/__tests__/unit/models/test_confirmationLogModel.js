const ConfirmationLog = require("../../../models/confirmationLogModel");
const { runTests } = require("../../../utils/tests");

// NOTE: This is not proper unit testing, but rather a functional test
// that checks if the database operations work as expected.
// use command node src/__tests__/unit/models/test_confirmationLogModel.js to run this test

const Tests = {
  getById: () => {
    const log = ConfirmationLog.getById({ id: 1 });
    console.log("Confirmation Log by ID:", log);
  },

  getMany: () => {
    const logs = ConfirmationLog.getMany({ limit: 10 });
    console.log("Confirmation Logs:", logs);
  },

  getByParticipantId: () => {
    const logs = ConfirmationLog.getByParticipantId({
      participantId: 10,
      order: "ASC",
    });
    console.log("Confirmation Logs by Participant ID:", logs);
  },

  countAll: () => {
    const total = ConfirmationLog.countAll();
    console.log("Total Confirmation Logs:", total);
  },

  create: () => {
    const result = ConfirmationLog.create({
      participantId: 1,
      confirmedAt: new Date().toISOString(),
    });
    console.log("Create Confirmation Log result:", result);
  },

  update: () => {
    const result = ConfirmationLog.update({
      id: 1,
      participantId: 1,
      confirmedAt: new Date().toISOString(),
    });
    console.log("Update Confirmation Log result:", result);
  },

  deleteByParticipantId: () => {
    const result = ConfirmationLog.deleteByParticipantId({ participantId: 1 });
    console.log("Delete Confirmation Log by Participant ID result:", result);
  },

  delete: () => {
    const result = ConfirmationLog.delete({ id: 2 });
    console.log("Delete Confirmation Log result:", result);
  },
};

runTests(Tests);
