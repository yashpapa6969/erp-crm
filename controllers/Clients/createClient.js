const schemas = require("../../mongodb/schemas/schemas");
const sendEmail = require("../../middleware/mailingService")

const createClient = async (req, res) => {
    const {
        clientName,
        contactName,
        email,
        phone,
        industry,
        notes,
        vatNumber,
        website,
        groups,
        currency,
        defaultLanguage,
        address,
        city,
        state,
        zipCode,
        country
    } = req.body;

    try {
        // Check for an existing client with the same email
        const existingClient = await schemas.Client.findOne({ email: email });

        if (existingClient) {
            res.status(400).json({ message: "Client with this email is already registered" });
        } else {
            const client = new schemas.Client({
                clientName,
                contactName,
                email,
                phone,
                industry,
                notes,
                vatNumber,
                website,
                groups,
                currency,
                defaultLanguage,
                address,
                city,
                state,
                zipCode,
                country
            });
            await sendEmail(
                email,
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
            await client.save();
            console.log("Saved to the client collection.");
            console.log(client);
            res.status(200).json({
                message: "Client successfully registered!",
            });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = createClient;
