const schemas = require("../../mongodb/schemas/schemas");
const sendEmail = require("../../middleware/mailingService")
const createClient = async (req, res) => {
    const {
        title,
        gender,
        companyName,
        enquiryDate,
        source,
        brandName,
        clientName,
        phone1,
        phone2,
        email1,
        email2,
        website,
        gstNo,
        businessAddress,
        billingAddress,
        city,
        state,
        pincode,
        country,
        requirement,
        additionalInformation,
        status
    } = req.body;

    try {
        const singleFile = req.files.singleFile ? req.files.singleFile[0] : null;
        const multipleFiles = req.files.multipleFiles || [];
        const newClient = new schemas.Client({
            title,
            gender,
            companyName,
            enquiryDate,
            source,
            brandName,
            clientName,
            phone1,
            phone2,
            email1,
            email2,
            website,
            gstNo,
            businessAddress,
            billingAddress,
            city,
            state,
            pincode,
            country,
            requirement,
            additionalInformation,
            status,
            singleFile: singleFile ? singleFile.path : undefined,
            multipleFiles: multipleFiles.map(file => file.path)
        });

        const client = await newClient.save();

        await sendEmail(
            email1,
            "Welcome to the Company",
            `Welcome ${clientName}!`,
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
        <h1>Welcome to [Your Company Name], ${clientName}!</h1>
        <p>We're thrilled to have you on board and look forward to partnering with you. We're committed to supporting your success every step of the way.</p>
        <p>To get started, we've set up a personalized account for you where you can access all our resources and support.</p>
        <a href="https://yourcompany.com/client-onboarding" class="button">Access Your Account</a>
        <p>Here are a few resources to get you started:</p>
        <ul>
            <li><a href="https://yourcompany.com/getting-started">Getting Started Guide</a></li>
            <li><a href="https://yourcompany.com/resources">Resource Library</a></li>
            <li><a href="https://yourcompany.com/support">Support and Contact Information</a></li>
        </ul>
        <p>If you have any questions or need assistance, our support team is here for you. Don't hesitate to reach out.</p>
        <div class="footer">
            <p>Warmest welcome,<br>The [Your Company Name] Team</p>
        </div>
    </div>
    </body>
    </html>
    `
        );


        res.status(201).json({
            message: "client successfully created!",
            client, // Your lead object
            singleFileInformation: singleFile,
            multipleFilesInformation: multipleFiles
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = createClient;
//TODO UPDATE POSTMAN