'use strict'

const mongoose = require('mongoose')

const runSchema = new mongoose.Schema({
  distance: {
    type: Number,
    required: true
  },
  timeTaken: {
    type: Number,
    required: true
  },
  route: {
    type: [[Number]],
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _ownerFirstName: {
    type: String,
    required: true
  },
  _ownerLastName: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function (doc, ret, options) {
      const userId = (options.user && options.user._id) || false
      ret.editable = userId && userId.equals(doc._owner)
      return ret
    }
  }
})

runSchema.virtual('avgPace').get(function () {
  return (this.timeTaken / this.distance).toFixed(2)
})

runSchema.virtual('ownerName').get(function () {
  return (this._ownerFirstName + ' ' + this._ownerLastName)
})

const Run = mongoose.model('Run', runSchema)

module.exports = Run
