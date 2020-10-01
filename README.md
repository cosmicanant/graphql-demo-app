# Sample application to describe graphql features

## Steps for bootstrapping this application
- npm install
- run Express Server ( to imitate author and book service) in background `node severLocal.js`
- start graphql server: `node src/index.js`
- check GraphQL playground: `http://localhost:4090`

## sample queries
```

query getBooks {
  books {
    id
    name
    publishYear
    authors {
      id
      name
      books {
        name
        authors {
          id
          name
          isSynced
          books {
            
          }
        }
      }
    }
  }
}


mutation addBook {
  addBook (bookId: 104, bookName: "Who will cry when you will die-2",
    publishYear: 2010, authorIds: [201]) {
    id
    publishYear
    name
    authors {
      name
    }
  }
}

```
