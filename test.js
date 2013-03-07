var test = require('tape')
  , language = require('./index')
  , parse = require('json-parse-stream')
  , EE = require('events').EventEmitter

test("test select class", function test_select_single(t) {
  var json = JSON.stringify({
    cls: "hello"
  , nested: { cls: "hi there" }
  , greeting: "hello world"
  , array: [ 0, 1, 2, 3 ]
  })

  var string_class = language('.cls')

  var ee = new EE
    , p = parse()
    , expect = ['hello', 'hi there']

  p.on('data', function(data) { 
    if(string_class(data)) { ee.emit('data', data.value) }
  })
  ee.on('data', function(data) {
    var next = expect.shift()
    t.equal(data, next)
  })
  p.on('end', function() {
    t.equal(expect.length, 0)
    t.end()
  })
  p.write(json)
  p.end()
  t.end()
})

test("test select nested", function test_select_single(t) {
  var json = JSON.stringify({
    cls: "hello"
  , nested: { cls: "hi there" }
  , greeting: "hello world"
  , array: [ 0, 1, 2, 3 ]
  })

  var ee = new EE
    , p = parse()
    , expect = ['hi there']

  var nested_class = language('.nested > .cls')

  p.on('data', function(data) { 
    if(nested_class(data)) { ee.emit('data', data.value) }
  })
  ee.on('data', function(data) {
    var next = expect.shift()
    t.equal(data, next)
  })
  p.on('end', function() {
    t.equal(expect.length, 0)
    t.end()
  })
  p.write(json)
  p.end()
  t.end()
})

test("test select tag", function test_select_single(t) {
  var json = JSON.stringify({
    cls: "hello"
  , nested: { cls: "hi there" }
  , greeting: "hello world"
  , array: [ 0, 1, 2, 3 ]
  })

  var ee = new EE
    , p = parse()
    , expect = ['hello', 'hi there', 'hello world']
    , any_string = language('string')

  p.on('data', function(data) { 
    if(any_string(data)) { ee.emit('data', data.value) }
  })
  ee.on('data', function(data) {
    var next = expect.shift()
    t.equal(data, next)
  })
  p.on('end', function() {
    t.equal(expect.length, 0)
    t.end()
  })
  p.write(json)
  p.end()

})
