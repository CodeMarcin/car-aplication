import { graphql } from "../../gql";

const GET__allDriversPagination = graphql(`
  query AllDrivers {
    drivers(sort: "id:DESC") {
      data {
        id
        attributes {
          name
          surname
          status {
            data {
              attributes {
                statusName
              }
            }
          }
        }
      }
    }
  }
`);

export default GET__allDriversPagination;
