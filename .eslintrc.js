module.exports = {
    "env": {
      "node": true,
      "jest": true,
    },
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
      "react/jsx-filename-extension": ["error", { "extensions": [".js", ".jsx"] }],
      "no-underscore-dangle": 0,
      "react/forbid-prop-types": 0,
      "class-methods-use-this": 0
    }
};