module.exports = {
  overrides: [{
    files: [
      "**/*.js",
    ],
    extends: [
      "lddubeau-base",
    ],
    env: {
      node: true,
    },
    overrides: [{
      files: [
        "lib/**/*.js",
      ],
      rules: {
        "no-continue": "off",
        // We use constant conditions quite often, for optimization reasons.
        "no-constant-condition": "off",
      },
    }, {
      files: [
        "test/**/*.js",
      ],
      env: {
        mocha: true,
      },
      rules: {
        "no-unused-expressions":
        ["off", "Lots of false positivites due to chai."],
      },
    },{
      files: [
        "misc/**/*.js",
      ],
      env: {
        browser: true,
        node: false,
      },
    }],
  }, {
    files: [
      "**/*.ts",
    ],
    env: {
      node: true,
    },
    extends: [
      "eslint:recommended",
      "eslint-config-lddubeau-ts",
    ],
    rules: {
      "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
      "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
      "import/extensions": ["error", "always", {
        pattern: {
          js: "never",
          ts: "never",
        },
      }],
      // Too useful in this code-base.
      "@typescript-eslint/no-non-null-assertion": "off",
    },
    overrides: [{
      files: [
        "test/**/*.ts",
      ],
      env: {
        mocha: true,
      },
      parserOptions: {
        project: "test/tsconfig.json",
        sourceType: "module",
      },
      "settings": {
        "import/parsers": {
          "@typescript-eslint/parser": [".ts", ".tsx"]
        },
        "import/resolver": {
          // use <root>/tsconfig.json
          "typescript": {
            "alwaysTryTypes": true // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`
          },

          // use <root>/path/to/folder/tsconfig.json
          "typescript": {
            "directory": "./test"
          },
        }
      },
      rules: {
        "no-unused-expressions":
        ["off", "Lots of false positivites due to chai."],
        "no-shadow": ["off", "We shadow test all over the place."],
        "@typescript-eslint/tslint/config": [
          "error",
          {
            lintFile: "./.tslint.config.json",
          },
        ],
        // Routinely violated by large describe blocks.
        "max-lines-per-function": "off",
      }
    }],
  }],
};
