const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema(
 { 
  first_name: { type: String, required: true, max: 100 },
  last_name: { type: String, required: true,  max: 100 },
  email: { type: String, required: true, match: /.+\@.+\..+/, unique: true },
  password: { type: String, required: true, max: 255 }
 }
);

module.exports = mongoose.model('User', userSchema);