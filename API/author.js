const AuthorModel = require("../Schema/author");
const Router = require("express").Router();

/* Des     - to get all authors
    Route   - /author
    Access  - Public
    Method  - GET
    Params  - none
*/

Router.get("/author", async (req, res) => {
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
  });
  
/*  Des     - to get an author based on authorID
    Route   - /author/:authorID
    Access  - Public
    Method  - GET
    Params  - authorID
*/

  Router.get("/author/:authorID", async (req, res) => {
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

/*  Des     - to get a list of authors based on books
    Route   - /author/b/:book
    Access  - Public
    Method  - GET
    Params  - book
*/

  Router.get("/author/b/:book", async (req, res) => {
    const {book} = req.params;
  
    const getAuthors = await AuthorModel.find(
      {
        books: book
      }
    );
    return res.json({ author: getAuthors });
  });

  
/*  Des     - add new author
    Route   - /author/new
    Access  - Public
    Method  - POST
    Params  - none
*/

Router.post("/author/new", async (req, res) => {
    const { newAuthor } = req.body;
  
    await AuthorModel.create(newAuthor);
  
    return res.json({ message: "Author added to database" });
  });

/*  Des     - Update author name details
    Route   - /author/updateName/:id
    Access  - Public
    Method  - PUT
    Params  - Author id
*/

Router.put("/author/updateName/:id", async (req, res) => {
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

/*  Des     - delete an author
    Route   - /author/delete/:id
    Access  - Public
    Method  - DELETE
    Params  - ID
*/

Router.delete("/author/delete/:id", async(req, res) => {
    const  {id}  = req.params;
    const updateAuthorDatabase = await AuthorModel.findOneAndDelete({
      id: id
    },
    {
      new: true,
    }); 
    return res.json({authors:updateAuthorDatabase});
  });


module.exports = Router;
