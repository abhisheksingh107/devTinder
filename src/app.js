const express = require('express');

const app = express();

const { adminAuth, userAuth } = require("./middleware/auth");

app.use("/admin", adminAuth);

app.get("/admin/getProfile", (req, res) => {
    res.send("sending all admin data");
})

app.get("/user/getProfile", userAuth, (req, res) => {
    res.send("Sending all user profile");
})


app.use("/user", (req, res, next) => {
    console.log("handling the routes user!");
    // res.send("routes handler 1");
    next();
},
(req, res, next) => {
    console.log("handling the routes user 2");
    // res.send("routes handler 2");
    next();
}, 
(req, res) => {
    console.log("handling the routes 3");
    res.send("routed handler 3")
}
)




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