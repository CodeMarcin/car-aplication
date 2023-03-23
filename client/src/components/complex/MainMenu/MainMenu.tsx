import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

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
            <Link className="flex items-center gap-x-2 transition-colors duration-500 hover:text-secondary" to={el.path}>
              {el.icon} {el.label}
            </Link>
          </li>
        ))}
      </ul>
      <ul className="fixed bottom-0 z-10 flex w-full justify-evenly border-t-2 border-primaryDark  bg-white py-6 text-xs font-semibold uppercase sm:hidden">
        {ITEMS.map((el) => (
          <li key={el.label}>
            <Link className="flex flex-col items-center" to={el.path}>
              {el.icon}
              <span>{el.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default MainMenu;
