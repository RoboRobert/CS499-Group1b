# Lacrosse Scorekeeping

Welcome to the CS 499 Team 1a group project repository! Our application is designed to make it easy to keep score in Lacrosse, as well as provide other functionality such as tracking player stats.

## Developing

Once you've installed the dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

You also need to set up a PostgreSQL database alongside this web application. (It might be a good idea to make a bash? script that will set up a usable Postgres database)

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

## API Usage
To get a JSON representation of all players in our database, use the `/api/players/all` endpoint.

To get a JSON representation of a specific player by id, use the `/api/players/{id}` endpoint.

To reset the database entirely, use the `/api/reset` endpoint. This will clear all tables, and create new ones with some default data.

## Creating Players
To create a player, go to `/addPlayer`, enter your desired data and click `"Add to database!"`.

## Viewing Players
To view all data of a player, go to `/players/{id}`.