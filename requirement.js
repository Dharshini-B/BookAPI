/*
Requirements

Book
 -- ISBN                - String
 -- Title               - String
 -- Author              - [Number]
 -- Language            - String
 -- Publications        - Number
 -- Num of Pages        - Number
 -- Categories          - [String]              ISBN - International Standard Book Number
Author
 -- id                  - Number
 -- Name                - String
 -- Books               - [String]-array of ISBN

Publications
 -- id                  - Number
 -- Name                - String
 -- Books               - [String]-array of ISBN

-------------------- APIs -----------------------
Book

    - GET
        --to get all books t
        --to get specific books t
        --to get a list of books based on category -t
        --to get a list of books based on author -t

    - POST
        --to add more books

    - PUT
        --to update book details
        --to update/add new author

    - DELETE
        --delete a book
        --delete an author from the book

Author
    -GET
        --to get all authors -t
        --to get specific author -t
        --to get list of authors based on a book 

    -POST
        --to add new author
        --to update/add new book
    
    -PUT
        --to update author details
    
    -DELETE
        --delete an author

Publication
    -GET
        --to get all publications t
        --to get specific publication t
        --to get list of publications based on a book t
    
    -POST
        --to add new publication details

    -PUT
        --update publication
        --to update/add new book

    -DELETE
        --to delete a book from publication
        --to delete a publication
        
        */

