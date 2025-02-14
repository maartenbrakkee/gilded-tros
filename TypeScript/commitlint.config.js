export default {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // disable body-max-line-length to allow longer commit messages
    "body-max-line-length": [0, "always", 100],
  },
};
