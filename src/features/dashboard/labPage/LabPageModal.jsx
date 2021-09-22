import React, { useEffect, useState } from "react";
import $ from "jquery";
import ModalWrapper from "../../../app/modal/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Form, Formik } from "formik";
import { closeModal } from "../../../app/modal/modalReducer";
import { createLab, updateLab } from "./labActions";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { loadOperation } from "../operationPage/operationActions";

export default function LabPageModal({ lab }) {
  const [loader, setLoader] = useState(true);

  useEffect(async () => {
    dispatch(loadOperation());

    setLoader(false);
  }, []);
  const { operations } = useSelector((state) => state.operations);
  let whereIsOperation =
    lab &&
    operations.filter(
      (operation) => operation.lab_id && operation.lab_id.id === lab.id
    );
  console.log(whereIsOperation);

  const dispatch = useDispatch();
  const { docs } = useSelector((state) => state.docs);
  let docsOptions =
    docs &&
    docs.map((doc) => {
      return {
        label: doc.document_number,
        value: doc.id,
      };
    });
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = lab
    ? {
        name: lab.name && lab.name,
        document_id: lab.document_id && lab.document_id.id,
        certificate_number: lab.certificate_number && lab.certificate_number,
        turnover: lab.turnover && lab.turnover,
        operations: lab.operations && lab.operations,
        note: lab.note && lab.note,
      }
    : {
        name: "",
        document_id: "",
        certificate_number: "",
        turnover: "",
        operations: "",
        note: "",
      };
  const validationSchema = Yup.object({
    // id:"",
    name: Yup.string().required("Mütləq doldurulmalıdır."),
    // document_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // certificate_number: Yup.string().required("Mütləq doldurulmalıdır."),
    // turnover: Yup.string().required("Mütləq doldurulmalıdır."),
    // operations: Yup.string().required("Mütləq doldurulmalıdır."),
    // note: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper
      size="modal-lg"
      header={lab ? "Redakte Et" : "Əlavə et"}
      data={lab && `Laboratoriya - LB${lab.id}`}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            lab
              ? await dispatch(updateLab({ ...values, id: lab.id }))
              : await dispatch(
                  createLab({
                    ...values,
                  })
                );
            setSubmitting(false);
            setModal(true);
            dispatch(closeModal());
          } catch (error) {
            setErrors({ auth: error.message });
            // console.log(error);
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting, isValid, dirty, errors }) => (
          <Form id="emp">
            <div className={`row ${lab && "mb-4"}`}>
              <div className="col-md-4">
                <MyTextInput
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Laboratoriya adı*"
                  label={lab && "Laboratoriya adı*"}
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  id="document_id"
                  name="document_id"
                  // type="text"
                  defaultValue={
                    lab && {
                      label: lab.document_id ? lab.document_id.document_number: 'Təyin edilməyib',
                      value: lab.document_id && lab.document_id.id,
                    }
                  }
                  options={docsOptions}
                  // className="form-control"
                  placeholder="Müqavilə Nömrəsi"
                  label={lab && "Müqavilə Nömrəsi"}
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  id="certificate_number"
                  name="certificate_number"
                  type="text"
                  className="form-control"
                  placeholder="Atestat Nömrəsi"
                  label={lab && "Atestat Nömrəsi"}
                />
              </div>
            </div>
            <div className={`row ${lab && "mb-4"}`}>
              <div className="col-md-12">
                <MyTextInput
                  id="turnover"
                  name="turnover"
                  type="text"
                  className="form-control"
                  placeholder="Dövriyyə"
                  label={lab && "Dövriyyə"}
                />
              </div>
            </div>
            {lab && (
              <div className={`row ${lab && "mb-4"}`}>
                <div className="col-md-12">
                  <MyTextArea
                    id="operations"
                    name="operations"
                    type="text"
                    readOnly
                    defaultValue={
                      whereIsOperation &&
                      whereIsOperation.map(
                        (operation) => ` Əməliyyat: ${operation.number}`
                      )
                    }
                    className="form-control"
                    placeholder="Əməliyyatlar"
                    label={lab && "Əməliyyatlar"}
                  />
                </div>
              </div>
            )}

            <div className="row">
              <div className="col-md-12">
                <MyTextArea
                  id="note"
                  name="note"
                  type="text"
                  className="form-control"
                  placeholder="Qeyd"
                  label={lab && "Qeyd"}
                />
              </div>
            </div>
            <button
              disabled={!isValid || !dirty || isSubmitting}
              type="submit"
              // name="time"
              className="btn btn-primary float-right  btn-lg mt-3 "
            >
              {isSubmitting && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={24}
                  height={24}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-loader spin mr-2"
                >
                  <line x1={12} y1={2} x2={12} y2={6} />
                  <line x1={12} y1={18} x2={12} y2={22} />
                  <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
                  <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
                  <line x1={2} y1={12} x2={6} y2={12} />
                  <line x1={18} y1={12} x2={22} y2={12} />
                  <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
                  <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
                </svg>
              )}
              Yadda saxla
            </button>
            <button
              id="closeModal"
              onClick={() => {
                dispatch(closeModal());
              }}
              className="btn btn-lg float-right mt-3 mr-2"
              data-dismiss="modal"
            >
              <i className="flaticon-cancel-12" /> Ləğv et
            </button>
          </Form>
        )}
      </Formik>
    </ModalWrapper>
  );
}
