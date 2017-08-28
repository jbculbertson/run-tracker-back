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
  console.log('req.user is ', req.user)
  console.log('req.body is ', req.body.like)
  const like = Object.assign(req.body.like, {
    _owner: req.user._id
  })
  console.log('after object.assign, like is: ', like)
  // Like.create(like)
  //   .then(like =>
  //     res.status(201)
  //       .json({
  //         like: like.toJSON({virtuals: true, user: req.user})
  //       }))
  //   .catch(next)
  Run.update(
    { _id: req.body.like._run_id },
    { $push: { likes: like } }
  )
  .then(data => {
    console.log('after run.update, data is: ', data)
    return data
  })
    .then((like) => res.sendStatus(204))
    .catch(next)
}
  // Run.findOne(id, {$set: { size: 'large' }}, { new: true }, function (err, tank) {
  //   res.send(tank)
  // });
  // Like.findOne().update(run.likes.push(data))

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
