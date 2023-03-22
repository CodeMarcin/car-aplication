import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/client";
import POST__createCar from "../../../queries/car/POST__createCar";

import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../redux/sliceSnackbar";
import { closeRightMenuAction } from "../../../redux/sliceRightActionMenu";
import { setRefetch } from "../../../redux/sliceRefetch";

import Title from "../../parts/Title/Title";
import AddCarSvg from "../../../assets/svg/AddCarSvg";
import Button from "../../parts/Button/Button";
import LoaderSvg from "../../../assets/svg/LoaderSvg";

const initialValues = {
  registrationNumber: "",
  counterStatus: "",
  review: "",
};

function AddCarForm() {
  const [createCar, { loading }] = useMutation(POST__createCar);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const formInputs = [
    { name: "registrationNumber", label: t("LABEL__REGISTRATION_NUMBER"), type: "text" },
    { name: "counterStatus", label: t("LABEL__COUNTER_STATUS"), type: "number" },
    { name: "review", label: t("LABEL__REVIEW"), type: "number" },
  ];

  const validationSchema = Yup.object({
    registrationNumber: Yup.string()
      .required(`${t("LABEL__REQUIRED")}`)
      .trim(),
    counterStatus: Yup.number().required(`${t("LABEL__REQUIRED")}`),
    review: Yup.number().required(`${t("LABEL__REQUIRED")}`),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const { registrationNumber, counterStatus, review } = values;
      const data = await createCar({ variables: { registrationNumber, counterStatus, review, status: "1" } });
      if (data) {
        dispatch(setRefetch({ refetch: "AllCars" }));
        dispatch(showSnackbar({ type: "Success" }));
        dispatch(closeRightMenuAction());
      }
    } catch (err) {
      console.error(err, "err");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Title>{t("LABEL__ADD_CAR")}</Title>
      <div className="flex justify-center w-full">
        <AddCarSvg width="225px" height="225px" />
      </div>
      <div className="flex flex-col">
        {!loading ? (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-y-6">
              {formInputs.map((el) => (
                <div key={el.name} className="input-container">
                  <label className="input-container__label">
                    {el.label}:
                    <Field className="input-container__field" type={el.type} name={el.name} />
                  </label>
                  <ErrorMessage component="p" name={el.name} className="input-container__error-message" />
                </div>
              ))}
              <div className="flex justify-center">
                <Button type="submit" variant="fulfilled" color="secondary">
                  {t("LABEL__ADD_CAR")}
                </Button>
              </div>
            </Form>
          </Formik>
        ) : (
          <LoaderSvg />
        )}
      </div>
    </div>
  );
}

export default AddCarForm;
