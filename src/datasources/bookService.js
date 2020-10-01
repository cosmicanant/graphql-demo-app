const config = require('config');
const { RESTDataSource } = require('apollo-datasource-rest');
const qs = require('qs');

const logger = require('../logger').child({ filename: __filename });
const FORBIDDEN_CODE = 'FORBIDDEN';

class BookAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:4444';
  }

  willSendRequest(request) {
    request.headers.set('x-user-id', this.context.userId);
    request.headers.set('x-correlation-id', this.context.globalUserId);
    request.headers.set('accept', 'application/json');
  }

  async getBooks(query = {}) {
    const { authorIds, ids } = query;
    const params = {
      authorIds : authorIds && authorIds.join(','),
      ids : ids && ids.join(','),
    }
    const books = await this.get(`book?${qs.stringify(params)}`);
    return books;
  }

  async addBook({ bookId, bookName, authorIds, publishYear }) {
    try {
      const params = {
        id: bookId,
        name: bookName,
        authorIds,
        publishYear,
      }
      const resp = await this.post(`book`, params);
      return resp;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = BookAPI;
