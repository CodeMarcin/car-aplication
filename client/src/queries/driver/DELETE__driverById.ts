import { graphql } from "../../gql";

const DELETE__driverById = graphql(`
  mutation DeleteDriverById($idDriver: ID!) {
    deleteDriver(id: $idDriver) {
      data {
        id
      }
    }
  }
`);

export default DELETE__driverById;
