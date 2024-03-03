const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const sourceTagSchema = new mongoose.Schema({
    source_tag_id: { type: String, default: uuidv4,        index: true     },
  
   sourceTagName: {
        type: String,
        required: true
    },


}, );

const sourceTag = mongoose.model('sourceTag', sourceTagSchema);

module.exports = sourceTag;
