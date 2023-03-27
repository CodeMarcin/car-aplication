import { useDispatch } from "react-redux";

import { showRightActionMenu } from "../../../redux/sliceRightActionMenu";

import { useTranslation } from "react-i18next";

import Button from "../../parts/Button/Button";
import AddRouteSvg from "../../../assets/svg/AddRouteSvg";
import Card from "../../parts/Card/Card";

function AddRouteCard() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClickButton = () => {
    dispatch(showRightActionMenu({ type: "AddRoute" }));
  };

  return (
    <>
      <Card center>
        <AddRouteSvg width="125px" height="125px" />
        <Button onClick={handleClickButton} variant="fulfilled">
          {t("LABEL__ADD_ROUTE")}
        </Button>
      </Card>
    </>
  );
}

export default AddRouteCard;
