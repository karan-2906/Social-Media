const express = require('express')
const dotenv = require('dotenv')
const app = express()
const cors = require('cors')
require('dotenv').config();
const PORT = process.env.PORT;
const myDb = require('./db')
const userRoute = require('./routes/user.routes') 
const postRoutes = require('./routes/post.routes')
const likeRoutes = require('./routes/like.routes')
const commentRoutes = require('./routes/comments.routes')

console.log(PORT)

app.use(express.json())
app.use(cors())

app.listen(PORT, (req, res) => {
    console.log(`Server running on port  use http://localhost:${PORT}`)

})

myDb.myDb();

app.use('/api/v1/auth', userRoute)
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/likes', likeRoutes);
app.use('/api/v1/comments', commentRoutes);