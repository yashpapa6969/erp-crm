const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const uhlSchema = new mongoose.Schema({
    uuid: {
        type: String,
        default: uuidv4,
        unique: true,
        index: true
    },

  
    text: {
        type: String,
        required: true
    },
    
    createdAt: { type: Date, default: Date.now }, // Added createdAt field

    date1: {
        type: String,
        default: function () {
            const currentDate = new Date();
            const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
            const istDate = new Date(currentDate.getTime() + istOffset);
            const year = istDate.getFullYear().toString().slice(-2); // Extract last two digits
            const month = (istDate.getMonth() + 1).toString().padStart(2, "0"); // Zero-padded
            const day = istDate.getDate().toString().padStart(2, "0"); // Zero-padded
            return `${day}-${month}-${year}`;
          },
        unique: false,
      },
     
      

      time1: {
        type: String,
        default: function () {
          const currentDate = new Date();
          const istOffset = 5.5 * 60 * 60 * 1000; // IST offset in milliseconds
          const istTime = new Date(currentDate.getTime() + istOffset);
          const hours = istTime.getUTCHours().toString().padStart(2, "0"); // Zero-padded
          const minutes = istTime.getUTCMinutes().toString().padStart(2, "0"); // Zero-padded
          const seconds = istTime.getUTCSeconds().toString().padStart(2, "0"); // Zero-padded
          return `${hours}:${minutes}:${seconds}`;
        },
        unique: false,
      },
});

const Uhl = mongoose.model('uhl', uhlSchema);

module.exports = Uhl;
