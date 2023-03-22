import { graphql } from "../../gql";

const UPDATE__carStatus = graphql(`
  mutation UpdateCarStatus($id: ID!, $status: ID) {
    updateCar(data: { status: $status }, id: $id) {
      data {
        id
      }
    }
  }
`);

export default UPDATE__carStatus;
