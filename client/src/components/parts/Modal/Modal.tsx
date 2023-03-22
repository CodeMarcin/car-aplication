import { useEffect } from "react";
import { createPortal } from "react-dom";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Button from "../../parts/Button/Button";
import LoaderSvg from "../../../assets/svg/LoaderSvg";

import { useTranslation } from "react-i18next";

interface IModalBasic {
  title: string;
  children: React.ReactNode;
  handleClose: () => void;
  action?: "delete";
  loading?: boolean;
}

interface IModalConfirm extends IModalBasic {
  type?: "confirm";
  handleApproveAction: () => void;
}

interface IModalCustom extends IModalBasic {
  type?: "custom";
  handleApproveAction?: never;
}

type IModalProps = IModalConfirm | IModalCustom;

export const ModalContent = ({ children }: ISlotBasic) => <div className="flex px-4">{children}</div>;
export const ModalAction = ({ children }: ISlotBasic) => <div className="flex justify-evenly w-full">{children}</div>;

function Modal({ title, children, handleClose, action, type = "custom", handleApproveAction, loading = false }: IModalProps) {
  const { t } = useTranslation();
  const generateTitle = () => {
    let node: React.ReactNode;
    let className = "flex gap-x-2 items-center uppercase text-xs font-semibold";
    switch (action) {
      case "delete":
        node = (
          <p className={className}>
            <DeleteOutlineOutlinedIcon /> {title}
          </p>
        );
        break;
      default:
        node = <p className={className}>{title}</p>;
        break;
    }
    return node;
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    handleClose();
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return createPortal(
    <>
      <div className="absolute top-0 w-full h-full backdrop-blur-sm flex items-center justify-center">
        <div className="flex flex-col min-w-[350px] max-w-lg gap-y-5 bg-white shadow-2xl p-4 rounded-md relative ring-1 mx-4 ring-neutral-50">
          <ClearOutlinedIcon className="absolute right-4 top-4 w-12 h-12 cursor-pointer hover:text-secondary" onClick={handleClose} />
          {generateTitle()}
          {!loading ? (
            <>
              {children}
              {type === "confirm" && (
                <Modal.Action>
                  <Button onClick={handleClose}>
                    <span className="uppercase">{t("LABEL__NO")}</span>
                  </Button>
                  <Button variant="fulfilled" onClick={handleApproveAction!}>
                    <span className="uppercase">{t("LABEL__YES")}</span>
                  </Button>
                </Modal.Action>
              )}
            </>
          ) : (
            <LoaderSvg />
          )}
        </div>
      </div>
    </>,
    document.body
  );
}

Modal.Content = ModalContent;
Modal.Action = ModalAction;

export default Modal;
