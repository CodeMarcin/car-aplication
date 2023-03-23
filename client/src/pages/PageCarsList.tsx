import { useTranslation } from "react-i18next";

import Wrapper from "../components/parts/Wrapper/Wrapper";
import CarsList from "../components/complex/CarsList/CarsList";
import AddCarCard from "../components/complex/AddCarCard/AddCarCard";
import Header from "../components/parts/Header/Header";

function PageCarsList() {
  const { t } = useTranslation();
  return (
    <>
      <Header text={t("LABEL__CARS")} />
      <Wrapper>
        <CarsList />
        <AddCarCard />
      </Wrapper>
    </>
  );
}

export default PageCarsList;
