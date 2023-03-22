import { graphql } from "../../gql";

const POST__createCar = graphql(`
  mutation CreateCar($counterStatus: Long, $registrationNumber: String, $review: Long, $status: ID) {
    createCar(data: { counterStatus: $counterStatus, registrationNumber: $registrationNumber, review: $review, status: $status }) {
      data {
        id
      }
    }
  }
`);

export default POST__createCar;
