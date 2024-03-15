const schemas = require("../../mongodb/schemas/schemas");

    const createLead = async (req, res) => {
    var {
        title,
        gender,
        companyName,
        enquiryDate,
        source,
        sourceInformation,
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
        enquiryDate = convertDateFormat(enquiryDate);

        const singleFile = req.files.singleFile ? req.files.singleFile[0] : null;
        const multipleFiles = req.files.multipleFiles || [];
        const newLead = new schemas.Lead({
            title,
            gender,
            companyName,
            enquiryDate,
            source,
            sourceInformation,
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
            singleFile: singleFile ? singleFile.filename : undefined,
            multipleFiles: multipleFiles.map(file => file.filename),
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
