const Preference = require("../../../models/preferenceModel");

// use command node src/__tests__/unit/models/test_preferenceModel.js to run this test

const Tests = {
  getById: () => {
    const preference = Preference.getById(1);
    console.log("preference by ID:", preference);
  },
  getAll: () => {
    const preferences = Preference.getAll();
    console.log("All preferences:", preferences);
  },
  getByParticipantId: () => {
    const preference = Preference.getByParticipantId(1);
    console.log("preferences by participant ID:", preference);
  },
  getByGroupId: () => {
    const preference = Preference.getByGroupId(1);
    console.log("preferences by group ID:", preference);
  },
  create: () => {
    const result = Preference.create(2, 2, 2);
    console.log("Create preference result:", result);
  },
  update: () => {
    const result = Preference.update(5, 2, 3, 1);
    console.log("Update preference result:", result);
  },
  delete: () => {
    const result = Preference.delete(3);
    console.log("Delete preference result:", result);
  },
};

const runTests = () => {
  Tests.getById();
  Tests.getAll();
  Tests.getByParticipantId();
  Tests.getByGroupId();
  // Tests.create();
  Tests.update();
  Tests.delete();
};

runTests();
