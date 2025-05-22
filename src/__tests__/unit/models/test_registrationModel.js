const Registration = require("../../../models/registrationModel");

// use command node src/__tests__/unit/models/test_registrationsModel.js to run this test

const Tests = {
  getById: () => {
    const registration = Registration.getById(1);
    console.log("Registration by ID:", registration);
  },
  getAll: () => {
    const registrations = Registration.getAll();
    console.log("All registrations:", registrations);
  },
  getByRegistrationId: () => {
    const registrations = Registration.getById(1);
    console.log("Registrations by ID:", registrations);
  },
  getByName: () => {
    const registration = Registration.getByName("Zapisy na semestr letni");
    console.log("Registration by name:", registration);
  },
  create: () => {
    const result = Registration.create("Test Registration", "123ABC", "Haslo1!", "2025-05-22T00:00:00", "2025-05-23T00:00:00", "2025-05-25T00:00:00");
    console.log("Create registration result:", result);
  },
  update: () => {
    const result = Registration.update(2, "Updated Test Registration", "updated_token", "updated_admin_password_hash", "2025-05-22(updated)", "2025-05-22(updated)", "2025-05-22(updated)");    
    console.log("Update registration result:", result);
  },
delete: () => {
        const result = Registration.delete(6);
        console.log("Delete registration result:", result);
    },
};

const runTests = () => {
  Tests.getById();
  Tests.getAll();
  Tests.getByName();
  Tests.create();
  Tests.update();
  Tests.delete();
};

runTests();
