const schemas = require("../../mongodb/schemas/schemas");
const bcrypt = require("bcryptjs");
const sendEmail = require("../../middleware/mailingService")

const hashPassword = async (password) => {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
};
//TODO UPDTAE HERE AND POSTMAN
const createEmployee = async (req, res) => {
    var {
        name,
        gender,
        contactNo,
        title,
        dob,
        position,
        department,
        email,
        password,
        joiningDate,
        manager_id,
        probationPeriod,
        leavingDate,
        permissions,
        aadharNumber,
        panNumber,
        permanentAddress,
        correspondenceAddress,
        guardianDetails,
        bankDetails,
        designation,
        type,
        relation,
    } = req.body;

    try {
        const convertDateFormat = (dateString) => {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
                return dateString; 
            }
            let day = date.getDate().toString().padStart(2, '0');
            let month = (date.getMonth() + 1).toString().padStart(2, '0'); 
            let year = date.getFullYear().toString().slice(-2);
        
            return `${day}-${month}-${year}`;
        };
        dob = convertDateFormat(dob);
        joiningDate = convertDateFormat(joiningDate);

        // Check for an existing employee with the same email
        const existingEmployee = await schemas.Employee.findOne({ email: email });

        if (existingEmployee) {
            return res.status(400).json({ message: "Employee with this email is already registered" });
        }

        const hashedPassword = await hashPassword(password);

        const employee = new schemas.Employee({
            name,
            gender,
            contactNo,
            title,
            dob,
            position,
            department,
            email,
            password: hashedPassword,
            joiningDate,
            manager_id,
            probationPeriod,
            leavingDate,
            permissions: permissions || ['read_access'], // Default permissions if not provided
            aadharNumber,
            panNumber,
            permanentAddress,
            correspondenceAddress,
            guardianDetails: {
                guardianName: guardianDetails.guardianName,
                guardianContactNo: guardianDetails.guardianContactNo,
                relation:guardianDetails.relation
             
            },
            bankDetails: {
                bankName: bankDetails.bankName,
                bankAccountNo: bankDetails.bankAccountNo,
                bankIfscCode: bankDetails.bankIfscCode,
                type: bankDetails.type
            },
            designation,
            type,
        });
            await sendEmail(
                email,
                "Welcome to the Company",
                `Welcome ${name}! Your account has been created. Your initial password is ${password}. Please change it upon your first login.`,
                `<!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                    body { font-family: Arial, sans-serif; margin: 0; padding: 20px; color: #333; background-color: #f4f4f4; }
                    .container { background-color: #fff; padding: 20px; border-radius: 5px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); }
                    h1 { color: #007bff; }
                    p { line-height: 1.6; }
                    .footer { margin-top: 20px; font-size: 0.9em; text-align: center; color: #666; }
                    .button { background-color: #007bff; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; }
                </style>
                </head>
                <body>
                <div class="container">
                    <h1>Welcome to the Company, ${name}!</h1>
                    <p>Your account has been created successfully. For your security, we have not included your password in this email.</p>
                    <p>Please follow the link below to set up your password and access your account:</p>
                    <a href="https://yourcompany.com/set-password" class="button">Set Your Password</a>
                    <p>If you did not request this account or if you have any questions, please contact our support team.</p>
                    <div class="footer">
                        <p>Thank you for joining us!<br>The Company Team</p>
                    </div>
                </div>
                </body>
                </html>
                `
            );
            await employee.save();
            console.log("Saved to the employee collection.");
            console.log(employee);
          
            res.status(200).json({
                message: "Employee successfully registered!",
            });
        }
     catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = createEmployee;

   //relation
                //docs
                //TODO
                //designation fill