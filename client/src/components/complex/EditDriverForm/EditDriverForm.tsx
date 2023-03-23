import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";

import { useDispatch } from "react-redux";
import { setRefetch } from "../../../redux/sliceRefetch";
import { showSnackbar } from "../../../redux/sliceSnackbar";
import { closeRightMenuAction } from "../../../redux/sliceRightActionMenu";

import GET__driverById from "../../../queries/driver/GET__driverById";
import GET__statusByName from "../../../queries/status/GET__statusByName";
import UPDATE__driverStatus from "../../../queries/driver/UPDATE__driverStatus";
import UPDATE__driverProfile from "../../../queries/driver/UPDATE__driverProfile";

import Title from "../../parts/Title/Title";
import EditPeopleSvg from "../../../assets/svg/EditPopleSvg";
import Button from "../../parts/Button/Button";
import LoaderSvg from "../../../assets/svg/LoaderSvg";

interface IEditDriverFormProps {
  id: string;
}

function EditDriverForm({ id }: IEditDriverFormProps) {
  const { loading, data, refetch } = useQuery(GET__driverById, { variables: { id }, notifyOnNetworkStatusChange: true });
  const [getStatusByName, { loading: loadingGetStatusByName }] = useLazyQuery(GET__statusByName);
  const [updateDriverStatus, { loading: loadingUpdateStatus }] = useMutation(UPDATE__driverStatus);
  const [updateDriverProfile, { loading: loadingUpdateProfile }] = useMutation(UPDATE__driverProfile);

  const dispatch = useDispatch();

  const { t } = useTranslation();

  const formInputs = [
    { name: "name", label: t("LABEL__NAME") },
    { name: "surname", label: t("LABEL__SURNAME") },
  ];

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(`${t("LABEL__REQUIRED")}`)
      .trim(),
    surname: Yup.string()
      .required(`${t("LABEL__REQUIRED")}`)
      .trim(),
  });

  const handleToggleStatus = async () => {
    try {
      const statusName = data?.driver?.data?.attributes?.status?.data?.attributes?.statusName === "Available" ? "Inaccessible" : "Available";
      const responseStatusByName = await getStatusByName({ variables: { statusName } });
      await updateDriverStatus({ variables: { id, status: responseStatusByName.data?.statuses?.data[0].id } });
      dispatch(showSnackbar({ type: "Success" }));
      dispatch(setRefetch({ refetch: "AllDrivers" }));
      await refetch();
      dispatch(closeRightMenuAction());
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (values: { name: string; surname: string }) => {
    try {
      const { name, surname } = values;
      await updateDriverProfile({ variables: { id, name, surname } });
      dispatch(showSnackbar({ type: "Success" }));
      dispatch(setRefetch({ refetch: "AllDrivers" }));
      await refetch();
      dispatch(closeRightMenuAction());
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Title>{t("LABEL__EDIT_DRIVER")}</Title>
      <div className="flex w-full justify-center">
        <EditPeopleSvg width="225px" height="225px" />
      </div>
      <div className="flex flex-col">
        {!loading && !loadingUpdateStatus && !loadingGetStatusByName && !loadingUpdateProfile ? (
          <Formik
            initialValues={{ name: data?.driver?.data?.attributes?.name!, surname: data?.driver?.data?.attributes?.surname! }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize
          >
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
              <div className="flex flex-col items-center justify-center gap-y-4">
                <Button type="submit" variant="fulfilled" color="secondary">
                  {t("LABEL__EDIT_DRIVER")}
                </Button>
                <Button onClick={handleToggleStatus}>
                  {data?.driver?.data?.attributes?.status?.data?.attributes?.statusName === "Available" ? t("LABEL__SET_AS_INACCESSIBLE") : t("LABEL__SET_AS_AVAILABLE")}
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

export default EditDriverForm;
