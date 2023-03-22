import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://127.0.0.1:1337/graphql",
  ignoreNoDocuments: true,
  generates: {
    "./src/gql/": {
      documents: ["src/**/*.tsx", "src/**/*.ts"],
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
