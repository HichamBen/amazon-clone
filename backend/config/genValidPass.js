const crypto = require("crypto");

exports.generateHash = password => {
  const salt = crypto.randomBytes(64).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 30000, 64, "sha512")
    .toString("hex");
  return {
    salt,
    hash,
  };
};

exports.isValidPass = (password, hash, salt) => {
  const newHash = crypto
    .pbkdf2Sync(password, salt, 30000, 64, "sha512")
    .toString("hex");
  return newHash === hash;
};