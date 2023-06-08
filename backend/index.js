const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db");
const check=require("./Routes/CreateUser");
const path = require('path');


mongoDB();

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with,Content-Type,Accept"
  );
  next();
})
// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use(express.json())
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));
app.use('/api',check);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
