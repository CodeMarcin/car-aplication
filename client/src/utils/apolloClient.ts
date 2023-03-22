import { ApolloClient, InMemoryCache } from "@apollo/client";

const clientApollo = new ApolloClient({
  // uri: `http://localhost:1337/graphql`,
  uri: `${import.meta.env.VITE_APP_BACKEND_URL}/graphql`,
  cache: new InMemoryCache(),
});

export default clientApollo;
