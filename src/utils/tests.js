/* eslint-disable prettier/prettier */

// simple test runner for the tests object with unit tests as methods
const colors = {
  reset: "\x1b[0m",
  green: "\x1b[32m",
  red: "\x1b[31m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
};

const runTests = (Test) => {
  console.log(`${colors.blue}Starting test suite...${colors.reset}`);

  const testCount = Object.keys(Test).length;
  let passedCount = 0;

  Object.keys(Test).forEach((test) => {
    try {
      console.log(`\n${colors.yellow}Running test: ${test}${colors.reset}`);
      Test[test]();
      console.log(`${colors.green}✓ Passed: ${test}${colors.reset}`);
      passedCount++;
    } catch (error) {
      console.log(`${colors.red}✗ Failed: ${test}${colors.reset}`);
      console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    }
  });

  console.log(
    `\n${colors.blue}Test Results: ${passedCount}/${testCount} tests passed${colors.reset}`
  );
};

module.exports = {
  runTests,
};
