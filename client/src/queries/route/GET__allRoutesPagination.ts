import { graphql } from "../../gql";

const GET__allRoutesPagination = graphql(`
  query AllRoutes {
    routes(sort: "id:DESC") {
      data {
        attributes {
          destination
          distance
          endDate
          car {
            data {
              attributes {
                registrationNumber
              }
            }
          }
          driver {
            data {
              attributes {
                name
                surname
              }
            }
          }
        }
        id
      }
    }
  }
`);

export default GET__allRoutesPagination;
