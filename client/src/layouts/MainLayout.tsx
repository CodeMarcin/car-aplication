import { Outlet } from "react-router-dom";

import Snackbar from "../components/parts/Snackbar/Snackbar";
import RightActionMenu from "../components/parts/RightActionMenu/RightActionMenu";
import MainMenu from "../components/complex/MainMenu/MainMenu";

function MainLayout() {
  return (
    <>
      <MainMenu />
      <Outlet />
      <Snackbar />
      <RightActionMenu />
    </>
  );
}

export default MainLayout;
