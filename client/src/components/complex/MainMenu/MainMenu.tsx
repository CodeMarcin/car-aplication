import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import clsx from "clsx";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import AirportShuttleOutlinedIcon from "@mui/icons-material/AirportShuttleOutlined";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";

function MainMenu() {
  const { t } = useTranslation();

  const ITEMS = [
    {
      label: t("LABEL__HOME"),
      path: "/",
      icon: <HomeOutlinedIcon />,
    },
    {
      label: t("LABEL__DRIVERS"),
      path: "drivers",
      icon: <FaceOutlinedIcon />,
    },
    {
      label: t("LABEL__CARS"),
      path: "cars",
      icon: <AirportShuttleOutlinedIcon />,
    },
    {
      label: t("LABEL__ROUTES"),
      path: "routes",
      icon: <RoomOutlinedIcon />,
    },
  ];

  return (
    <>
      <ul className="fixed top-0 z-10 hidden w-full justify-center gap-x-16 bg-white py-6 text-sm font-semibold uppercase sm:flex">
        {ITEMS.map((el) => (
          <li key={el.label}>
            <NavLink
              // className={`flex items-center gap-x-2 border-b-2 border-white py-2 transition-colors duration-500 hover:border-secondary hover:text-secondary`}
              className={({ isActive }) =>
                clsx(
                  "flex items-center gap-x-2 border-b-2 py-2 transition-colors duration-500 hover:border-secondary hover:text-secondary",
                  isActive ? "border-secondary text-secondary" : "border-white"
                )
              }
              to={el.path}
            >
              {el.icon} {el.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <ul className="fixed bottom-0 z-10 flex w-full justify-evenly border-b-2 border-t-2 border-primaryDark bg-white  py-4 text-xs font-semibold uppercase sm:hidden">
        {ITEMS.map((el) => (
          <li key={el.label}>
            <NavLink className={({ isActive }) => clsx("flex flex-col items-center border-b-2 py-2", isActive ? "text-secondary border-secondary" : "border-white")} to={el.path}>
              {el.icon}
              <span>{el.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MainMenu;
