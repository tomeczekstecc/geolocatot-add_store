const mongoose = require('mongoose');
const geocoder = require('../utils/geocoder');

const StoreSchema = mongoose.Schema({
  storeId: {
    type: String,
    required: [true, 'Dodaj proszę ID sklepu'],
    unique: true,
    trim: true,
    maxlength: [10, ' ID sklepu nie może mieć więcxej niż  10 znaków']
  },
  adress: {
    type: String,
    required: [true, 'Dodaj proszę adres']
  },
  location: {
    type: {
      type: String,
      enum: ['Point']
    },
    coordinates: {
      type: [Number],
      index: '2dsphere'
    },
    formattedAdress: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Geo
StoreSchema.pre('save', async function(next) {
  const loc = await geocoder.geocode(this.adress);
  this.location = {
    type: 'Point',
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAdress: loc[0].formattedAddress
  };
//do not save adress
this.adress=undefined

  next()
  console.log(loc);
});

module.exports = mongoose.model('store', StoreSchema);
