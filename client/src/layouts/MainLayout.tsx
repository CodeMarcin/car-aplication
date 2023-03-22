import { Outlet } from "react-router-dom";

import { useAppSelector } from "../redux/hooks";

import Snackbar from "../components/parts/Snackbar/Snackbar";
import RightActionMenu from "../components/parts/RightActionMenu/RightActionMenu";

function MainLayout() {
  const { vissible: snackbarVissible } = useAppSelector((state) => state.snackbar);
  return (
    <>
      <Outlet />
      <Snackbar />
      <RightActionMenu />
    </>
  );
}

export default MainLayout;
