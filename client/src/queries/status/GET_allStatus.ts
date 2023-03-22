import { graphql } from "../../gql";

const GET_allStatus = graphql(`
  query AllStatus {
    statuses {
      data {
        attributes {
          statusName
        }
      }
    }
  }
`);

export default GET_allStatus;
