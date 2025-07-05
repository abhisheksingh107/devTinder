Episode - 03
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


Episode - 04
- Initialize git
- .gitIgnore
- create a remote repo on github
- Push your all the code in remote repo
- Play with routes and routes extension ex - /hello, / , /hello2 , /xyz
- order of routes matter a lots
- Install Postman and make a workspace and collection > test Api call
- write a logic to handle get, post, delete, patch API calls and test them on postman


Episode - 05
- multiple routes handler -- play with the code
- next()
- next function error along with the res.send()
- app.use("/user", rh, [rh1, rh2], rh3)
- what is middleware? why do we need it?
- how express Js handle basically routes behind the scean
- write a dummy midlleware for admin and user
- write a dummy middleware for adminAuth for all user routes, except  /user/login
- error handling use app.use("/", (err, req, res, next) = {});


Episode - 06
- create a free cluster on mongoDb Website(Mongo Atlas)
- Install mongoose library
- connect your application to the database 
- call connectDB function and connect to database before starting application on 7777
- create a userSchema and user Model
- create a POST /singup API to add data to database
- push some documents using API calls from postman 


Episode - 07
- js object vs json
- Add the express.json midlleware to your App
- Make your signup API dynamic to receive data from end user
- Users find with duplicate emaildId which object should be returned 
- API- get users by email
- API - Feed API, get feed get all the users from the database
- API - create the delete API tp delete the user
- Difference between patch and Put
- API - update the user
- Explore the mongoose documentation model model


Episode - 08
- Explore the schematype option from the document
- add required, unique, lowercase, minLength, maxLenght, trim 
- add default
- create a custom validate function for gender
- Improve the DB schema, put all appropriate validations on each field in schema
- Add timestamp to the userSchema
- Add API level validation on patch request and signUp post api
- Add API validation on each field
- install validation
- explore validator and add validator for strong Password, email, PhotoURL
- Never trust req.body


Episode  - 09
- Validate data in SignUp API
- Install bcrypt package 
- creating Passwordhash using bcrpt.hash and save the user as excrupted password
- create login API
- compare password and throw error if email and password is not valid


Episode  - 10
- install cookie-parser
- just send a dummy cookie to user
- create GET /profile API and check if you send the cookie back
- install jsonwebtoken
- In login API, after email and password validation, create a jwt token and send it to the user
- Read the cookies inside your profile API and and find the loggedIn user
- userAuth middleware
- Add the userAuth middleware in profile API and a new SendConnectionRequest API
- set the expire of JWT token and cookies to 1d

Episode - 11
- Expolore the tinder APIs
- create a list all API you can think of in Dev tinder
- Group multiple routes under repective routes
- Read documentation for express.Router
- create routes folder for managing auth, profile, request, routers
- Import these routers in app.js
- create POST/ logout API 
- create PATCH /profile/edit
- create PATCH /profile/password API => forget password API
- Make sure you validate all data in every POST, PATCH apis

Episode - 12
- create a connectionrequest schema
- send ConnectionRequest APIs
- proper Validation of schema
- Think about all corner cases
- $or query and $and query in mongoose
- schema.pre("save") function
- read about the indexex in MongoDB
- Why do we need index in DB
- what is advantange and disadvantage of indexex
- ALWAYS Think about the corner cases

Episode - 13
-  Write a code with proper validation for post request/review/:status/: requestId
- Thought process of GET and POST
- Read about ref and papolate
- create GET /user/request/received with all the checks

Episode - 14
- Logic for GET /feed API
- Explore the $nin, $ne and other query operation
