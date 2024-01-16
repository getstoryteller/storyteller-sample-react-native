# Storyteller React Native SDK Simple Sample

This project was bootstrapped with [the React Native CLI](https://reactnative.dev/docs/environment-setup?guide=native)

### Prerequisites

- A working React Native development environment

Please see the guides on the [ReactNative website](https://reactnative.dev/docs/environment-setup) for instructions on how to configure your environment

### Getting Started

1. Update `App.tsx` file in this project with your Storyteller API key. For example:

```typescript
   const storytellerApiKey = "[API-KEY]";
```

> You should replace `[API-KEY]` with your Storyteller API key. [Get in touch](mailto:hello@getstoryteller.com) to request one.

2. Run the following command in the project directory:

```bash
npm install
```

3. To run on Android, run the following command:

```bash
npx react-native run-android
```

4. To run on iOS, run the following commands:

    1. `cd ios && pod repo update && pod install`
    2. `cd ..`
    3. `npx react-native run-ios`