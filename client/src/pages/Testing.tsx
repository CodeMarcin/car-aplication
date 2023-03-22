import { useQuery } from "@apollo/client";
import Card from "../components/parts/Card/Card";
import ChipStatus from "../components/parts/ChipStatus/ChipStatus";
import { graphql } from "../gql";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Modal from "../components/parts/Modal/Modal";
import { useState } from "react";
import Table from "../components/parts/Table/Table";
import Button from "../components/parts/Button/Button";
import GET__allDriversPagination from "../queries/driver/GET__allDriversPagination";

interface IDeleteModal {
  showModal: boolean;
  id?: string;
  name?: string;
  surName?: string;
}

function Testing() {
  const { loading, error, data } = useQuery(GET__allDriversPagination);

  const [deleteModal, setDeleteModal] = useState<IDeleteModal>({ showModal: false });

  const toggleDeleteModal = (id?: string, name?: string, surName?: string) => {
    if (!deleteModal.showModal) setDeleteModal({ showModal: true, id, name, surName });
    else setDeleteModal({ showModal: false });
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center ">
        <div className="container flex flex-col gap-y-4 mx-auto my-0 ">
          <p className="font-medium font-sm">Drivers</p>
          <Table thElements={["Name and surname", "Status", "Action "]}>
            {!loading &&
              data &&
              data.drivers?.data.map((el) => (
                <Table.Row key={el.id}>
                  <Table.Item content={`${el.attributes?.name} ${el.attributes?.surname}`} />
                  <Table.Item content={<ChipStatus status={el.attributes?.status?.data?.attributes?.statusName as TStatus} />} />
                  <Table.Item
                    center
                    content={
                      <div className="flex justify-center gap-x-4">
                        <ModeEditOutlineOutlinedIcon className="hover:text-secondary cursor-pointer" />
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


        </div>
      </div>
      {deleteModal.showModal && (
        <Modal title={`Delete ${deleteModal.name} ${deleteModal.surName}`} handleClose={toggleDeleteModal}>
          <Modal.Content>
            <div>
              Are you sure delete
              <b className="pl-1">
                {deleteModal.name} {deleteModal.surName}
              </b>
              ?
            </div>
          </Modal.Content>
          <Modal.Action>
            <Button onClick={toggleDeleteModal}>NO</Button>
            <Button variant="fulfilled" onClick={() => {}}>
              YES
            </Button>
          </Modal.Action>
        </Modal>
      )}
    </>
  );
}

export default Testing;
