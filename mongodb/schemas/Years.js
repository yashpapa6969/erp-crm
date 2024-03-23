const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const yearSchema = new mongoose.Schema({
    year_id: { type: String, default: uuidv4,        index: true 
    },
    financial_year: {
        type: String,
        required: true, 
        validate: {
          validator: function(v) {
            return /\d{4}-\d{4}/.test(v);
          },
          message: props => `${props.value} is not a valid financial year format!`
        }
      }
   

}, );

const Year = mongoose.model('Year', yearSchema);

module.exports = Year;
