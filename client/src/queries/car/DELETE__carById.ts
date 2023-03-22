import { graphql } from "../../gql";

const DELETE__carById = graphql(`
  mutation DeleteCarById($id: ID!) {
    deleteCar(id: $id) {
      data {
        id
      }
    }
  }
`);

export default DELETE__carById;
