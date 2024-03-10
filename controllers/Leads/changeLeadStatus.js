const schemas = require("../../mongodb/schemas/schemas");

async function updateLeadStatus(req, res) {

    try {
        const { lead_id } = req.params;
        const { status } = req.params;

        const lead = await schemas.Lead.findOne({ lead_id: lead_id });
        console.log(lead);

        if (!lead) {
            return res.status(404).json({ message: "Lead not found" });
        }

        switch (parseInt(status)) {
            case 0:
                lead.status = 'Raw';
                break;
            case 1:
                lead.status = 'In-Progress';
                break;
            case 2:
                lead.status = 'Converted';
                const clientData = {
                    companyName:lead.companyName,
                    enquiryDate: lead.enquiryDate,
                    source: lead.source,
                    brandName: lead.brandName,
                    clientName: lead.clientName,
                    phone1: lead.phone1,
                    phone2: lead.phone2 || undefined,
                    email1: lead.email1,
                    email2: lead.email2 || undefined,
                    website: lead.website || undefined,
                    businessAddress: lead.businessAddress || undefined,
                    city: lead.city || undefined,
                    state: lead.state || undefined,
                    pincode: lead.pincode || undefined,
                    country: lead.country || undefined,
                    requirement: lead.requirement || undefined,
                    additionalInformation: lead.additionalInformation || undefined,
                    singleFile: lead.singleFile || undefined,
                    multipleFiles: lead.multipleFiles || [],
                    clientBirthday: lead.clientBirthday || undefined,
                    gstNo: lead.gstNo || undefined,
                    clientAnniversary: lead.clientAnniversary || undefined,
                    workStartDate: lead.workStartDate || undefined,
                    companyAnniversary: lead.companyAnniversary || undefined,
                    title:lead.title,
                    gender:lead.gender,
                    
                };
                const newClient = new schemas.Client(
                    clientData
                );
                await newClient.save();
                await schemas.Lead.deleteOne({lead_id});

                break;
            case 3:
                lead.status = 'Lost';
                break;
            default:
                lead.status = 'Raw';
                break;
        }

        await lead.save();

        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = updateLeadStatus;
