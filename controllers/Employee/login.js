const schemas = require('../../mongodb/schemas/schemas');
const bcrypt = require("bcryptjs");

const LoginEmployee = async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await schemas.Employee.findOne({ email: email });

      if (!user) {
        return res.status(400).json({
          "status": "failure",
          "message": "User not found",
        });
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
        
         

          res.status(200).json({
            "status": "success",
            "message": "Successfully authenticated",
            "employee": user,
          });
        } else {
          res.status(400).json({
            "status": "failure",
            "message": "Wrong email or password"
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        "status": "failure",
        "message": error.message
      });
    }
};

module.exports = LoginEmployee;