const express = require('express');

const app = express();

// app.use("/", (req, res) => {
//     res.send("Hello World");
// })

app.use("/", (req, res) => {
    res.send("This is the main page");
})

app.use("/hello", (req, res) => {
    res.send("This in on hello page");
})

// app.use("/", (req, res) => {
//     res.send("This is the main page");
// })


app.use("/test", (req,res) => {
    res.send("Hello  from test page");
})

app.use((req, res) => {
    res.send("Hello from the server");
})


app.listen(3000, () => {
    console.log("server is successfully listening to port 3000...")
});