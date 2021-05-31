# Get Started

1. Install node modules on both the client and the server using "npm i".
2. Create a SQL database using the schema provided in the database folder.
3. Run the server using "npm run dev". runs on localhost:5000.
4. Run the client using "npm start". ports 3000 and 3001 are allowed by cors.

## Access - Admin

To sign in as admin - username: admin, password: 1234

As admin you can create, update and delete vacations.
Also, you can see a report of all of the followed vacations ([chart.js]).

## Access - user

To sign in as a user - username: user1, password: 1234 | username: user2, password: 1234
You can also sign up as a new user with a unique username and a strong password.

As a user you can follow and unfollow vacations you like. the vacations you like will appear first.

### Features

* The app is responsive ([CSS]) and updates in real-time using [socket.io].
* The front-end uses [react] as its framework with [redux] to manage the global state.
* The back-end uses [express].
* The users are authenticated with [JWT] and the token refreshes with every request to the server.
* Access is revoked on logout.
* The passwords are hashed using [bcrypt].
* [SQL] database.
