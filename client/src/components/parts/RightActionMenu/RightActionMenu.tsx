import { useEffect } from "react";
import { createPortal } from "react-dom";
import { Transition } from "@headlessui/react";

import { useAppSelector } from "../../../redux/hooks";
import { useDispatch } from "react-redux";

import { closeRightMenuAction } from "../../../redux/sliceRightActionMenu";

import AddDriverForm from "../../complex/AddDriverForm/AddDriverForm";
import EditDriverForm from "../../complex/EditDriverForm/EditDriverForm";
import AddCarForm from "../../complex/AddCarForm/AddCarForm";
import EditCarForm from "../../complex/EditCarForm/EditCarForm";
import AddRouteForm from "../../complex/AddRouteForm/AddRouteForm";

import ClearOutlinedIcon from "@mui/icons-material/ClearOutlined";

function RightActionMenu() {
  const { vissible, type, id } = useAppSelector((state) => state.rightMenuAction);
  const dispatch = useDispatch();

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key !== "Escape") return;
    dispatch(closeRightMenuAction());
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return createPortal(
    <>
      {vissible && (
        <div className="fixed top-0 z-50 flex h-screen w-full items-center justify-center backdrop-blur-sm" onClick={() => dispatch(closeRightMenuAction())}></div>
      )}
      <Transition
        appear={true}
        show={vissible}
        enter="transition-all duration-500"
        enterFrom="opacity-0 -right-full"
        enterTo="opacity-100 right-0"
        leave="transition-all duration-500"
        leaveFrom="opacity-100 right-0"
        leaveTo="opacity-0 -right-full"
        as="div"
        className="fixed top-0 z-50 flex h-screen min-w-[300px] flex-col border-l-2 border-primary bg-white shadow-2xl sm:min-w-[400px] overflow-y-scroll"
      >
        <div className="relative flex h-full w-full flex-col px-6 py-16">
          <ClearOutlinedIcon className="absolute right-4 top-4 h-12 w-12 cursor-pointer hover:text-secondary" onClick={() => dispatch(closeRightMenuAction())} />
          {type === "AddDriver" ? (
            <AddDriverForm />
          ) : type === "EditDriver" ? (
            <EditDriverForm id={id!} />
          ) : type === "AddCar" ? (
            <AddCarForm />
          ) : type === "EditCar" ? (
            <EditCarForm id={id!} />
          ) : type === "AddRoute" ? (
            <AddRouteForm />
          ) : (
            " "
          )}
        </div>
      </Transition>
    </>,
    document.body
  );
}

export default RightActionMenu;
