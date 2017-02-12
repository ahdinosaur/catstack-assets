const { join } = require('path')
const combine = require('depject')
const Log = require('catstack-log')
const Http = require('catstack-http')
const Assets = require('../')

const Config = {
  gives: {
    config: {
      assets: {
        entryFile: true
      }
    }
  },
  create: () => ({
    config: {
      assets: {
        entryFile: () => {
          return join(__dirname, '/client.js')
        }
      }
    }
  })
}

const modules = {
  Config,
  Log,
  Http,
  Assets
}

const sockets = combine(modules)

sockets.server.start.map(s => s())
