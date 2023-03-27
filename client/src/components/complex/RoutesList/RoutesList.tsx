import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

import { showSnackbar } from "../../../redux/sliceSnackbar";
import { resetRefetch } from "../../../redux/sliceRefetch";
import { showRightActionMenu } from "../../../redux/sliceRightActionMenu";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";

import GET__allRoutesPagination from "../../../queries/route/GET__allRoutesPagination";
import DELETE__routeById from "../../../queries/route/DELETE__routeById";

import Table from "../../parts/Table/Table";
import Modal from "../../parts/Modal/Modal";
import ChipStatus from "../../parts/ChipStatus/ChipStatus";
import LoaderSvg from "../../../assets/svg/LoaderSvg";

import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import DoubleArrowOutlinedIcon from "@mui/icons-material/DoubleArrowOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PathSvg from "../../../assets/svg/PathSvg";

interface IDeleteModal {
  showModal: boolean;
  id?: string;
  destination?: string;
}

function RoutesList() {
  const [deleteModal, setDeleteModal] = useState<IDeleteModal>({ showModal: false });

  const { loading, data, refetch } = useQuery(GET__allRoutesPagination);
  const [deleteDriverById, { loading: loadDeleteDriverById }] = useMutation(DELETE__routeById, { notifyOnNetworkStatusChange: true });

  const { refetch: refetchAllRoutesRedux } = useAppSelector((state) => state.refetch);
  const dispatch = useDispatch();

   if (refetchAllRoutesRedux === "AllRoutes") {
     const handleNeedRefetch = async () => {
       try {
         await refetch();
         dispatch(resetRefetch());
       } catch (err) {
         console.error(err);
       }
     };
     handleNeedRefetch();
   }

  const { t } = useTranslation();
  return (
    <div className="flex flex-col w-full">
      {!loading ? (
        data && (
          <Table thElements={[t("LABEL__DRIVER_CAR"), t("LABEL__DESTINATION"), t("LABEL__ACTION"), ""]}>
            {data.routes?.data.map((el) => (
              <Table.Row key={el.id}>
                <Table.Item content={`${el.attributes?.driver?.data?.attributes?.name} ${el.attributes?.car?.data?.attributes?.registrationNumber}`} />
                {/* <Table.Item content={"as "}> */}

                <Table.Item content={el.attributes?.destination} />
                <Table.Item
                  content={
                    <div className="flex  gap-x-4">
                      {/* <PathSvg className="hover:text-secondary cursor-pointer" /> */}
                      <ModeEditOutlineOutlinedIcon
                        className="hover:text-secondary cursor-pointer"
                        onClick={() => dispatch(showRightActionMenu({ type: "EditDriver", id: el.id! }))}
                      />
                      <DeleteOutlineOutlinedIcon
                        className="hover:text-error cursor-pointer"
                        onClick={() => toggleDeleteModal(el.id!, el.attributes?.name, el.attributes?.surname)}
                      />
                    </div>
                  }
                />
                <Table.Item center content={<ChevronRightOutlinedIcon className="cursor-pointer" />} />
              </Table.Row>
            ))}
          </Table>
        )
      ) : (
        <LoaderSvg />
      )}
    </div>
  );
}

export default RoutesList;
