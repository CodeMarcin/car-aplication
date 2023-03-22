import { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

import { showSnackbar } from "../../../redux/sliceSnackbar";
import { resetRefetch } from "../../../redux/sliceRefetch";
import { showRightActionMenu } from "../../../redux/sliceRightActionMenu";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";

import GET__allCarsPagination from "../../../queries/car/GET__allCarsPagination";
import DELETE__carById from "../../../queries/car/DELETE__carById";

import Title from "../../parts/Title/Title";
import Table from "../../parts/Table/Table";
import ChipStatus from "../../parts/ChipStatus/ChipStatus";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PathSvg from "../../../assets/svg/PathSvg";
import LoaderSvg from "../../../assets/svg/LoaderSvg";
import Modal from "../../parts/Modal/Modal";

interface IDeleteModal {
  showModal: boolean;
  id?: string;
  registrationNumber?: string;
}

function CarsList() {
  const [deleteModal, setDeleteModal] = useState<IDeleteModal>({ showModal: false });

  const { loading, data, refetch } = useQuery(GET__allCarsPagination);
  const [deleteCarById, { loading: loadDeleteCarById }] = useMutation(DELETE__carById, { notifyOnNetworkStatusChange: true });

  const { refetch: refetchAllDriversRedux } = useAppSelector((state) => state.refetch);
  const dispatch = useDispatch();

  const { t } = useTranslation();

  if (refetchAllDriversRedux === "AllCars") {
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

  const toggleDeleteModal = (id?: string, registrationNumber?: string) => {
    if (!deleteModal.showModal) setDeleteModal({ showModal: true, id, registrationNumber });
    else setDeleteModal({ showModal: false });
  };

  const deleteCar = async () => {
    try {
      await deleteCarById({ variables: { id: deleteModal.id! } });
      toggleDeleteModal();
      await refetch();
      dispatch(showSnackbar({ type: "Success" }));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="flex flex-col w-full">
        <Title>{t("LABEL__CARS")}</Title>
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
                        <PathSvg className="hover:text-secondary cursor-pointer" />
                        <ModeEditOutlineOutlinedIcon
                        className="hover:text-secondary cursor-pointer"
                        onClick={() => dispatch(showRightActionMenu({ type: "EditCar", id: el.id! }))}
                      />
                        <DeleteOutlineOutlinedIcon
                          className="hover:text-error cursor-pointer"
                          onClick={() => toggleDeleteModal(el.id!, el.attributes?.registrationNumber)}
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
          loading={loadDeleteCarById || loading}
          title={t("LABEL__DELETE_CAR_REGISTRATION_NUMBER", { carRegistration: deleteModal.registrationNumber })}
          handleClose={toggleDeleteModal}
          handleApproveAction={deleteCar}
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
