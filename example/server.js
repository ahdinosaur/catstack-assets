const { join } = require('path')
const combine = require('depject')
const Log = require('catstack-log')
const Http = require('vas-http')
const Assets = require('../')

const Config = {
  gives: {
    config: {
      vas: {
        assets: {
          entryFile: true
        }
      }
    }
  },
  create: () => ({
    config: {
      vas: {
        assets: {
          entryFile: () => {
            return join(__dirname, '/client.js')
          }
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

sockets.vas.start.map(s => s())
