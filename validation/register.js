const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!validator.isLength(data.name, { min: 3, max: 30 })) {
    errors.name = "Name must be between 3 and 30 Characters";
  }

  if (validator.isEmpty(data.name)) {
    errors.name = "Name is required";
  }

  if (!validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (validator.isEmpty(data.email)) {
    errors.email = "Email is required";
  }

  if (validator.isEmpty(data.password)) {
    errors.password = "password is invalid";
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "password must be between 6 and 30 Characters";
  }

  if (validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field required";
  }

  if (!validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
