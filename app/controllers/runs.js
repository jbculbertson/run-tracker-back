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

const userruns = (req, res, next) => {
  Run.find({_owner: req.user._id})
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
  console.log('req.body.run in run is: ', req.body.run)
  const run = Object.assign(req.body.run, {
    _owner: req.user._id,
    _ownerFirstName: req.user.firstName,
    _ownerLastName: req.user.lastName
  })
  console.log('after object.assign, run is: ', run)
  Run.create(run)
    .then(run =>
      res.status(201)
        .json({
          run: run.toJSON({ virtuals: true, user: req.user })
        }))
    .catch(next)
}

const update = (req, res, next) => {
  console.log('req.body in Updaterun is: ', req.body.run)
  delete req.body._owner  // disallow owner reassignment.
  req.run.update(req.body.run)
    .then(() => res.sendStatus(204))
    .catch(next)
  console.log('req.body in Updaterun is: ', req.body.run)
}

const destroy = (req, res, next) => {
  req.run.remove()
    .then(() => res.sendStatus(204))
    .catch(next)
}

module.exports = controller({
  index,
  userruns,
  show,
  create,
  update,
  destroy
}, { before: [
  { method: setUser, only: ['index', 'userruns', 'show'] },
  { method: authenticate, except: ['index', 'userruns', 'show'] },
  { method: setModel(Run), only: ['show'] },
  { method: setModel(Run, { forUser: true }), only: ['update', 'destroy'] }
] })
