# cssauron-json

[CSSauron](http://npm.im/cssauron) preconfigured for JSON nodes 
emitted from [json-parse-stream](http://npm.im/json-parse-stream).

```javascript

var css = require('cssauron-json')
  , json = require('json-parse-stream')()

var sel = css('.key > .val')

json.write('{"key": {"val": 3, "key": 2}}')
    .on('data', function(node) {
      if(sel(node)) {
        console.log(node)  // emits for top level key only
      }
    })

```

## api

`.class` maps to the `key` attribute of a node.
`tag` queries may be `object`, `array`, `string`, `number`, `null`, `boolean`.
`>` operators are allowed, but `~` and `+` are not.

# License

MIT
