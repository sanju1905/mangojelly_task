const express=require('express');
const dbConnect=require('./server/dbConnect')
const app=express();
const dotenv=require('dotenv')
const port=8080;
dotenv.config();
app.use(express.json());
const bookRoutes=require('./server/bookRoutes')
app.use('/api/v1/book/',bookRoutes)
// Server
dbConnect();
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });