import { graphql } from "../../gql";

const GET__carById = graphql(`
  query CarById($id: ID!) {
    car(id: $id) {
      data {
        attributes {
          registrationNumber
          counterStatus
          review
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

export default GET__carById;
