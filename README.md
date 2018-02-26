# WORK IN PROGRESS

[![Build Status](https://travis-ci.org/chickpeas/intercepting-proxy.svg?branch=master)](https://travis-ci.org/chickpeas/intercepting-proxy)
[![Dependency Status](https://david-dm.org/chickpeas/intercepting-proxy.svg)](https://david-dm.org/chickpeas/intercepting-proxy.svg)


# Intercepting Proxy

An intercepting proxy written in Node.js with React + Redux, based on boilerplate from chentsulin/electron-react-boilerplate

The proxy is currently listening on port 8080.

To intercept network calls set your browser to use proxy at 120.0.0.1 with port 8080
 - switch button on intercept all requests, press Forward to pass each the request
 - switch button off pass through and prxy will show all calls and responses without blocking

After you have cloned the repository, you can install dependencies with yarn

```bash
$ yarn
```
**Note**: If you can't use [yarn](https://github.com/yarnpkg/yarn), run `npm install`.

## Run

Start the app in the `dev` environment. This starts the renderer process in [**hot-module-replacement**](https://webpack.js.org/guides/hmr-react/) mode and starts a webpack dev server that sends hot updates to the renderer process:

```bash
$ npm run dev
```

Alternatively, you can run the renderer and main processes separately. This way, you can restart one process without waiting for the other. Run these two commands **simultaneously** in different console tabs:

```bash
$ npm run start-renderer-dev
$ npm run start-main-dev
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://www.electron.build/multi-platform-build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:
```bash
DEBUG_PROD=true npm run package
```

For further information on the structure of this app please refer to the original boilerplate [README](https://github.com/chentsulin/electron-react-boilerplate/blob/master/README.md)
