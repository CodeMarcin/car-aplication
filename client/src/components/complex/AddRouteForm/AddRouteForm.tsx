import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";

import { useQuery, useMutation } from "@apollo/client";
import GET__allDriversAndCarsByStatusName from "../../../queries/combine/GET__allDriversAndCarsByStatusName";
import GET__allDriversPagination from "../../../queries/driver/GET__allDriversPagination";
import GET__allCarsPagination from "../../../queries/car/GET__allCarsPagination";
import POST__createRoute from "../../../queries/route/POST__createRoute";

import { useDispatch } from "react-redux";
import { showSnackbar } from "../../../redux/sliceSnackbar";
import { closeRightMenuAction } from "../../../redux/sliceRightActionMenu";
import { setRefetch } from "../../../redux/sliceRefetch";

import Title from "../../parts/Title/Title";
import AddRouteSvg from "../../../assets/svg/AddRouteSvg";
import Button from "../../parts/Button/Button";
import LoaderSvg from "../../../assets/svg/LoaderSvg";


const initialValues = {
  destination: "",
  distance: "",
  startDate: new Date().toISOString().split("T")[0],
  endDate: new Date().toISOString().split("T")[0],
};

function AddRouteForm() {
  const [createRoute, { loading }] = useMutation(POST__createRoute, { refetchQueries: [{ query: GET__allDriversPagination }, { query: GET__allCarsPagination }] });
  const { loading: loadingAllDriversAndCars, data: dataAllDriversAndCars } = useQuery(GET__allDriversAndCarsByStatusName, {
    variables: { statusName: "Available" },
    fetchPolicy: "no-cache",
  });
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const formInputs = [
    { name: "destination", label: t("LABEL__DESTINATION"), type: "text" },
    { name: "distance", label: t("LABEL__DISTANCE"), type: "number" },
    { name: "startDate", label: t("LABEL__START_DATE"), type: "date" },
    { name: "endDate", label: t("LABEL__END_DATE"), type: "date" },
  ];

  const validationSchema = Yup.object({
    destination: Yup.string()
      .required(`${t("LABEL__REQUIRED")}`)
      .trim(),
    distance: Yup.number().required(`${t("LABEL__REQUIRED")}`),
    startDate: Yup.date().required(`${t("LABEL__REQUIRED")}`),
    endDate: Yup.date().required(`${t("LABEL__REQUIRED")}`),
    driverId: Yup.string().required(`${t("LABEL__REQUIRED")}`),
    carId: Yup.string().required(`${t("LABEL__REQUIRED")}`),
  });

  const handleSubmit = async (values: typeof initialValues & { driverId: string; carId: string }) => {
    try {
      const { destination, distance, startDate, endDate, driverId, carId } = values;
      const data = await createRoute({ variables: { destination, distance: Number(distance), startDate, endDate, driverId, carId } });
      if (data) {
        dispatch(setRefetch({ refetch: "AllRoutes" }));
        dispatch(showSnackbar({ type: "Success" }));
        dispatch(closeRightMenuAction());
      }
    } catch (err) {
      console.error(err, "err");
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Title>{t("LABEL__ADD_ROUTE")}</Title>
      <div className="flex w-full justify-center">
        <AddRouteSvg width="225px" height="225px" />
      </div>
      <div className="flex flex-col">
        {!loading && !loadingAllDriversAndCars ? (
          <Formik
            initialValues={{ ...initialValues, driverId: dataAllDriversAndCars?.drivers?.data[0]?.id ?? "", carId: dataAllDriversAndCars?.cars?.data[0]?.id ?? "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
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
              <div className="input-container">
                <label className="input-container__label">
                  {t("LABEL__DRIVER")}
                  <Field as="select" name="driverId">
                    {dataAllDriversAndCars?.drivers?.data.map((el) => (
                      <option key={el.id} value={el.id!}>
                        {el.attributes?.name} {el.attributes?.surname}
                      </option>
                    ))}
                  </Field>
                </label>
                <ErrorMessage component="p" name="driverId" className="input-container__error-message" />
              </div>
              <div className="input-container">
                <label className="input-container__label">
                  {t("LABEL__CAR")}
                  <Field as="select" name="carId">
                    {dataAllDriversAndCars?.cars?.data.map((el) => (
                      <option key={el.id} value={el.id!}>
                        {el.attributes?.registrationNumber}
                      </option>
                    ))}
                  </Field>
                </label>
                <ErrorMessage component="p" name="carId" className="input-container__error-message" />
              </div>
              <div className="flex justify-center">
                <Button type="submit" variant="fulfilled" color="secondary">
                  {t("LABEL__ADD_DRIVER")}
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

export default AddRouteForm;
