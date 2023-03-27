import { useState } from "react";

import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

import { useDelete } from "../../../hooks/useDelete";

import { showSnackbar } from "../../../redux/sliceSnackbar";
import { showRightActionMenu } from "../../../redux/sliceRightActionMenu";
import { useDispatch } from "react-redux";

import GET__allCarsPagination from "../../../queries/car/GET__allCarsPagination";

import Table from "../../parts/Table/Table";
import ChipStatus from "../../parts/ChipStatus/ChipStatus";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PathSvg from "../../../assets/svg/PathSvg";
import LoaderSvg from "../../../assets/svg/LoaderSvg";
import Modal from "../../parts/Modal/Modal";

interface IDeleteModal {
  showModal: boolean;
  idCar?: string;
  idRoute?: string;
  registrationNumber?: string;
}

function CarsList() {
  const [deleteModal, setDeleteModal] = useState<IDeleteModal>({ showModal: false });

  const { loading, data, refetch } = useQuery(GET__allCarsPagination);

  const dispatch = useDispatch();

  const { loading: loadingDelete, callDelete } = useDelete();

  const { t } = useTranslation();

  const toggleDeleteModal = (idCar?: string, idRoute?:string, registrationNumber?: string) => {
    if (!deleteModal.showModal) setDeleteModal({ showModal: true, idCar, idRoute, registrationNumber });
    else setDeleteModal({ showModal: false });
  };

  const handleDeleteCar = async () => {
    try {
      await callDelete({ idCar: deleteModal.idCar, idRoute: deleteModal.idRoute });
      toggleDeleteModal();
      dispatch(showSnackbar({ type: "Success" }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex w-full flex-col">
        {!loading ? (
          data && (
            <Table thElements={[t("LABEL__CAR_REGISTRATION"), t("LABEL__STATUS"), t("LABEL__ACTION")]}>
              {data.cars?.data.map((el) => (
                <Table.Row key={el.id}>
                  <Table.Item content={el.attributes?.registrationNumber} />
                  <Table.Item content={<ChipStatus status={el.attributes?.status?.data?.attributes?.statusName as TStatus} />} />
                  <Table.Item
                    center
                    content={
                      <div className="flex justify-center gap-x-4">
                        <PathSvg className="cursor-pointer hover:text-secondary" />
                        <ModeEditOutlineOutlinedIcon
                          className="cursor-pointer hover:text-secondary"
                          onClick={() => dispatch(showRightActionMenu({ type: "EditCar", id: el.id! }))}
                        />
                        <DeleteOutlineOutlinedIcon
                          className="cursor-pointer hover:text-error"
                          onClick={() => toggleDeleteModal(el.id!, el.attributes?.route?.data?.id!, el.attributes?.registrationNumber)}
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
          loading={loadingDelete}
          title={t("LABEL__DELETE_CAR_REGISTRATION_NUMBER", { carRegistration: deleteModal.registrationNumber })}
          handleClose={toggleDeleteModal}
          handleApproveAction={handleDeleteCar}
        >
          <Modal.Content>
            <p
              dangerouslySetInnerHTML={{
                __html: t("LABEL__CONFIRM_DELETE_CAR_REGISTRATION_NUMBER", { carRegistration: deleteModal.registrationNumber }),
              }}
            ></p>
          </Modal.Content>
        </Modal>
      )}
    </>
  );
}

export default CarsList;
