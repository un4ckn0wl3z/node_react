const express = require('express');
const app = express();

app.get("/", (req, res) => {
    res.send("Hello World from NodeJS.");
});

const port = 8080;
app.listen(port,()=>{
    console.log(`A NodeJS API listening on port: ${port}`);
});