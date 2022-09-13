const config = {
  testEnvironment: "jest-environment-node",
  projects: [
    {
      displayName: {
        name: "SERVER",
        color: "blue",
      },
      testMatch: ["**/__tests__/**/*.test{.ts,.tsx,.js,.jsx}"],
    },
    {
      displayName: {
        name: "SERVER_REPOSITORIES_UNIT",
        color: "blue",
      },
      testMatch: [
        "**/__tests__/repositories/unit/**/*.test{.ts,.tsx,.js,.jsx}",
      ],
    },
  ],
};

export default config;
