'use strict'

const controller = require('lib/wiring/controller')
const models = require('app/models')
const Run = models.run

const authenticate = require('./concerns/authenticate')
const setUser = require('./concerns/set-current-user')
const setModel = require('./concerns/set-mongoose-model')

const index = (req, res, next) => {
  Run.find()
    .then(runs => res.json({
      runs: runs.map((e) =>
        e.toJSON({ virtuals: true, user: req.user }))
    }))
    .catch(next)
}

const show = (req, res) => {
  res.json({
    run: req.run.toJSON({ virtuals: true, user: req.user })
  })
}

const create = (req, res, next) => {
  const run = Object.assign(req.body.run, {
    _owner: req.user._id
  })
  console.log(req.body)
  Run.create(run)
    .then(run =>
      res.status(201)
        .json({
          run: run.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  delete req.body._owner  // disallow owner reassignment.
  req.run.update(req.body.run)
    .then(() => res.sendStatus(204))
    .catch(next)
}

const destroy = (req, res, next) => {
  req.run.remove()
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
  { method: setModel(Run), only: ['show'] },
  { method: setModel(Run, { forUser: true }), only: ['update', 'destroy'] }
] })
