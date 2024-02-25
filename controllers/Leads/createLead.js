const schemas = require("../../mongodb/schemas/schemas");

    const createLead = async (req, res) => {
    const {
        enquiryDate,
        source,
        brandName,
        firstName,
        lastName,
        phone1,
        phone2,
        email1,
        email2,
        website,
        businessAddress,
        city,
        state,
        pincode,
        country,
        requirement,
        additionalInformation,
        status
    } = req.body;

    try {
        const newLead = new schemas.Lead({
            enquiryDate,
            source,
            brandName,
            firstName,
            lastName,
            phone1,
            phone2,
            email1,
            email2,
            website,
            businessAddress,
            city,
            state,
            pincode,
            country,
            requirement,
            additionalInformation,
            status
        });

        const lead = await newLead.save();

      
        res.status(201).json({ message: "Lead successfully created!", lead });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = createLead;
