import { graphql } from "../../gql";

const UPDATE__driverStatus = graphql(`
  mutation UpdateDriverStatus($id: ID!, $status: ID) {
    updateDriver(data: { status: $status }, id: $id) {
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
        id
      }
    }
  }
`);

export default UPDATE__driverStatus;
