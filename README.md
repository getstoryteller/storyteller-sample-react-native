# Storyteller React Native Sample App

<a href="https://getstoryteller.com" target="_blank">
  <img alt="Storyteller integration examples for React Native, from getstoryteller.com" src="img/readme-cover.png">
</a>

<p>
  <a href="https://getstoryteller.com" target="_blank"><img alt="What is Storyteller?" src="img/what-is-storyteller-btn.png" width="302" height="48"></a>&nbsp;&nbsp;&nbsp;
  <a href="https://docs.getstoryteller.com/documents/react-native-sdk" target="_blank"><img alt="Storyteller React Native Documentation" src="img/docs-btn.png" width="377" height="48"></a>
</p>

## SDK Installation

### Install with NPM

`npm install @getstoryteller/react-native-storyteller-sdk`

### Install with Yarn

`yarn add @getstoryteller/react-native-storyteller-sdk`

## Documentation

All of the documentation for our React Native SDK is [available on our website](https://www.getstoryteller.com/documentation/react-native/quickstart)

## Sample App

This project was bootstrapped with [the React Native CLI](https://reactnative.dev/docs/environment-setup?guide=native)

### Prerequisites

- A working React Native development environment

Please see the guides on the [ReactNative website](https://reactnative.dev/docs/environment-setup) for instructions on how to configure your environment

### Getting Started

1. Update the `useStorytellerConfig.ts` file in this project with your Storyteller API key. For example:

```typescript
const useStorytellerConfig = () => ({
  storytellerApiKey: '[API-KEY]',
});

export default useStorytellerConfig;
```

> You should replace `[API-KEY]` with your Storyteller API key. [Get in touch](mailto:hello@getstoryteller.com) to request one.

2. Run the following command in the project directory:

```bash
npm install
```

1. To run on Android, run the following command:

```bash
npx react-native run-android
```

1. To run on iOS, run the following commands:

    1. `cd ios && pod repo update && pod install`
    2. `cd ..`
    3. `npx react-native run-ios`

## Other Platforms

Storyteller is also available for [iOS](https://github.com/getstoryteller/storyteller-sample-ios), [Android](https://github.com/getstoryteller/storyteller-sample-android) and [Web](https://github.com/getstoryteller/storyteller-sample-web).

## Need Help?

We're always available at [support@getstoryteller.com](mailto:support@getstoryteller.com?Subject=Web%20Sample%20App) to provide help and assistance with integrating the Storyteller SDK into your React Native application.