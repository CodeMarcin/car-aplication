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
        <div className="absolute top-0 w-full h-full backdrop-blur-sm flex items-center justify-center" onClick={() => dispatch(closeRightMenuAction())}></div>
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
        className="absolute ring-r-1 min-w-[300px] sm:min-w-[400px] ring-2 ring-primary z-20 top-0 flex flex-col bg-white h-full shadow-2xl"
      >
        <div className="w-full h-full relative px-6 py-16 flex flex-col">
          <ClearOutlinedIcon className="absolute right-4 top-4 w-12 h-12 cursor-pointer hover:text-secondary" onClick={() => dispatch(closeRightMenuAction())} />
          {type === "AddDriver" ? (
            <AddDriverForm />
          ) : type === "EditDriver" ? (
            <EditDriverForm id={id!} />
          ) : type === "AddCar" ? (
            <AddCarForm />
          ) : type === "EditCar" ? (
            <EditCarForm id={id!} />
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
