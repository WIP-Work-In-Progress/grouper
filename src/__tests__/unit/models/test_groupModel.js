const Group = require("../../../models/groupModel");

// NOTE: This is not proper unit testing, but rather a functional test
// that checks if the database operations work as expected.
// use command node src/__tests__/unit/models/test_groupModel.js to run this test

const Tests = {
  getById: () => {
    const group = Group.getById(1);
    console.log("Group by ID:", group);
  },
  getAll: () => {
    const groups = Group.getAll();
    console.log("All groups:", groups);
  },
  getByRegistrationId: () => {
    const groups = Group.getByRegistrationId(1);
    console.log("Groups by registration ID:", groups);
  },
  getByName: () => {
    const group = Group.getByName("Grupa");
    console.log("Group by name:", group);
  },
  create: () => {
    const result = Group.create("Test Group", 1, 10);
    console.log("Create group result:", result);
  },
  update: () => {
    const result = Group.update(1, "Updated Test Group", 1, 20);
    console.log("Update group result:", result);
  },
  delete: () => {
    const result = Group.delete(2);
    console.log("Delete group result:", result);
  },
};

const runTests = () => {
  Tests.getById();
  Tests.getAll();
  Tests.getByRegistrationId();
  Tests.getByName();
  Tests.create();
  Tests.update();
  Tests.delete();
};

runTests();
