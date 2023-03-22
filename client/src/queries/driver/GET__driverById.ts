import { graphql } from "../../gql";

const GET__driverById = graphql(`
  query DriverById($id: ID!) {
    driver(id: $id) {
      data {
        attributes {
          name
          surname
          status {
            data {
              attributes {
                statusName
              }
              id
            }
          }
        }
      }
    }
  }
`);

export default GET__driverById;
