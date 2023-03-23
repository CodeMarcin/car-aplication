import { createPortal } from "react-dom";
import { useAppSelector } from "../../../redux/hooks";
import { Transition } from "@headlessui/react";

import { closeSnackbar } from "../../../redux/sliceSnackbar";
import { useDispatch } from "react-redux";

import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";

function Snackbar() {
  const { vissible, type, text, timeToClose } = useAppSelector((state) => state.snackbar);
  const dispatch = useDispatch();

  const setTimer = () => {
    const timer = setTimeout(() => {
      dispatch(closeSnackbar());
      clearTimeout(timer);
    }, timeToClose);
  };

  const generateClassName = () => {
    let className = "fixed left-5 flex shadow-2xl z-50 rounded-md w-fit p-2 text-sm items-center gap-x-2 font-medium text-white whitespace-nowrap ";
    switch (type) {
      case "Success":
        className += "bg-success";
        break;
      case "Error":
        className += "bg-error";
        break;
      case "Information":
        className += "bg-info";
        break;
    }
    return className;
  };
  const icon = type === "Success" ? <CheckCircleOutlineOutlinedIcon /> : type === "Error" ? <ErrorOutlineOutlinedIcon /> : <LightbulbOutlinedIcon />;

  return createPortal(
    <Transition
      afterEnter={setTimer}
      appear={true}
      show={vissible!}
      enter="transition-all duration-500"
      enterFrom="opacity-0 bottom-0"
      enterTo="opacity-100 bottom-5"
      leave="transition-all duration-500"
      leaveFrom="opacity-100 bottom-5"
      leaveTo="opacity-0 bottom-0"
      as="div"
      className={generateClassName}
    >
      {icon} {text}
    </Transition>,
    document.body
  );
}

export default Snackbar;
