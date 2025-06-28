Episode 03
- create a repository
- Initialize the repository 
- node_modules, package.json, package-lock.json
- Install express
- create a server
- Listen to port 7777
- write a request handlers for /test, /
- Install nodemon and update scripts inside package.json
- what is dependencies
- what is the use of "-g" while npm install
- Difference between carat and tilde(^ and ~)


Episode -04
- Initialize git
- .gitIgnore
- create a remote repo on github
- Push your all the code in remote repo
- Play with routes and routes extension ex - /hello, / , /hello2 , /xyz
- order of routes matter a lots
- Install Postman and make a workspace and collection > test Api call
- write a logic to handle get, post, delete, patch API calls and test them on postman


Episode-05
- multiple routes handler -- play with the code
- next()
- next function error along with the res.send()
- app.use("/user", rh, [rh1, rh2], rh3)
- what is middleware? why do we need it?
- how express Js handle basically routes behind the scean
- write a dummy midlleware for admin and user
- write a dummy middleware for adminAuth for all user routes, except  /user/login
- error handling use app.use("/", (err, req, res, next) = {});


Episode -06
- create a free cluster on mongoDb Website(Mongo Atlas)
- Install mongoose library
- connect your application to the database 
- call connectDB function and connect to database before starting application on 7777
- create a userSchema and user Model
- create a POST /singup API to add data to database
- push some documents using API calls from postman 