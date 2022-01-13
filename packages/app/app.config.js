export default () => {
  return {
    name: process.env.APP_ENV === "production" ? "Hookry" : "Hookry (DEV)",
    ios: {
      bundleIdentifier:
      process.env.APP_ENV === "production" ? "com.ajhenry.hookry" : "com.ajhenry.hookry-dev",
    },
  };
};
