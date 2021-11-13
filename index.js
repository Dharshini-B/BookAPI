require("dotenv").config();
//Import Express
const express = require("express");

const mongoose = require("mongoose");

// Importing all schemas
const BookModel = require("./Schema/book");
const AuthorModel = require("./Schema/author");
const PublicationModel = require("./Schema/publication");

//Import Database
const Database = require("./database");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connection established! "))
  .catch((err) => {
    console.log(err);
  });
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
OurAPP.get("/book", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

// Route   - /book/:bookID
// Des     - to get a book based on ISBN
// Access  - Public
// Method  - GET
// Params  - bookID
// Body    - none
OurAPP.get("/book/:bookID", async (req, res) => {
  const getSpecificBook = await BookModel.findOne({ ISBN: req.params.bookID });
  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the ISBN of ${req.params.bookID}`,
    });
  }
  return res.json(getSpecificBook);
});

// Route   - /book/c/:category
// Des     - to get a list of books based on category
// Access  - Public
// Method  - GET
// Params  - category
// Body    - none
OurAPP.get("/book/c/:category", async (req, res) => {
  const getSpecificBooks = await BookModel.find({ category: req.params.category });
  if (!getSpecificBooks) {
    return res.json({
      error: `No book found for the category of${req.params.category}`,
    });
  }
  return res.json({ books: getSpecificBooks });
});

// Route   - /book/a/:author
// Des     - to get a list of books based on authors
// Access  - Public
// Method  - GET
// Params  - author id
// Body    - none
OurAPP.get("/book/a/:id",async (req, res) => {
  const { id } = req.params;
  const getBooks = await BookModel.find( {
    authors: id
  },
  );
  return res.json({ books: getBooks });
});

// Route   - /author
// Des     - to get all authors
// Access  - Public
// Method  - GET
// Params  - none
// Body    - none

OurAPP.get("/author", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});

// Route   - /author/:authorID
// Des     - to get an author based on authorID
// Access  - Public
// Method  - GET
// Params  - authorID
// Body    - none
OurAPP.get("/author/:authorID", async (req, res) => {
  const {authorID} = req.params;
  const getSpecificAuthor = await AuthorModel.findOne(
    {
      id: authorID
    },
  );
  if (!getSpecificAuthor) {
    return res.json({
      error: `No author found for the ID ${req.params.authorID}`,
    });
  }
  return res.json(getSpecificAuthor);
});
// Route   - /author/b/:book
// Des     - to get a list of authors based on books
// Access  - Public
// Method  - GET
// Params  - book
// Body    - none
OurAPP.get("/author/b/:book", async (req, res) => {
  const {book} = req.params;

  const getAuthors = await AuthorModel.find(
    {
      books: book
    }
  );
  return res.json({ author: getAuthors });
});

// Route   - /publication
// Des     - to get all publications
// Access  - Public
// Method  - GET
// Params  - none
// Body    - none

OurAPP.get("/publication", async (req, res) => {
  const getAllPublications = await PublicationModel.find();
  return res.json(getAllPublications);
});
// Route   - /publication/:pubID
// Des     - to get a publication based on pubID
// Access  - Public
// Method  - GET
// Params  - pubID
// Body    - none
OurAPP.get("/publication/:pubID",async (req, res) => {
  const {pubID} = req.params;
  const getSpecificPub = await PublicationModel.findOne(
    {
      id: pubID
    },
    {
      new: true
    },
  );
  return res.json({ publication: getSpecificPub });
});

// Route   - /publication/b/:book
// Des     - to get a list of publications based on books
// Access  - Public
// Method  - GET
// Params  - book
// Body    - none
OurAPP.get("/publication/b/:book", async(req, res) => {
  const {book} = req.params;
  const getPublication = await PublicationModel.find(
    {
      books: book
    }
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

OurAPP.post("/book/new", async (req, res) => {
  try {
    const { newBook } = req.body;
    await BookModel.create(newBook);
    return res.json({ message: "Book added to the database" });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

// Route   - /author/new
// Des     - add new author
// Access  - Public
// Method  - POST
// Params  - none
// Body    - none

OurAPP.post("/author/new", async (req, res) => {
  const { newAuthor } = req.body;

  await AuthorModel.create(newAuthor);

  return res.json({ message: "Author added to database" });
});

// Route   - /publication/new
// Des     - add new publication
// Access  - Public
// Method  - POST
// Params  - none
// Body    - none
OurAPP.post("/publication/new", async(req, res) => {
  const { newPublication } = req.body;

  await PublicationModel.create(newPublication);


  return res.json({ message: "Publication added to database" });
});

// ------- PUT -----
// Route   - /book/updateTitle/:isbn
// Des     - Update book title details
// Access  - Public
// Method  - PUT
// Params  - ISBN
// Body    - none

OurAPP.put("/book/updateTitle/:isbn", async (req, res) => {
  const updateBookTitle = req.body.title;
  const updateBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: updateBookTitle,
    },
    {
      new: true,
    }
  );
  return res.json({ book: updateBook });
});
// Route   - /book/updateAuthor/:isbn
// Des     - Update/add author
// Access  - Public
// Method  - PUT
// Params  - ISBN
// Body    - none
OurAPP.put("/book/updateAuthor/:isbn", async (req, res) => {
  const { newAuthor } = req.body;
  const { isbn } = req.params;

  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: isbn,
    },
    {
      $addToSet: {
        authors: newAuthor,
      },
    },
    {
      new: true,
    }
  );
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: newAuthor,
    },
    {
      $addToSet: {
        books: isbn,
      },
    },
    {
      new: true,
    }
  );

  return res.json({
    book: updatedBook,
    author: updatedAuthor,
    message: "New author was added to the book",
  });
});

// Route   - /author/updateName/:id
// Des     - Update author name details
// Access  - Public
// Method  - PUT
// Params  - Author id
// Body    - none

OurAPP.put("/author/updateName/:id", async (req, res) => {
  const { updateAuthorName } = req.body;
  const { id } = req.params;
  const updateAuthorDatabase = await AuthorModel.findOneAndUpdate(
    {
      id: id
    },
    {
        name: updateAuthorName
    },
    {
      new: true
    }
  );
  
  return res.json({ author: updateAuthorDatabase });
});

// Route   - /publication/updateName/:id
// Des     - Update publication name details
// Access  - Public
// Method  - PUT
// Params  - publication id
// Body    - none
OurAPP.put("/publication/updateName/:id", async(req, res) => {
  const { updatePubName } = req.body;
  const { id } = req.params;

 const updatePub = await PublicationModel.findOneAndUpdate(
   {
     id: id
   },
   {
     name: updatePubName
   },
   {
     new: true
   }
 );
  return res.json({ publication: updatePub });
});

// Route   - /book/delete/:isbn
// Des     - delete a book
// Access  - Public
// Method  - DELETE
// Params  - ISBN
// Body    - none
OurAPP.delete("/book/delete/:isbn", async(req, res) => {
  const { isbn } = req.params;
  const updateBookDatabase = await BookModel.findOneAndDelete({
    ISBN: isbn
  });
  return res.json({books: updateBookDatabase});
});

// Route   - /book/deleteAuthor/:isbn/:id
// Des     - delete an author from a book
// Access  - Public
// Method  - DELETE
// Params  - ISBN, ID
// Body    - none

OurAPP.delete("/book/deleteAuthor/:isbn/:id", async (req, res) => {
  const { isbn, id } = req.params;

  const updatedBook = await BookModel.findOneAndUpdate({
    ISBN: isbn,
  },
  {
    $pull: {
      authors: parseInt(id)
    },
  },
  {
    new: true,
  }
  );
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: parseInt(id),
    },
    {
      $pull: {
        books: isbn
      },
    },
    {
      new: true,
    }
  );
  return res.json({message: "Author was deleted",books: updatedBook, authors: updatedAuthor});
});

// Route   - /author/delete/:id
// Des     - delete an author
// Access  - Public
// Method  - DELETE
// Params  - ID
// Body    - none

OurAPP.delete("/author/delete/:id", async(req, res) => {
  const  {id}  = req.params;
  const updateAuthorDatabase = await AuthorModel.findOneAndDelete({
    id: id
  },
  {
    new: true,
  });
 
  return res.json({authors:updateAuthorDatabase});
});

// Route   - /publication/delete/:id
// Des     - delete an publication
// Access  - Public
// Method  - DELETE
// Params  - ID
// Body    - none

OurAPP.delete("/publication/delete/:id",async (req, res) => {
  const { id } = req.params;
  const updatedPub = await PublicationModel.findOneAndDelete(
    {
      id: id
    },
    {
      new: true
    },
  );
  return res.json({publications: updatedPub});
});

// Route   - /publication/delete/book/:isbn/:Id
// Des     - delete a book from a publication
// Access  - Public
// Method  - DELETE
// Params  - ID,ISBN
// Body    - none

OurAPP.delete("/publication/delete/book/:isbn/:Id", async(req, res) => {
  const { isbn, Id } = req.params;
 const updatedPub = await PublicationModel.findOneAndUpdate(
   {
     id: Id
   },
   {
     $pull: {
        books: isbn
     }
   },
   {
     new: true
   }
 );

 const updatedBook = await BookModel.findOneAndUpdate(
   {
     ISBN: isbn
   },
   {
      $set: {
        publication:0
      },
   },
   {
     new: true
   }
 );
  return res.json({ book: updatedBook, pub: updatedPub });
});

OurAPP.listen(9000, () => console.log("Server is running")); // listen to port 4000
