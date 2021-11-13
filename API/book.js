const BookModel = require("../Schema/book");
const AuthorModel = require("../Schema/author");
const Router = require("express").Router();

/*  Des     - to get all books
    Route   - /book
    Access  - Public
    Method  - GET
    Params  - none
*/

Router.get("/book", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json(getAllBooks);
  });

/*  Des     - to get a book based on ISBN
    Route   - /book/:bookID
    Access  - Public
    Method  - GET
    Params  - bookID
*/

Router.get("/book/:bookID", async (req, res) => {
    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.bookID });
    if (!getSpecificBook) {
      return res.json({
        error: `No book found for the ISBN of ${req.params.bookID}`,
      });
    }
    return res.json(getSpecificBook);
  });
  
/*  Des     - to get a list of books based on category
    Route   - /book/c/:category
    Access  - Public
    Method  - GET
    Params  - category
*/

  Router.get("/book/c/:category", async (req, res) => {
    const getSpecificBooks = await BookModel.find({ category: req.params.category });
    if (!getSpecificBooks) {
      return res.json({
        error: `No book found for the category of${req.params.category}`,
      });
    }
    return res.json({ books: getSpecificBooks });
  });
  
/*  Des     - to get a list of books based on authors
    Route   - /book/a/:author
    Access  - Public
    Method  - GET
    Params  - author id
*/ 

  Router.get("/book/a/:id",async (req, res) => {
    const { id } = req.params;
    const getBooks = await BookModel.find( {
      authors: id
    },
    );
    return res.json({ books: getBooks });
  });

/*  Des     - add new book
    Route   - /book/new
    Access  - Public
    Method  - POST
    Params  - none
*/

Router.post("/book/new", async (req, res) => {
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

/*  Des     - Update book title details
    Route   - /book/updateTitle/:isbn
    Access  - Public
    Method  - PUT
    Params  - ISBN
*/

Router.put("/book/updateTitle/:isbn", async (req, res) => {
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

/*  Des     - Update/add author
    Route   - /book/updateAuthor/:isbn
    Access  - Public
    Method  - PUT
    Params  - ISBN
*/

  Router.put("/book/updateAuthor/:isbn", async (req, res) => {
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

/*  Des     - delete a book
    Route   - /book/delete/:isbn
    Access  - Public
    Method  - DELETE
    Params  - ISBN
*/

Router.delete("/book/delete/:isbn", async(req, res) => {
    const { isbn } = req.params;
    const updateBookDatabase = await BookModel.findOneAndDelete({
      ISBN: isbn
    });
    return res.json({books: updateBookDatabase});
  });
  
/*  Des     - delete an author from a book
    Route   - /book/deleteAuthor/:isbn/:id
    Access  - Public
    Method  - DELETE
    Params  - ISBN, ID
*/
  
  Router.delete("/book/deleteAuthor/:isbn/:id", async (req, res) => {
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

  module.exports = Router;