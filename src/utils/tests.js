// simple test runner for the tests object with unit tests as methods
const runTests = (Test) => {
  Object.keys(Test).forEach((test) => {
    console.log(`Running test: ${test}`);
    Test[test]();
  });
  console.log("All tests completed.");
};

module.exports = {
  runTests,
};
