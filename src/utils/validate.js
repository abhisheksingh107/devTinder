const User = require("../model/user");
const validator = require("validator");

const validateSignUpData = async (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  const trimmedFirstName = validator.trim(firstName);
  const trimmedLastName = validator.trim(lastName);
  const nameRegrex = /^[a-zA-Z]+$/;

  // Check if names are empty first
  if (!trimmedFirstName || !trimmedLastName) {
    throw new Error("Name is not valid");
  }

  // Now check if names contain only letters (fail if they don't)
  if (!nameRegrex.test(trimmedFirstName) || !nameRegrex.test(trimmedLastName)) {
    throw new Error("Name must contain only letters");
  }

  // Validate email
  if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  }

  // validate Password
  if (
    !validator.isStrongPassword(password, {
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    throw new Error(
      "Password must be at least 8 characters with upper/lowercase letters, a number, and a symbol"
    );
  }

  const userExist = await User.findOne({ emailId: emailId });
  if (userExist) {
    throw new Error("User already exists");
  }
};

module.exports = { validateSignUpData };
