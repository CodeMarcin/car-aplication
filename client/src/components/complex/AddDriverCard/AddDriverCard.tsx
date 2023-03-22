import { useDispatch } from "react-redux";

import { showRightActionMenu } from "../../../redux/sliceRightActionMenu";

import { useTranslation } from "react-i18next";

import Button from "../../parts/Button/Button";
import AddPeopleSvg from "../../../assets/svg/AddPeopleSvg";
import Card from "../../parts/Card/Card";

function AddDriverCard() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClickButton = () => {
    dispatch(showRightActionMenu({ type: "AddDriver" }));
  };

  return (
    <>
      <Card center>
        <AddPeopleSvg width="125px" height="125px" />
        <Button onClick={handleClickButton} variant="fulfilled">
          {t("LABEL__ADD_DRIVER")}
        </Button>
      </Card>
    </>
  );
}

export default AddDriverCard;
