const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const tagSchema = new mongoose.Schema({
    tag_id: { type: String, default: uuidv4,        index: true 
    },
  
   tagName: {
        type: String,
        required: true
    },


}, );

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
