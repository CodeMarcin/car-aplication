import { useMutation } from "@apollo/client";

import DELETE__driverById from "../queries/driver/DELETE__driverById";
import DELETE__carById from "../queries/car/DELETE__carById";
import DELETE__routeById from "../queries/route/DELETE__routeById";
import GET__allRoutesPagination from "../queries/route/GET__allRoutesPagination";
import GET__allDriversPagination from "../queries/driver/GET__allDriversPagination";
import GET__allCarsPagination from "../queries/car/GET__allCarsPagination";

interface ICallDeleteProps {
  idDriver?: string;
  idCar?: string;
  idRoute?: string;
}
export const useDelete = () => {
  const [deleteDriverById, { loading: loadingDeleteDriverById }] = useMutation(DELETE__driverById, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: [{ query: GET__allRoutesPagination }, { query: GET__allDriversPagination }],
  });
  const [deleteCarById, { loading: loadDeleteCarById }] = useMutation(DELETE__carById, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: [{ query: GET__allRoutesPagination }, {query: GET__allCarsPagination}],
  });
  const [deleteRouteByID, { loading: loadingDeleteRouteById }] = useMutation(DELETE__routeById, {
    notifyOnNetworkStatusChange: true,
    refetchQueries: [{ query: GET__allRoutesPagination }],
  });

  const callDelete = async ({ idDriver, idCar, idRoute }: ICallDeleteProps) => {
    try {
      if (idDriver) await deleteDriverById({ variables: { idDriver } });
      if (idCar) await deleteCarById({ variables: { idCar } });
      if (idRoute) await deleteRouteByID({ variables: { idRoute } });
    } catch (err) {
      console.error(err);
    }
  };

  return { loading: loadingDeleteDriverById || loadingDeleteRouteById || loadDeleteCarById, callDelete };
};
