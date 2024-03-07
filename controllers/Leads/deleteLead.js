const schemas = require("../../mongodb/schemas/schemas");


const deleteLeadById = async (req, res) => {
  const lead_id = req.params.lead_id;

  try {
    const deletedLead = await schemas.Lead.findOne({lead_id:lead_id});

    if (!deletedLead) {
      return res.status(404).json({ message: "Lead not found." });
    }
    await schemas.Lead.deleteOne({lead_id});


    res.status(200).json({ message: "Lead deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteLeadById;

