const PublicationModel = require("../Schema/publication");
const BookModel = require("../Schema/book");
const Router = require("express").Router();

/*  Des     - to get all publications
    Route   - /publication
    Access  - Public
    Method  - GET
    Params  - none
*/

Router.get("/publication", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return res.json(getAllPublications);
  });

/*  Des     - to get a publication based on pubID
    Route   - /publication/:pubID
    Access  - Public
    Method  - GET
    Params  - pubID
*/

  Router.get("/publication/:pubID",async (req, res) => {
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
  
/*  Des     - to get a list of publications based on books
    Route   - /publication/b/:book
    Access  - Public
    Method  - GET
    Params  - book
*/

  Router.get("/publication/b/:book", async(req, res) => {
    const {book} = req.params;
    const getPublication = await PublicationModel.find(
      {
        books: book
      }
    );
    return res.json({ publication: getPublication });
  });

/*  Des     - add new publication
    Route   - /publication/new      
    Access  - Public
    Method  - POST
    Params  - none
*/

  Router.post("/publication/new", async(req, res) => {
    const { newPublication } = req.body;
  
    await PublicationModel.create(newPublication);
  
    return res.json({ message: "Publication added to database" });
  });

/*  Des     - Update publication name details       
    Route   - /publication/updateName/:id 
    Access  - Public
    Method  - PUT
    Params  - publication id
*/

  Router.put("/publication/updateName/:id", async(req, res) => {
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

/*  Des     - delete a publication
    Route   - /publication/delete/:id      
    Access  - Public
    Method  - DELETE
    Params  - ID
*/
  
  Router.delete("/publication/delete/:id",async (req, res) => {
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
  
/*  Des     - delete a book from a publication
    Route   - /publication/delete/book/:isbn/:Id    
    Access  - Public
    Method  - DELETE
    Params  - ID,ISBN
*/
  
  Router.delete("/publication/delete/book/:isbn/:Id", async(req, res) => {
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
  
module.exports = Router;
