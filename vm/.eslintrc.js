module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    // by default, disalows semicolons
    // this allows them and 2 means error
    // when they are not present
    // semi: [2, "always"],
    "quotes": ["error", "single"]
  },
  parserOptions: {
    parser: "babel-eslint",
  },
};
