import { graphql } from "../../gql";

const DELETE__routeById = graphql(`
  mutation DeleteRoutById($id: ID!) {
    deleteRoute(id: $id) {
      data {
        id
      }
    }
  }
`);

export default DELETE__routeById;
