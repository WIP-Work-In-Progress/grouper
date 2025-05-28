const { assignmentService } = require("../../../services");
const { runTests } = require("../../../utils/tests");

// use command node src/__tests__/unit/services/test_assignmentService.js to run this test

const Tests = {
  createAssignments: () => {
    const result = assignmentService.createAssignments(1);
    console.log("Create Assignment result:", result);
  },
};

runTests(Tests);
