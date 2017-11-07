const express = require('express')
const app = express()
const bodyparser = require('body-parser')

app.use(bodyparser.json())

app.get('/api/shout/:word', function(req, res) {
  let word = req.params.word.toUpperCase() + '!!!'
  res.set('Content-Type', 'text/plain')
  res.status(200)
  res.send(word)
})

app.post('/api/array/merge', function(req, res) {
  const {a, b} = req.body
  res.set('Content-Type', 'application/json')

  if (Array.isArray(a) && Array.isArray(b)) { //Array.isArray is preferred over instanceof because it works through iframes.
    let mergedArray = []
    let minArrayLength = a.length < b.length ? a.length : b.length
    for (let i = 0; i < minArrayLength; i++) {
      mergedArray.push(a[i], b[i])
    }

    if (a[minArrayLength] !== undefined) {
      mergedArray = mergedArray.concat(a.slice(minArrayLength))
    } else {
      mergedArray = mergedArray.concat(b.slice(minArrayLength))
    }

    res.status(200)
    res.send({mergedArray})
  } else {
    res.status(400)
    res.send({"error": "Both keys in request body must be of type Array."})
  }
})

app.listen(3000)
