import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { useMutation } from "@apollo/client";
import POST__createDriver from "../../../queries/driver/POST__createDriver";

import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../redux/sliceSnackbar";
import { closeRightMenuAction } from "../../../redux/sliceRightActionMenu";
import { setRefetch } from "../../../redux/sliceRefetch";

import Title from "../../parts/Title/Title";
import AddPeopleSvg from "../../../assets/svg/AddPeopleSvg";
import Button from "../../parts/Button/Button";
import LoaderSvg from "../../../assets/svg/LoaderSvg";

const initialValues = {
  name: "",
  surname: "",
};

function AddDriverForm() {
  const [createDriver, { loading, data }] = useMutation(POST__createDriver);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const formInputs = [
    { name: "name", label: t("LABEL__NAME") },
    { name: "surname", label: t("LABEL__SURNAME") },
  ];

  const validationSchema = Yup.object({
    name: Yup.string().required(`${t("LABEL__REQUIRED")}`).trim(),
    surname: Yup.string().required(`${t("LABEL__REQUIRED")}`).trim(),
  });

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const { name, surname } = values;
      const data = await createDriver({ variables: { name, surname, status: "1" } });
      if (data) {
        dispatch(setRefetch({ refetch: "AllDrivers" }));
        dispatch(showSnackbar({ type: "Success" }));
        dispatch(closeRightMenuAction());
      }
    } catch (err) {
      console.error(err, "err");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Title>{t("LABEL__ADD_DRIVER")}</Title>
      <div className="flex justify-center w-full">
        <AddPeopleSvg width="225px" height="225px" />
      </div>
      <div className="flex flex-col">
        {!loading ? (
          <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
            <Form className="flex flex-col gap-y-6">
              {formInputs.map((el) => (
                <div key={el.name} className="input-container">
                  <label className="input-container__label">
                    {el.label}:
                    <Field className="input-container__field" type="text" name={el.name} />
                  </label>
                  <ErrorMessage component="p" name={el.name} className="input-container__error-message" />
                </div>
              ))}
              <div className="flex justify-center">
                <Button type="submit" variant="fulfilled" color="secondary">
                  {t("LABEL__ADD_DRIVER")}
                </Button>
              </div>
            </Form>
          </Formik>
        ) :  (
          <LoaderSvg />
        )}
      </div>
    </div>
  );
}

export default AddDriverForm;
