import { graphql } from "../../gql";

const GET__statusByName = graphql(`
  query StatusByName($statusName: String) {
    statuses(filters: { statusName: { eq: $statusName } }) {
      data {
        id
        attributes {
          statusName
        }
      }
    }
  }
`);

export default GET__statusByName;
