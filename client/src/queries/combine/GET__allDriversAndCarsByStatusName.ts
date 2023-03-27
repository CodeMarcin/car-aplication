import { graphql } from "../../gql";

const GET__allDriversAndCarsByStatusName = graphql(`
  query AllDriversAndCarsByStatusName($statusName: String) {
    drivers(pagination: { limit: -1 }, filters: { status: { statusName: { eq: $statusName } } }, sort: "id:DESC") {
      data {
        attributes {
          updatedAt
          name
          surname
        }
        id
      }
    }
    cars(filters: { status: { statusName: { eq: $statusName } } }, pagination: { limit: -1 }, sort: "id:DESC") {
      data {
        attributes {
          registrationNumber
        }
        id
      }
    }
  }
`);

export default GET__allDriversAndCarsByStatusName;
