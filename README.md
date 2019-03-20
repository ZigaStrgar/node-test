# Node Test Assignment

## Set Up

After cloning the repository run the following command which will install all the project dependencies and create an environment specific file. 

```bash
npm install && cp .env.example .env
```

And register at the [IP Stack](https://ipstack.com/) for an access key which you paste as the value of `IP_API_KEY` in `.env` file to be able to make a request for IP Geolocation data.

## Running

To start the application just run the command bellow and server will start on the default port `3000` unless you change it in your `.env` file.

```bash
npm start
```

## Possible upgrades

Usage of [Express Bearer Token](https://www.npmjs.com/package/express-bearer-token) dependency as a way of authenticating requests.