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
  route: []
  // ,
  // _owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true
    // ,
    // transform: function (doc, ret, options) {
    //   const userId = (options.user && options.user._id) || false
    //   ret.editable = userId && userId.equals(doc._owner)
    //   return ret
    // }
  }
})

// runSchema.virtual('length').get(function length () {
//   return this.text.length
// })

const Run = mongoose.model('Run', runSchema)

module.exports = Run
