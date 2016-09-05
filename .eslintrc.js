module.exports = {
  "extends": "airbnb",
  "rules": {
    "no-console": "off",
    "no-mixed-operators": ["error", { "allowSamePrecedence": true }],
    "yoda": ["error", "never", { "exceptRange": true }],
    "strict": ["error", "function"],
  },
  env: {
    node: true,
    browser: false
  },
}
