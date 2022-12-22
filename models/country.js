const mongoose = require('mongoose');

const { Schema } = mongoose;

const countrySchema = new Schema(
 { 
  name: { type: String, required: true, max: 50 },
  languages: { type: [String], required: true },
  flag_img: { type: String, required: true, unique: true },
  capital_city: { type: String, required: true, max: 50 },
  tourism_cities: { type: [String], required: true },
  population: { type: Number, required: true }
 }
);

module.exports = mongoose.model('Country', countrySchema);