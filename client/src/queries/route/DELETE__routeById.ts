import { graphql } from "../../gql";

const DELETE__routeById = graphql(`
  mutation DeleteRoutById($idRoute: ID!) {
    deleteRoute(id: $idRoute) {
      data {
        id
      }
    }
  }
`);

export default DELETE__routeById;
