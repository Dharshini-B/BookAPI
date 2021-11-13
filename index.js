//Import Express
const express = require("express");

//Import Database
const Database = require("./database");

//Initialisation of the express application
const OurAPP = express();

OurAPP.use(express.json());

// routing root route(localhost), get->http method
OurAPP.get("/", (request, response) => {
  response.json({ message: "Server is working!" }); // convert data to json
});

// Route   - /book
// Des     - to get all books
// Access  - Public
// Method  - GET
// Params  - none
// Body    - none
OurAPP.get("/book", (req, res) => {
  //book route
  return res.json({ books: Database.Book });
});

// Route   - /book/:bookID
// Des     - to get a book based on ISBN
// Access  - Public
// Method  - GET
// Params  - bookID
// Body    - none
OurAPP.get("/book/:bookID", (req, res) => {
  const getBook = Database.Book.filter(
    (book) => book.ISBN === req.params.bookID
  );
  return res.json({ book: getBook });
});

// Route   - /book/c/:category
// Des     - to get a list of books based on category
// Access  - Public
// Method  - GET
// Params  - category
// Body    - none
OurAPP.get("/book/c/:category", (req, res) => {
  const getBook = Database.Book.filter((book) =>
    book.category.includes(req.params.category)
  );
  return res.json({ book: getBook });
});

// Route   - /book/a/:author
// Des     - to get a list of books based on authors
// Access  - Public
// Method  - GET
// Params  - author id
// Body    - none
OurAPP.get("/book/a/:authors", (req, res) => {
  const getBook = Database.Book.filter((book) =>
    book.authors.includes(parseInt(req.params.authors))
  );
  return res.json({ book: getBook });
});

// Route   - /author
// Des     - to get all authors
// Access  - Public
// Method  - GET
// Params  - none
// Body    - none

OurAPP.get("/author", (req, res) => {
  //author route
  return res.json({ authors: Database.Author });
});

// Route   - /author/:authorID
// Des     - to get an author based on authorID
// Access  - Public
// Method  - GET
// Params  - authorID
// Body    - none
OurAPP.get("/author/:authorID", (req, res) => {
  const getAuthor = Database.Author.filter(
    (author) => author.id === parseInt(req.params.authorID)
  );
  return res.json({ author: getAuthor });
});
// Route   - /author/b/:book
// Des     - to get a list of authors based on books
// Access  - Public
// Method  - GET
// Params  - book
// Body    - none
OurAPP.get("/author/b/:book", (req, res) => {
  const getAuthor = Database.Author.filter((author) =>
    author.books.includes(req.params.book)
  );
  return res.json({ author: getAuthor });
});

// Route   - /publication
// Des     - to get all publications
// Access  - Public
// Method  - GET
// Params  - none
// Body    - none

OurAPP.get("/publication", (req, res) => {
  //publication route
  return res.json({ publications: Database.Publication });
});
// Route   - /publication/:pubID
// Des     - to get a publication based on pubID
// Access  - Public
// Method  - GET
// Params  - pubID
// Body    - none
OurAPP.get("/publication/:pubID", (req, res) => {
  const getPublication = Database.Publication.filter(
    (publication) => publication.id === parseInt(req.params.pubID)
  );
  return res.json({ publication: getPublication });
});

// Route   - /publication/b/:book
// Des     - to get a list of publications based on books
// Access  - Public
// Method  - GET
// Params  - book
// Body    - none
OurAPP.get("/publication/b/:book", (req, res) => {
  const getPublication = Database.Publication.filter((publication) =>
    publication.books.includes(req.params.book)
  );
  return res.json({ publication: getPublication });
});

//  -------------        POST
// Route   - /book/new
// Des     - add new book
// Access  - Public
// Method  - POST
// Params  - none
// Body    - none

OurAPP.post("/book/new", (req, res) => {
  const { newBook } = req.body;
  Database.Book.push(newBook);
  return res.json(Database.Book);
});

// Route   - /author/new
// Des     - add new author
// Access  - Public
// Method  - POST
// Params  - none
// Body    - none

OurAPP.post("/author/new", (req, res) => {
  const { newAuthor } = req.body;

  Database.Author.push(newAuthor);

  return res.json(Database.Author);
});

// Route   - /publication/new
// Des     - add new publication
// Access  - Public
// Method  - POST
// Params  - none
// Body    - none
OurAPP.post("/publication/new", (req, res) => {
  const { newPublication } = req.body;

  Database.Publication.push(newPublication);

  return res.json(Database.Publication);
});

// ------- PUT -----
// Route   - /book/updateTitle/:isbn
// Des     - Update book title details
// Access  - Public
// Method  - PUT
// Params  - ISBN
// Body    - none

OurAPP.put("/book/updateTitle/:isbn", (req, res) => {
  const { updateBookTitle } = req.body;
  const { isbn } = req.params;

  Database.Book.forEach((book) => {
    if (book.ISBN === isbn) {
      book.title = updateBookTitle.title;
      return;
    }
    return book;
  });
  return res.json({ book: Database.Book });
});
// Route   - /book/updateAuthor/:isbn
// Des     - Update/add author
// Access  - Public
// Method  - PUT
// Params  - ISBN
// Body    - none
OurAPP.put("/book/updateAuthor/:isbn", (req, res) => {
  const { updateBookAuthor } = req.body;
  const { isbn } = req.params;
  //updating Book Database object
  Database.Book.forEach((book) => {
    //check if ISBN match
    if (book.ISBN === isbn) {
      // check if author already exists
      if (!book.authors.includes(updateBookAuthor)) {
        return book.authors.push(updateBookAuthor);
      }
      return book;
    }
    return book;
  });
  //updating Author database object
  Database.Author.forEach((author) => {
    //check if author id match
    if (author.id === updateBookAuthor) {
      //check if ISBN already exists
      if (!author.books.includes(isbn)) {
        return author.books.push(isbn);
      }
      return author;
    }
    return author;
  });

  return res.json({ book: Database.Book, author: Database.Author });
});

// Route   - /author/updateName/:id
// Des     - Update author name details
// Access  - Public
// Method  - PUT
// Params  - Author id
// Body    - none

OurAPP.put("/author/updateName/:id", (req, res) => {
  const { updateAuthorName } = req.body;
  const { id } = req.params;

  const author = Database.Author.map((author) => {
    if (author.id === parseInt(id)) {
      author.name = updateAuthorName.name;
      return;
    }
    return author;
  });
  return res.json({ author: Database.Author });
});

// Route   - /publication/updateName/:id
// Des     - Update publication name details
// Access  - Public
// Method  - PUT
// Params  - publication id
// Body    - none
OurAPP.put("/publication/updateName/:id", (req, res) => {
  const { updatePubName } = req.body;
  const { id } = req.params;

  const publication = Database.Publication.map((publication) => {
    if (publication.id === parseInt(id)) {
      publication.name = updatePubName.name;
      return;
    }
    return publication;
  });
  return res.json({ publication: Database.Publication });
});

// Route   - /book/delete/:isbn
// Des     - delete a book
// Access  - Public
// Method  - DELETE
// Params  - ISBN
// Body    - none
OurAPP.delete("/book/delete/:isbn", (req, res) => {
  const { isbn } = req.params;
  const filteredBooks = Database.Book.filter((book) => book.ISBN !== isbn);
  Database.Book = filteredBooks;
  return res.json(Database.Book);
});

// Route   - /book/deleteAuthor/:isbn/:id
// Des     - delete an author from a book
// Access  - Public
// Method  - DELETE
// Params  - ISBN, ID
// Body    - none

OurAPP.delete("/book/deleteAuthor/:isbn/:id", (req, res) => {
  const { isbn, id } = req.params;

  Database.Book.forEach((book) => {
    if (book.ISBN === isbn) {
      if (!book.authors.includes(parseInt(id))) {
        return book;
      }
      book.authors = book.authors.filter(
        (databaseId) => databaseId !== parseInt(id)
      );
      return book;
    }
    return book;
  });

  Database.Author.forEach((author) => {
    if (author.id === parseInt(id)) {
      if (!author.books.includes(isbn)) {
        return author;
      }
      author.books = author.books.filter((book) => book !== isbn);
      return author;
    }
    return author;
  });
  return res.json({ book: Database.Book, author: Database.Author });
});

// Route   - /author/delete/:id
// Des     - delete an author
// Access  - Public
// Method  - DELETE
// Params  - ID
// Body    - none

OurAPP.delete("/author/delete/:id", (req, res) => {
  const { id } = req.params;
  const filteredAuthor = Database.Author.filter(
    (author) => author.id !== parseInt(id)
  );
  Database.Author = filteredAuthor;
  return res.json(Database.Author);
});

// Route   - /publication/delete/:id
// Des     - delete an publication
// Access  - Public
// Method  - DELETE
// Params  - ID
// Body    - none

OurAPP.delete("/author/delete/:id", (req, res) => {
  const { id } = req.params;
  const filteredPub = Database.Publication.filter(    
    (publication) => publication.id !== parseInt(id)
  );
  Database.Publication = filteredPub;
  return res.json(Database.Publication);
});

// Route   - /publication/delete/book/:isbn/:Id
// Des     - delete a book from a publication
// Access  - Public
// Method  - DELETE
// Params  - ID,ISBN
// Body    - none

OurAPP.delete("/publication/delete/book/:isbn/:Id", (req, res) => {
  const { isbn,Id } = req.params;
  Database.Book.forEach((book) => {
    if(book.ISBN === isbn) {
      book.publication=0;
      return book;
    }
    return book;
  });
  Database.Publication.forEach((pub) => {
    if (pub.id === parseInt(Id)) {
        const filteredBooks = pub.books.filter(
          (book) => book !== isbn
        );
        pub.books = filteredBooks;
        return pub;
      }
      return pub;
  });

    
 
  return res.json({ book:Database.Book, pub: Database.Publication });
});

OurAPP.listen(4000, () => console.log("Server is running")); // listen to port 4000
