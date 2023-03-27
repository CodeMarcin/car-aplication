import { graphql } from "../../gql";

const POST__createRoute = graphql(`
  mutation CreateRout($destination: String, $distance: Int, $startDate: Date, $endDate: Date, $driverId: ID!, $carId: ID!) {
    createRoute(data: { car: $carId, destination: $destination, distance: $distance, driver: $driverId, endDate: $endDate, startDate: $startDate }) {
      data {
        id
      }
    }
  }
`);

export default POST__createRoute;
