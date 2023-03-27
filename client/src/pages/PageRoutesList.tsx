import { useTranslation } from "react-i18next";

import Wrapper from "../components/parts/Wrapper/Wrapper";
import RoutesList from "../components/complex/RoutesList/RoutesList";
import Header from "../components/parts/Header/Header";
import AddRouteCard from "../components/complex/AddRouteCard/AddRouteCard";

function PageRoutesList() {
  const { t } = useTranslation();
  return (
    <>
      <Header text={t("LABEL__ROUTES")} />
      <Wrapper>
        <RoutesList />
        <AddRouteCard />
      </Wrapper>
    </>
  );
}

export default PageRoutesList;
