# Mon Réseau (Back-end)

You can find all the code of the app/web app "Mon Réseau" in this repo.

The app is accessible [here](https://ns3093511.ip-54-36-122.eu/).

![Logo](https://ns3093511.ip-54-36-122.eu/assets/assets/images/white-logo.969fe893298bfeee352c251c89759a1a.png)

## Environment Variables

To run this project, you will need to add the following **environment variables** to your .env file :

**`DATABASE_URL`**

**`JWT_SECRET`**

**`JWT_EXPIRES_IN`**

**`API_KEY`** (which needs to match the EXPO_PUBLIC_API_KEY of the front-end)

**`TZ`** (optional : for a specific timezone)

## Run Locally

### Installation

- Clone the project

```bash
  git clone https://github.com/Monreseauapp/app-back.git
```

- Go to the project directory

```bash
  cd app-back
```

- Install dependencies

```bash
  npm install
```

### Start the project

To start the project :

```bash
  npm start
```

### Access the app

**Web** :

- You can access the routes with : `localhost:3000` or `ip:3000`
- If you start the project with the front-end, go to : `localhost:8081` or `ip:8081` and the front-end will do the API calls.

## Tech Stack

[**Client:**](https://github.com/Monreseauapp/app-front) React Native, Expo

[**Server:**](https://github.com/Monreseauapp/app-back) Nest.JS

## Authors

- **[@Maxime-Labbe](https://github.com/Maxime-Labbe)**
- **[@Zogeek](https://github.com/zogeek)**
