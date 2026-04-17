authRouter

- post/login
- post/signup
- post/logout

profileRouter

- get/profile/view
- patch/profile/edit
- patch/profile/password

connectionRequestRouter

- post/request/send/interested/:userId
- post/request/send/ignored/:userId
- post/request/review/accepted/:requestId
- post/request/review/rejected/:requestId

- get/connections
- get/requests/received
- get/feed

Status : ignore - accepeted - interested - rejected
