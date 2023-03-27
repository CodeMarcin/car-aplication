import { graphql } from "../../gql";

const GET__allCarsPagination = graphql(`
  query AllCars {
    cars(sort: "id:DESC") {
      data {
        id
        attributes {
          registrationNumber
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

export default GET__allCarsPagination;
