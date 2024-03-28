const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const supplyTagSchema = new mongoose.Schema({
    supply_id: { type: String, default: uuidv4,        index: true     },
  
   supplyTagName: {
        type: String,
        required: true
    },


}, );

const supplyTag = mongoose.model('supplyTag', supplyTagSchema);

module.exports = supplyTag;
