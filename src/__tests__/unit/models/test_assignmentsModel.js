const Assignments = require("../../../models/assignmentsModel");
const { runTests } = require("../../../utils/tests");

// NOTE: This is not proper unit testing, but rather a functional test
// that checks if the database operations work as expected.
// use command node src/__tests__/unit/models/test_assignmentsModel.js to run this test

const Tests = {
  getById: () => {
    const assignment = Assignments.getById({ id: 1 });
    console.log("Assignment by ID:", assignment);
  },

  getByParticipantId: () => {
    const assignments = Assignments.getByParticipantId({ participantId: 1 });
    console.log("Assignments by Participant ID:", assignments);
  },

  getByGroupId: () => {
    const assignments = Assignments.getByGroupId({ groupId: 3 });
    console.log("Assignments by Group ID:", assignments);
  },

  getByRegistrationId: () => {
    const assignments = Assignments.getByRegistrationId({ registrationId: 1 });
    console.log("Assignments by Registration ID:", assignments);
  },

  create: () => {
    const result = Assignments.create({
      registrationId: 1,
      participantId: 2,
      assigned: true,
      groupId: 1,
      assignedAt: new Date().toISOString(),
    });
    console.log("Create Assignment result:", result);
  },

  update: () => {
    const result = Assignments.update({
      id: 1,
      registrationId: 1,
      participantId: 1,
      assigned: false,
      groupId: 2,
      assignedAt: new Date().toISOString(),
    });
    console.log("Update Assignment result:", result);
  },

  delete: () => {
    const result = Assignments.delete({ id: 3 });
    console.log("Delete Assignment result:", result);
  },

  deleteByParticipantId: () => {
    const result = Assignments.deleteByParticipantId({ participantId: 2 });
    console.log("Delete Assignment by Participant ID result:", result);
  },

  deleteByGroupId: () => {
    const result = Assignments.deleteByGroupId({ groupId: 3 });
    console.log("Delete Assignment by Group ID result:", result);
  },

  deleteByRegistrationId: () => {
    const result = Assignments.deleteByRegistrationId({ registrationId: 1 });
    console.log("Delete Assignment by Registration ID result:", result);
  },
};

runTests(Tests);
