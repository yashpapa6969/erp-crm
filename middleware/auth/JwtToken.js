const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const schemas = require('../../mongodb/schemas/schemas');

dotenv.config({ path: "./.env" });

const CreateToken = (data) => {
  const token = jwt.sign({ data }, process.env.TOKEN_SECRET, {
    expiresIn: "365d",
  });
  return token;
};


const VerifyToken = async (token) => {
  try {
    console.log("Token to verify:", token);

    // Verify the token using the secret from your environment variables
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log("Decoded token:", decoded);

    // Find the user by team_id from the decoded token
    const user = await schemas.Team.findOne({ team_id: decoded.data.team_id });

    if (!user) {
      console.log("User not found");
      return null; // The user does not exist
    }

    console.log("User found:", user);
    console.log("User's session token:", user.sessionToken); // Fixed logging statement

    // Compare the stored sessionToken with the provided token
    if (user.sessionToken === token) {
      console.log("Token is valid");
      return decoded; // The token is valid
    } else {
      console.log("Token is invalid");
      return false; // The token is invalid
    }
  } catch (error) {
    console.error("Verification error:", error);
    return null; // The token is invalid due to error
  }
};


const AuthFunctions = {
  CreateToken: CreateToken,
  VerifyToken: VerifyToken
};

module.exports = AuthFunctions;