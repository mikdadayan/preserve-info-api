// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");

const TEST_USER_ID = "6318e123c4daeda2a84tdd19";
const TEST_SECRET_KEY = "test_secret_key";

const generateAuthToken = () => {
  return jwt.sign({ user: { id: TEST_USER_ID } }, TEST_SECRET_KEY);
};

// eslint-disable-next-line no-console
console.log(generateAuthToken());
