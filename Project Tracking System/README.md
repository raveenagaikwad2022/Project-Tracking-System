# Bug Tracker

Bug tracking

## Built using

#### Front-end

- [ReactJS](https://reactjs.org/) - Frontend framework
- [Redux w/ hooks](https://redux.js.org/) - State management library
- [Redux Toolkit](https://redux-toolkit.js.org/) - Toolset for efficient Redux development
- [Redux Thunk](https://github.com/reduxjs/redux-thunk) - Middleware which allows action creators to return a function
- [React Router](https://reactrouter.com/) - Library for general routing & navigation
- [React Hook Form](https://react-hook-form.com/) - Library for flexible & extensible forms
- [Material-UI w/ lots of CSS customisations](https://material-ui.com/) - UI library
- [Yup](https://github.com/jquense/yup) - Form validation tool
- [date-fns](https://date-fns.org/) - Library for manipulating/formatting of timestamps

#### Back-end

- [Node.js](https://nodejs.org/en/) - Runtime environment for JS
- [Express.js](https://expressjs.com/) - Node.js framework, makes process of building APIs easier & faster
- [PostgreSQL](https://www.postgresql.org/) - Opens-source SQL database to store data
- [TypeORM](https://typeorm.io/) - TS-based ORM for mostly SQL-based databases
- [JSON Web Token](https://jwt.io/) - A standard to secure/authenticate HTTP requests
- [Bcrypt.js](https://www.npmjs.com/package/bcryptjs) - For hashing passwords
- [Dotenv](https://www.npmjs.com/package/dotenv) - To load environment variables from a .env file

## Features

- Authentication (login/register w/ username & password)
- CRUD projects, with ability to add members for group work
- CRUD bugs, with title, description & priority
- Project members can add, edit, close & reopen bugs etc.
- Sort projects/bugs by various parameters like priority, recentely closed etc.
- Filter projects/bugs by name/title & other parameters
- CRUD notes, for guiding other members
- Descriptive color indicators for bug priority & status
- Error management with descriptive messages
- Toast notifications for actions: creating projects, removing membes etc.
- Loading spinners for fetching processes
- Proper responsive UI for all screens

## Usage

#### Env variable:

Create a .env file in server directory and add the following:

```
PORT = 3005
JWT_SECRET = "Your JWT secret"

```

#### Client:

Open client/src/backendUrl.js & change "backend" variable to `"http://localhost:3005"`

Run client development server:

```
cd client
npm install
npm start
```

Run backend development server:

```
cd server
npm install
npm run dev
```
