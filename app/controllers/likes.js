'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Like = models.like
const Run = models.run

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Like.find()
    .then(likes => res.json({
      likes: likes.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    like: req.like.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const like = Object.assign(req.body.like, {
    _owner: req.user._id,
    _ownerFullName: req.user.fullName
  })
  let targetRun = {}
  Run.findById(req.body.like._run_id)
    .then((run) => {
      targetRun = run
      return Like.create(like)
    })
    .then((like) => {
      targetRun.likes.push(like)
      return targetRun.save()
    })
    .then(() => res.sendStatus(204))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.like.update(req.body.like)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.like.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'show'] },
  { method: authenticate, except: ['index', 'show'] },
  { method: setModel(Like), only: ['show'] },
  { method: setModel(Like, { forUser: true }), only: ['update', 'destroy'] }
] })
