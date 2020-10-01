const config = require('config');
const { RESTDataSource } = require('apollo-datasource-rest');
const qs = require('qs');

const logger = require('../logger').child({ filename: __filename });
const FORBIDDEN_CODE = 'FORBIDDEN';

class AuthorAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'http://localhost:4444';
  }

  willSendRequest(request) {
    request.headers.set('x-user-id', this.context.userId);
    request.headers.set('x-correlation-id', this.context.globalUserId);
    request.headers.set('accept', 'application/json');
  }

  async getAuthors(query = {}) {
    const { ids } = query;
    const params = {
      ids : ids && ids.join(','),
    }
    const authors = await this.get(`author?${qs.stringify(params)}`);
    return authors;
  }

  async addAuthor(bookId, bookName, authorId) {
    try {
      const params = {
        authorId,
        authorName
      }
      const resp = await this.post(`author`, params);
      return resp;
    } catch (err) {
      throw err;
    }
  }
}

module.exports = AuthorAPI;
