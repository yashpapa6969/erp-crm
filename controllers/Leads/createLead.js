const schemas = require("../../mongodb/schemas/schemas");

    const createLead = async (req, res) => {
    const {
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
        const newLead = new schemas.Lead({
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

        const lead = await newLead.save();

      
        res.status(201).json({
            message: "Lead successfully created!",
            lead, // Your lead object
            singleFileInformation: singleFile,
            multipleFilesInformation: multipleFiles
          });    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = createLead;
//TODO UPDATE POSTMAN