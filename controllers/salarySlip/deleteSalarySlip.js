const schemas = require("../../mongodb/schemas/schemas");


const deleteSlipById = async (req, res) => {
  const slip_id = req.params.slip_id;

  try {
    const deletedSlip = await schemas.salarySlip.findOne({slip_id:slip_id});

    if (!deletedSlip) {
      return res.status(404).json({ message: "Slip not found." });
    }
    await schemas.salarySlip.deleteOne({slip_id});


    res.status(200).json({ message: "Slip deleted successfully." });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports =  deleteSlipById;

