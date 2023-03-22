import { useDispatch } from "react-redux";

import { showRightActionMenu } from "../../../redux/sliceRightActionMenu";

import { useTranslation } from "react-i18next";

import Button from "../../parts/Button/Button";
import AddCarSvg from "../../../assets/svg/AddCarSvg";
import Card from "../../parts/Card/Card";

function AddCarCard() {
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleClickButton = () => {
    dispatch(showRightActionMenu({ type: "AddCar" }));
  };

  return (
    <>
      <Card center>
        <AddCarSvg width="125px" height="125px" />
        <Button onClick={handleClickButton} variant="fulfilled">
          {t("LABEL__ADD_CAR")}
        </Button>
      </Card>
    </>
  );
}

export default AddCarCard;
