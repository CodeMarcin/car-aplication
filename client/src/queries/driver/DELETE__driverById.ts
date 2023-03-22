import { graphql } from "../../gql";

const DELETE__driverById = graphql(`
  mutation MyMutation ($id: ID!) {
    deleteDriver(id: $id) {
      data {
        attributes {
          name
        }
      }
    }
  }
`);

export default DELETE__driverById;
