const DataLoader = require('dataloader');

async function batchGetAuthors(data) {
  const { authorAPI } = data[0];
  const authorsIds = data.map(el => el.ids).flat();
  const authors = await authorAPI.getAuthors({ids: authorsIds});
  const map = {};
  authors.forEach(el => {
    map[el.id] = el
  });
  return data.map(el => el.ids.map(id => map[id]));
}

const authorLoader = new DataLoader((data) => batchGetAuthors(data));

module.exports = authorLoader;
