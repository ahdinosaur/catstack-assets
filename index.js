const { assign } = Object
const Url = require('url')
const Assets = require('bankai')
const Accept = require('accepts')

module.exports = {
  needs: {
    config: {
      vas: {
        assets: {
          entryFile: 'first',
          // TODO these should probably be
          // nested plugs not object plugs.
          js: 'first',
          css: 'first',
          html: 'first',
          optimize: 'first'
        }
      }
    }
  },
  gives: {
    config: {
      vas: {
        assets: {
          js: true,
          css: true,
          html: true,
          optimize: true
        }
      }
    },
    vas: {
      http: {
        handler: true
      }
    }
  },
  create: (api) => {
    return {
      config: {
        vas: {
          assets: {
            js: () => {},
            css: () => {},
            html: () => {},
            optimize: () => {}
          }
        }
      },
      vas: {
        http: {
          handler
        }
      }
    }

    function handler () {
      const config = api.config.vas.assets
      const entryFile = config.entryFile()
      const options = {
        js: assign(config.js() || {}, {
          debug: process.env.NODE_ENV !== 'production'
        }),
        css: config.css(),
        html: assign(config.html() || {}, {
          head: `
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <base href="/">
          `
        }),
        optimize: config.optimize()
      }

      const assets = Assets(entryFile, options)

      return (req, res, context, next) => {
        // TODO add this to context in vas
        // for all http handlers
        const url = Url.parse(req.url)
        const accept = Accept(req)

        switch (url.pathname) {
          case '/':
            return next(null, assets.html(req, res))
          case '/bundle.js':
            return next(null, assets.js(req, res))
          case '/bundle.css':
            return next(null, assets.css(req, res))
        }

        switch (accept.type(['html'])) {
          case 'html':
            return next(null, assets.html(req, res))
        }

        return next(null)
      }
    }
  }
}
