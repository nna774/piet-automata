module.exports = {
  "extends": "airbnb",
  "rules": {
    "no-console": "off",
    "no-mixed-operators": "off",
    "yoda": ["error", "never", { "onlyEquality": true }],
    "strict": ["error", "function"],
  },
  env: {
    node: true,
    browser: false
  },
}
