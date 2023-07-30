const express = require("express")
const db = require("./db/index.js")
const handleError = require("./shared/errors/handle.js")
const adminRoutes = require("./modules/admins/api.js")
const borrowersRouter = require("./modules/borrowers/api.js")
const publisherRouter = require("./modules/publishers/api.js")
const authorRouter = require("./modules/authors/api.js") 
const booksRouter = require("./modules/books/api.js")
const loansRouter = require("./modules/loans/api.js")

const app = express();

app.use(express.json());

app.use(handleError);

db();

app.use(adminRoutes)
app.use(borrowersRouter)
app.use(publisherRouter)
app.use(authorRouter)
app.use(booksRouter)
app.use(loansRouter)

app.listen(4000, ()=>{
    console.log("server runing on port 4000");
})