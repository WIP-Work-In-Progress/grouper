const Participant = require("../../../models/participantModel");

// tests made to check if participantsTableModel.js work as intended based on how test_groupModel was made
// these are not unittests 
// use command node src/__tests__/unit/models/test_participantModel.js to run this test
// needs a clean database to work since "token" needs to be unique

const Tests = {
  getById: () => {
    const participant = Participant.getById(1);
    console.log("Participant by ID:", participant);
  },
  getAll: () => {
    const participants = Participant.getAll();
    console.log("All participants:", participants);
  },
  getByRegistrationId: () => {
    const participants = Participant.getByRegistrationId(1);
    console.log("Participants by registration ID:", participants);
  },
  getByLastName: () => {
    const participant = Participant.getByLastName("Kowa");
    console.log("Participants by last name:", participant);
  },
  getByFirstName: () => {
    const participant = Participant.getByFirstName("Ja");
    console.log("Participants by first name:", participant);
  },
  getByEmail: () => {
    const participant = Participant.getByEmail("jan@example.com");
    console.log("Participant by email:", participant);
  },
  getByAlbumNumber: () => {
    const participant = Participant.getByAlbumNumber("123451");
    console.log("Participant by album number:", participant);
  },
  create: () => {
    const result = Participant.create("Jan","Janowski", 1, '200200',"mail@asd.com","token_jan2",0);
    console.log("Create Participant result:", result);
  },
  update: () => {
    console.log("All participants before:", Participant.getAll());
    const result = Participant.update(1,"Jaan","Janoowski", 1, '201200',"maail@asd.com","token_jaan",1);
    console.log("Update Participant result:", result);
    console.log("All participants after:", Participant.getAll());
  },
  delete: () => {
    console.log("All participants before:", Participant.getAll());
    const result = Participant.delete(1);
    console.log("Delete Participant result:", result);
    console.log("All participants after:", Participant.getAll());
  },
};

const runTests = () => {
  Tests.getById();
  Tests.getAll();
  Tests.getByRegistrationId();
  Tests.getByLastName();
  Tests.getByFirstName();
  Tests.getByEmail();
  Tests.getByAlbumNumber();
  Tests.create();
  Tests.update();
  Tests.delete();
};

runTests();
