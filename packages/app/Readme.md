# Hookry App

## Quick Start

To get the app up and running quickly

```sh
yarn
yarn start
```

From there you can open the app on your phone following the metro instructions

## Release Channels

There are currently 2 build profiles each with their respective release channel

### Development

This is used by me to distribute the app via the ad hoc ios method

#### Steps for building

Pushing an update without a build

```sh
yarn publish:dev
```

Creating a new build when certain things change (assets, icons, permissions, etc...)

```sh
yarn build:dev
```

### Production

This is used to push updates to the app store

#### Steps for building

Pushing an update without a build

```sh
yarn publish:prod
```

Creating a new build when certain things change (assets, icons, permissions, etc...)

```sh
yarn build:prod
```
