# catstack-assets

asset handler and compiler for [catstack@2.0.0-pre](https://github.com/enspiral-root-systems/catstack/tree/v3)

depends on [catstack/modules/http](https://github.com/enspiral-root-systems/catstack)

```shell
npm install --save catstack-assets
```

## example

```js
const { join } = require('path')
const combine = require('depject')
const Log = require('catstack-log')
const Http = require('catstack/modules/http')
const Assets = require('catstack-assets')

const Config = {
  gives: {
    config: {
      catstack: {
        assets: {
          entryFile: true
        }
      }
    }
  },
  create: () => ({
    config: {
      catstack: {
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

sockets.catstack.start.map(s => s())
```

## usage

### `Assets = require('catstack-assets')`

## license

The Apache License

Copyright &copy; 2017 Michael Williams

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
