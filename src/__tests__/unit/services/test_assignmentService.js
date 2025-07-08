const { assignmentService } = require("../../../services");
const { runTests } = require("../../../utils/tests");

// use command node src/__tests__/unit/services/test_assignmentService.js to run this test

const Tests = {
  createAssignments: () => {
    const result = assignmentService.createAssignments({ registrationId: 1 });
    console.log("Create Assignment result:", result);
  },

  getResults: () => {
    const result = assignmentService.getResults({ registrationId: 1 });
    console.log("Get Results result:", result);
  },

  getResultsByParticipant: () => {
    const result = assignmentService.getResults({
      registrationId: 1,
      participantId: 1,
    });
    console.log("Get Results By Participant result:", result);
  },

  getResultsByGroup: () => {
    const result = assignmentService.getResults({
      registrationId: 1,
      groupId: 1,
    });
    console.log("Get Results By Group result:", result);
  },

  clearRegistration: () => {
    const result = assignmentService.clearRegistration({ registrationId: 1 });
    const registration = assignmentService.getResults({ registrationId: 1 });
    console.log("Clear Registration result:", result);
    console.log("Registration after clear:", registration);
  },
};

runTests(Tests);
