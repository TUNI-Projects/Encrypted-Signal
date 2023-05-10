export const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/;

  if (!regex.test(password)) {
    let message = "Invalid password. ";

    if (password.length < 8) {
      message += "Password must be at least 8 characters long. ";
    }

    if (password.length > 32) {
      message += "Password must be at most 32 characters long. ";
    }

    if (!password.match(/[a-z]/)) {
      message += "Password must contain at least one lowercase letter. ";
    }

    if (!password.match(/[A-Z]/)) {
      message += "Password must contain at least one uppercase letter. ";
    }

    if (!password.match(/\d/)) {
      message += "Password must contain at least one digit. ";
    }

    if (!password.match(/[@$!%*?&]/)) {
      message +=
        "Password must contain at least one special character (@, $, !, %, *, ?, or &). ";
    }

    return message.trim();
  }

  return "Valid password!";
};
