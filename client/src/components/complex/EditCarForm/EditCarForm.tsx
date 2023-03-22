import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import { useDispatch } from "react-redux";
import { setRefetch } from "../../../redux/sliceRefetch";
import { showSnackbar } from "../../../redux/sliceSnackbar";
import { closeRightMenuAction } from "../../../redux/sliceRightActionMenu";

import GET__carById from "../../../queries/car/GET__carById";
import GET__statusByName from "../../../queries/status/GET__statusByName";
import UPDATE__carStatus from "../../../queries/car/UPDATE__carStatus";
import UPDATE__carProfile from "../../../queries/car/UPDATE__carProfile";

import Title from "../../parts/Title/Title";
import EditCarSvg from "../../../assets/svg/EditCarSvg";
import Button from "../../parts/Button/Button";
import LoaderSvg from "../../../assets/svg/LoaderSvg";

interface IEditCarFormProps {
  id: string;
}

function EditCarForm({ id }: IEditCarFormProps) {
  const { loading, data, refetch } = useQuery(GET__carById, { variables: { id }, notifyOnNetworkStatusChange: true });
  const [getStatusByName, { loading: loadingGetStatusByName }] = useLazyQuery(GET__statusByName);
  const [updateCarStatus, { loading: loadingUpdateStatus }] = useMutation(UPDATE__carStatus);
  const [updateCarProfile, { loading: loadingUpdateProfile }] = useMutation(UPDATE__carProfile);

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

  const handleToggleStatus = async () => {
    try {
      const statusName = data?.car?.data?.attributes?.status?.data?.attributes?.statusName === "Available" ? "Inaccessible" : "Available";
      const responseStatusByName = await getStatusByName({ variables: { statusName } });
      await updateCarStatus({ variables: { id, status: responseStatusByName.data?.statuses?.data[0].id } });
      dispatch(showSnackbar({ type: "Success" }));
      dispatch(setRefetch({ refetch: "AllCars" }));
      await refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values: { registrationNumber: string; counterStatus: number; review: number }) => {
    try {
      const { registrationNumber, counterStatus, review } = values;
      await updateCarProfile({ variables: { id, registrationNumber, counterStatus, review } });
      dispatch(showSnackbar({ type: "Success" }));
      dispatch(setRefetch({ refetch: "AllCars" }));
      await refetch();
      dispatch(closeRightMenuAction());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Title>{t("LABEL__EDIT_CAR")}</Title>
      <div className="flex justify-center w-full">
        <EditCarSvg width="225px" height="225px" />
      </div>
      <div className="flex flex-col">
        {!loading && !loadingUpdateStatus && !loadingGetStatusByName && !loadingUpdateProfile && data ? (
          <Formik
            initialValues={{
              registrationNumber: data?.car?.data?.attributes?.registrationNumber!,
              counterStatus: data?.car?.data?.attributes?.counterStatus,
              review: data?.car?.data?.attributes?.review,
            }}
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
              <div className="flex flex-col gap-y-4 items-center justify-center">
                <Button type="submit" variant="fulfilled" color="secondary">
                  {t("LABEL__EDIT_CAR")}
                </Button>
                <Button onClick={handleToggleStatus}>
                  {data?.car?.data?.attributes?.status?.data?.attributes?.statusName === "Available" ? t("LABEL__SET_AS_INACCESSIBLE") : t("LABEL__SET_AS_AVAILABLE")}
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

export default EditCarForm;
