'use strict'

const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  total: {
    type: Number,
    required: true
  },
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _likedRun: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Run',
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

// likeSchema.virtual('length').get(function length () {
//   return this.text.length
// })

const Like = mongoose.model('Like', likeSchema)

module.exports = Like
