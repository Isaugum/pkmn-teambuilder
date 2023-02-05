# PKMN Teambuilder

This is a fun project built using ReactJS, NodeJS and PostgreSQL.
It is meant to make it easier to get creative and search for pokemon to include in competitive teams.
The plan is to also make user accounts that will allow creation and storage of teams.

## Dependencies and installation

Use Node Package Manager [npm](https://www.npmjs.com/) to install dependencies.

So far the client app is not yet built, so you'll have to start the server and client seperately.
Use npm start for the client, and npm run serve for the server - this will use nodemon.

```
npm install react react-dom
npm install axios
npm install fetch
npm install express
npm install dotenv
npm install pg
npm install bcrypt
npm install nodemon
```
all at once:
```
npm install react react-dom axios fetch express dotenv pg bycript nodemon
```

## Project Structure

# Server
- The entry point is **"./server.js"**. It sets up parser, express app and routes, as well as express-session and cors.

- **"./routes/** folder contains the routes, currently for login and registration of users. Bcrypt is used to encrypt password data on registration and login. The user info itself is stored in a posgreSQL table, which is initialized in **./loadDatabase.js** file.

# Client
- The entry point is **./src/index.js**, which for now just sets up a router, which is currently unused.

- **"./src/app.js"** file contains the rendering logic for pages - currently just the switch from login screen to main menu, which is disabled for development purposes. It also loads in all the pokemon data using axios requests to [pokeapi](https://pokeapi.co/), and a fetch request to login (get) that returns a user session is one is active.

- **"./src/pages/MainMenu"** currently contains almost all functionality. If the data is loaded, it displays pokemon using **PkmnCardSmall** component imported from **"./src/components/PkmnCardSmall** directory, sending the data of each pokemon as a prop. Main menu also has 8 possible input parameters. The displayed pokemon change in real time depending on queries these inputs receive, which are processed using RegExp inside PkmnCardSmall component. If RedExp returns false, the class of that specific card is set to .hidden -> its css display property is set to "none".