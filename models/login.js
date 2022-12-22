const mongoose = require('mongoose');
const { Schema } = mongoose;

const loginSchema = new Schema(
 { 
  email: { type: String, required: [ true, "Email Address is required" ], match: /.+\@.+\..+/, unique: true },
  password: { type: String, required: [ true, "Password is required" ], max: 255 }
 }
);

module.exports = mongoose.model('Login', loginSchema);