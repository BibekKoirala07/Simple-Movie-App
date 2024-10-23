const jwt = require("jsonwebtoken");
const generateJwtToken = (_id) => {
  const token = jwt.sign({ _id }, process.env.SECRET, {
    expiresIn: "30d",
  });
  return token;
};

module.exports = generateJwtToken;
