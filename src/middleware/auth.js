const adminAuth = (req, res, next) => {
    console.log("checking adminAuth");
    const token = "xyz";
    const authorized = token === "xyz";
    if(!authorized){
        res.status(401).send("Unauthorized person");
    }
    else{
        next()
    }
}

const userAuth = (req, res, next) => {
    console.log("checking usernAuth");
    const token = "xyz";
    const authorized = token === "xbbbyz";
    if(!authorized){
        res.status(401).send("Unauthorized person");
    }
    else{
        next()
    }
}





module.exports = {
    adminAuth,
    userAuth
}