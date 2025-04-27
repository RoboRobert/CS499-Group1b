# Lacrosse Scorekeeping

Welcome to the CS 499 Team 1a group project repository! Our application is designed to make it easy to keep score in Lacrosse, as well as provide other functionality such as tracking player stats.

If you just want to use the latest version of the site hosted publicly, you can follow this link: http://3.136.29.133

If you want to run the app locally, read on.

## Developing

This program has been tested on Node version `22.14.0` and npm version `10.9.2`. You need Node and npm to run the app. If you haven't installed NodeJS and npm, go here: https://nodejs.org/en/download

After you have npm set up, navigate to the top-level directory of the project and install the dependencies with `npm ci`. Normally, you might want to use `npm install`, but `npm ci` downloads dependencies using the versions we've tested the application on, which should guarantee that it will work.

After that you can start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

You also need to set up a PostgreSQL database alongside this web application.

## Setting up a Postgres Database
To start, set up a `.env` file in the top-level directory of the project, and put these lines in it:

```
# Private
DBUSER="postgres"
PGPASSWORD="test"
PGHOST="localhost"
PGPORT=5432
PGDATABASE="template1"
```

This file contains the config information used to connect to a database.

The config given above will allow you to develop using a Postgres database with user `postgres`, password `test`, running locally (`localhost`) on port `5432` on database `template1`.  
No matter where and how you install Postgres, as long as your database is configured the same as your `.env` file, you should be good to go.

Now you're ready to install PostgreSQL. The instructions below work on Ubuntu.  
To install PostgreSQL on a different platform, follow the instructions from their website: https://www.postgresql.org/

To do this on Ubuntu, follow these steps (taken from [here](https://ubuntu.com/server/docs/install-and-configure-postgresql)):

```
sudo apt install postgresql
sudo -u postgres psql template1
ALTER USER postgres with encrypted password 'test';

// Run \q to exit the postgres terminal

// Then run
sudo systemctl restart postgresql.service
// If the above command doesn't work, run this:
sudo service postgresql restart
```

After setting up your Postgres server and running your application, go to 
`localhost:{port}/api/dbreset`
in your web browser to set up the database for use. Replace {port} with whatever port your local application is running on.

### NOTE: 
If you do not go to `localhost:{port}/api/dbreset` and reset the database, the app will not work correctly.

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## Link to Github Repo
https://github.com/RoboRobert/CS499-Group1b
