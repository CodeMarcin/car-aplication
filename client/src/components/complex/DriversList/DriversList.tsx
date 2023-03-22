import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

import { showSnackbar } from "../../../redux/sliceSnackbar";
import { resetRefetch } from "../../../redux/sliceRefetch";
import { showRightActionMenu } from "../../../redux/sliceRightActionMenu";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";

import GET__allDriversPagination from "../../../queries/driver/GET__allDriversPagination";
import DELETE__driverById from "../../../queries/driver/DELETE__driverById";

import Title from "../../parts/Title/Title";
import Table from "../../parts/Table/Table";
import Modal from "../../parts/Modal/Modal";
import ChipStatus from "../../parts/ChipStatus/ChipStatus";
import LoaderSvg from "../../../assets/svg/LoaderSvg";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PathSvg from "../../../assets/svg/PathSvg";

interface IDeleteModal {
  showModal: boolean;
  id?: string;
  name?: string;
  surName?: string;
}

function DriversList() {
  const [deleteModal, setDeleteModal] = useState<IDeleteModal>({ showModal: false });
  const [apiWorking, setApiWorking] = useState(true);

  const { loading, data, refetch } = useQuery(GET__allDriversPagination);
  const [deleteDriverById] = useMutation(DELETE__driverById);

  const { refetch: refetchAllDriversRedux } = useAppSelector((state) => state.refetch);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  if (refetchAllDriversRedux === "AllDrivers") {
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

  const toggleDeleteModal = (id?: string, name?: string, surName?: string) => {
    if (!deleteModal.showModal) setDeleteModal({ showModal: true, id, name, surName });
    else setDeleteModal({ showModal: false });
  };

  const deleteDriver = async () => {
    try {
      setApiWorking(true);
      await deleteDriverById({ variables: { id: deleteModal.id! } });
      await refetch();
      setApiWorking(false);
      toggleDeleteModal();
      dispatch(showSnackbar({ type: "Success" }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setApiWorking(loading);
  }, [loading]);

  return (
    <>
      <div className="flex flex-col w-full">
        <Title>{t("LABEL__DRIVERS")}</Title>
        {!loading ? (
          data && (
            <Table thElements={[t("LABEL__NAME_AND_SURNAME"), t("LABEL__STATUS"), t("LABEL__ACTION")]}>
              {data.drivers?.data.map((el) => (
                <Table.Row key={el.id}>
                  <Table.Item content={`${el.attributes?.name} ${el.attributes?.surname}`} />
                  <Table.Item content={<ChipStatus status={el.attributes?.status?.data?.attributes?.statusName as TStatus} />} />
                  <Table.Item
                    center
                    content={
                      <div className="flex justify-center gap-x-4">
                        <PathSvg className="hover:text-secondary cursor-pointer" />
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
                </Table.Row>
              ))}
            </Table>
          )
        ) : (
          <LoaderSvg />
        )}
      </div>
      {deleteModal.showModal && (
        <Modal
          action="delete"
          type="confirm"
          loading={apiWorking}
          title={t("LABEL__DELETE_NAME_SURNAME", { name: deleteModal.name, surName: deleteModal.surName })}
          handleClose={toggleDeleteModal}
          handleApproveAction={deleteDriver}
        >
          <Modal.Content>
            <p dangerouslySetInnerHTML={{ __html: t("LABEL__CONFIRM_DELETE_NAME_SURNAME", { name: deleteModal.name, surName: deleteModal.surName }) }}></p>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}

export default DriversList;
