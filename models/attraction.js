const mongoose = require('mongoose');
const { Schema } = mongoose;

const attractionSchema = new Schema(
 { 
  name: { type: String, required: true, max: 100, unique: true },
  country: { type: String, required: true, max: 50 },
  affiliation: { type: String, required: true, max: 10 },
  attraction_img: { type: String, required: true, unique: true },
  key: { type: String, required: true }
 }
);

module.exports = mongoose.model('Attraction', attractionSchema);