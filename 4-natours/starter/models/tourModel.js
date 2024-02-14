const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
  },
  ratings: {
    type: Number,
    default: 4.5,
  },
  ratingsAvarage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  duration: {
    type: Number,
    required: [true, 'Please add a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Please add a maxGroupSize'],
  },
  difficulty: {
    type: String,
    required: [true, 'Please add a difficulty'],
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'Please add a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'Please add an imageCover'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
