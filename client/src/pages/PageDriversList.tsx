import { useTranslation } from "react-i18next";

import Wrapper from "../components/parts/Wrapper/Wrapper";
import DriversList from "../components/complex/DriversList/DriversList";
import AddDriverCard from "../components/complex/AddDriverCard/AddDriverCard";
import Header from "../components/parts/Header/Header";

function PageDriversList() {
     const { t } = useTranslation();
  return (
    <>
      <Header text={t("LABEL__DRIVERS")} />
      <Wrapper>
        <DriversList />
        <AddDriverCard />
      </Wrapper>
    </>
  );
}

export default PageDriversList;
