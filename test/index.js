const test = require('tape')

const vasAssets = require('../')

test('vas-assets', function (t) {
  t.ok(vasAssets, 'module is require-able')
  t.end()
})
