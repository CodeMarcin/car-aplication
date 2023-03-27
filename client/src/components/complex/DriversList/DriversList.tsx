import { useState } from "react";

import { useQuery } from "@apollo/client";
import { useTranslation } from "react-i18next";

import { useDelete } from "../../../hooks/useDelete";

import { showSnackbar } from "../../../redux/sliceSnackbar";

import { showRightActionMenu } from "../../../redux/sliceRightActionMenu";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../redux/hooks";

import GET__allDriversPagination from "../../../queries/driver/GET__allDriversPagination";

import Table from "../../parts/Table/Table";
import Modal from "../../parts/Modal/Modal";
import ChipStatus from "../../parts/ChipStatus/ChipStatus";
import LoaderSvg from "../../../assets/svg/LoaderSvg";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import PathSvg from "../../../assets/svg/PathSvg";

interface IDeleteModal {
  showModal: boolean;
  idDriver?: string;
  idRoute?: string;
  name?: string;
  surName?: string;
}

function DriversList() {
  const [deleteModal, setDeleteModal] = useState<IDeleteModal>({ showModal: false });

  const { loading, data } = useQuery(GET__allDriversPagination);

  const dispatch = useDispatch();

  const { loading: loadingDelete, callDelete } = useDelete();

  const { t } = useTranslation();

  const toggleDeleteModal = (idDriver?: string, idRoute?: string, name?: string, surName?: string) => {
    if (!deleteModal.showModal) setDeleteModal({ showModal: true, idDriver, idRoute, name, surName });
    else setDeleteModal({ showModal: false });
  };

  const handleDeleteDriver = async () => {
    try {
      await callDelete({ idDriver: deleteModal.idDriver, idRoute: deleteModal.idRoute });
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
            <Table thElements={[t("LABEL__NAME_AND_SURNAME"), t("LABEL__STATUS"), t("LABEL__ACTION")]}>
              {data.drivers?.data.map((el) => (
                <Table.Row key={el.id}>
                  <Table.Item content={`${el.attributes?.name} ${el.attributes?.surname}`} />
                  <Table.Item content={<ChipStatus status={el.attributes?.status?.data?.attributes?.statusName as TStatus} />} />
                  <Table.Item
                    center
                    content={
                      <div className="flex justify-center gap-x-4">
                        <PathSvg className="cursor-pointer hover:text-secondary" />
                        <ModeEditOutlineOutlinedIcon
                          className="cursor-pointer hover:text-secondary"
                          onClick={() => dispatch(showRightActionMenu({ type: "EditDriver", id: el.id! }))}
                        />
                        <DeleteOutlineOutlinedIcon
                          className="cursor-pointer hover:text-error"
                          onClick={() => toggleDeleteModal(el.id!, el.attributes?.route?.data?.id!, el.attributes?.name, el.attributes?.surname)}
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
          title={t("LABEL__DELETE_NAME_SURNAME", { name: deleteModal.name, surName: deleteModal.surName })}
          handleClose={toggleDeleteModal}
          handleApproveAction={handleDeleteDriver}
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
