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
          route {
            data {
              id
            }
          }
        }
      }
    }
  }
`);

export default GET__allDriversPagination;
