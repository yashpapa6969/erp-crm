const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const durationSchema = new mongoose.Schema({
    duration_id: { type: String, default: uuidv4,        index: true 
    },
    duration: {
        type: String,
        required: true, 
      }
   

}, );

const Duration = mongoose.model('Duration', durationSchema);

module.exports = Duration;
