import { graphql } from "../../gql";

const UPDATE__driverProfile = graphql(`
  mutation UpdateDriverProfile($id: ID!, $name: String, $surname: String) {
    updateDriver(data: { name: $name, surname: $surname }, id: $id) {
      data {
        id
      }
    }
  }
`);

export default UPDATE__driverProfile;
