import { graphql } from "../../gql";

const DELETE__carById = graphql(`
  mutation DeleteCarById($idCar: ID!) {
    deleteCar(id: $idCar) {
      data {
        id
      }
    }
  }
`);

export default DELETE__carById;
