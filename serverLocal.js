const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const books = require('./data/books.json');
const authors = require('./data/author.json');
const fs = require('fs');

const port = 4444

app.use(bodyParser.json())

app.post('/book', (req, res) => {
  if(books.filter(el => el.id === req.body.id).length) {
    res.status(400).json({
      message: 'Already Exists'
    })
    return;
  }
  books.push(req.body);
  fs.writeFileSync('./data/books.json', JSON.stringify(books, null, 2), 'utf-8');
  res.json(req.body);
})

app.post('/author', (req, res) => {
  if(authors.filter(el => el.id === req.body.id).length) {
    res.status(400).json({
      message: 'Already Exists'
    })
    return;
  }
  authors.push(req.body);
  fs.writeFileSync('./data/author.json', JSON.stringify(authors, null, 2), 'utf-8');
  res.json(req.body);
})


app.get('/book', (req, resob) => {
  let res = books;
  if(req.query.ids) {
    const idsArr = req.query.ids.split(',').map(Number);
    res = res.filter(el => idsArr.indexOf(el.id) >= 0);
  }
  if(req.query.authorIds) {
    const authorIdsArr = req.query.authorIds.split(',').map(Number);
    res = res.filter(el => el.authorIds.some(aid => authorIdsArr.indexOf(aid) >= 0));
  }
  resob.json(res);
})


app.get('/author', (req, resob) => {
  let res = authors;
  if(req.query.ids) {
    const ids = req.query.ids.split(',').map(Number)
    res = authors.filter(el => ids.indexOf(el.id) >= 0);
  }
  resob.json(res);
})


app.listen(port, () => console.log('service up on 4444'))