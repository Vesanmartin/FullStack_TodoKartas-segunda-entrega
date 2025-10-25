//COnfiguración de jest para que use el mock de react-dom

export default {
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
    moduleNameMapper: {
      "^react-router-dom$": "<rootDir>/src/test/react-router-dom-shim.js",
    },

    moduleNameMapper: {
        "^react-router-dom$": "<rootDir>/src/test/__mocks__/react-router-dom.js"
      }
  };
  