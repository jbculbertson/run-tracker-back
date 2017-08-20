'use strict'

const mongooseBaseName = 'run-tracker-back'

const environment = process.env.NODE_ENV || 'development'
const database = {
  development: {
    mongoose: {
      name: `${mongooseBaseName}-development`,
      uri: `mongodb://localhost/${mongooseBaseName}-development`
    }
  },
  test: {
    mongoose: {
      name: `${mongooseBaseName}-test`,
      uri: `mongodb://localhost/${mongooseBaseName}-test`
    }
  }
}

module.exports = database[environment]
