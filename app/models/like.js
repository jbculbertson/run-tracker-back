'use strict'

const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
  _owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  _ownerFullName: {
    type: String,
    required: true
  },
  _run_id: {
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

const Like = mongoose.model('Like', likeSchema)

module.exports = Like
