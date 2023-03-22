import { graphql } from "../../gql";

const DELETE__driverById = graphql(`
  mutation DeleteDriverById($id: ID!) {
    deleteDriver(id: $id) {
      data {
        id
      }
    }
  }
`);

export default DELETE__driverById;
