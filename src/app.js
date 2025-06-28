const express = require('express');

const app = express();


app.use("/user", (req, res) => {
    res.send("HAHAHHAHAHA");
})

// This is only get the user call dor /user
app.get("/user", (req, res) => {
    res.send({firstName: "Abhishek Singh", age: "15"});
})

app.post("/user", (req, res) => {
    // saving data to DB
    res.send("Data Successfullly saved to databases");
})


app.delete("/user", (req, res) => {
    res.send("Deleting data from DB");
})




app.use("/test", (req,res) => {
    res.send("Hello  from test page");
})



app.listen(3000, () => {
    console.log("server is successfully listening to port 3000...")
});