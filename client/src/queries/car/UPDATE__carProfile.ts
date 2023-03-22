import { graphql } from "../../gql";

const UPDATE__carProfile = graphql(`
  mutation UpdateCarProfile($id: ID!, $counterStatus: Long, $registrationNumber: String, $review: Long) {
    updateCar(data: { counterStatus: $counterStatus, registrationNumber: $registrationNumber, review: $review }, id: $id) {
      data {
        id
      }
    }
  }
`);

export default UPDATE__carProfile;
