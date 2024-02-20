const mongoose = require('mongoose');
// eslint-disable-next-line import/no-extraneous-dependencies
const slugify = require('slugify');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'Name cannot be more than 40 characters'],
      minlength: [5, 'Name cannot be less than 5 characters'],
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: '{VALUE} is not a valid difficulty',
      },
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only poinst to current doc on the NEW document creation
          return val < this.price;
        },
        message: 'Price discount ({VALUE}) cannot be greater than price',
      },
    },
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
    slug: {
      type: String,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

tourSchema.virtual('durationWeekes').get(function () {
  return this.duration / 7;
});

tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// eslint-disable-next-line prefer-arrow-callback
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`Run time ${Date.now() - this.start}`);
  next();
});

tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
