import { graphql } from "../../gql";

const POST__createDriver = graphql(`
  mutation CreateDriver($name: String, $surname: String, $status: ID) {
    createDriver(data: { name: $name, surname: $surname, status: $status }) {
      data {
        id
      }
    }
  }
`);

export default POST__createDriver;
