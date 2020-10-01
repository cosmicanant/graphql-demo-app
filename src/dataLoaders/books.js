const DataLoader = require('dataloader');

async function batchGetBooks(data) {
  const { bookAPI } = data[0];
  const authorIds = data.map(el => el.authorId)
  const books = await bookAPI.getBooks({authorIds, });
  const map = {};

  books.forEach(el => {
    const { authorIds } = el;
    authorIds.forEach(aid => {
      map[aid] = map[aid] || [];
      map[aid].push(el);

    })
  });
  return data.map(el => map[el.authorId]);
}

const bookLoader = new DataLoader((data) => batchGetBooks(data));

module.exports = bookLoader;
