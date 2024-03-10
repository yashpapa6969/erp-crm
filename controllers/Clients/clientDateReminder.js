const schemas = require("../../mongodb/schemas/schemas");

const getOneMonthFromNowRange = () => {
    const today = new Date();
    const oneMonthFromNow = new Date(new Date().setMonth(today.getMonth() + 1));
    today.setHours(0, 0, 0, 0);
    oneMonthFromNow.setHours(23, 59, 59, 999);
  
    return { today, oneMonthFromNow };
  };
  

  specialDates= async (req, res) => {
    const { today, oneMonthFromNow } = getOneMonthFromNowRange();
    
    try {
      const clients = await schemas.Client.find({
        $or: [
          { clientBirthday: { $gte: today, $lte: oneMonthFromNow } },
          { clientAnniversary: { $gte: today, $lte: oneMonthFromNow } },
          { workStartDate: { $gte: today, $lte: oneMonthFromNow } },
          { companyAnniversary: { $gte: today, $lte: oneMonthFromNow } }
        ]
      });
  
      res.json(clients);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = specialDates;
    