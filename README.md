# web-realtime-demo

This repository contains an example application which implements various realtime communication methods 
for the browser (React) and Node.js using TypeScript.

Currently implemented endpoints include all popular realtime communication protocols
(which do not require an encrypted HTTP or HTTP3):

* HTTP Long Polling
* Server Sent Events (SSE)
* WebSocket API
* [Socket.io](https://github.com/socketio/socket.io) protocol

## Running the application

Node.js __22__ and `yarn` are required.

To run the application, from the root of the project run the following.

```bash
cp .env.example .env   # you can also customize default port in the `.env` file
yarn install
yarn bootstrap
```

Then navigate to `http://localhost:6969` (or whatever port you selected in the `.env` file) in your web browser.

## Starting a development server

To start a development server for React web app, from the project root run the the following.

```bash
cp .env.example .env
yarn install
yarn dev
```

In another terminal window start Node.js service.

```bash
yarn run-service
```

## License

MIT
