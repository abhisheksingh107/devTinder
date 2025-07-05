# devTinder API

# authRouter

POST /signup
POST /login
POST /logout

# ProfileRouter

GET /profile/view
PATCH /profile/update
PATCH /profile/password

# ConnectionRequestRouter

POST /request/send/interested/:userId
POST /request/send/ignored/:userId
POST /request/reviewed/accepted/:requestId
POST /request/reviewed/ rejected/:requestId

# userRouter

GET /user/request
GET /user/connections
GET /user/feed - gets you the profile of other users on platform
