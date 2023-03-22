import { graphql } from "../../gql";

const GET__allCarsPagination = graphql(`
  query AllCars {
    cars(sort: "id:DESC") {
      data {
        attributes {
          registrationNumber
          status {
            data {
              attributes {
                statusName
              }
            }
          }
        }
        id
      }
    }
  }
`);

export default GET__allCarsPagination;
