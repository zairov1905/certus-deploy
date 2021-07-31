import React, { useEffect, useState } from "react";
import $ from "jquery";

import ModalWrapper from "../../../app/modal/ModalWrapper";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { closeModal } from "../../../app/modal/modalReducer";
import { createDoc, updateDoc } from "./docActions";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";

export default function DocPageModal({ doc }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });
  const { documentTypes } = useSelector((state) => state.documentTypes);
  let documentTypesOptions = documentTypes.map((documentType) => {
    return {
      label: documentType.name,
      value: documentType.id,
    };
  });
  const docPurposeSettings = [
    { label: "Alış", value: 0 },
    { label: "Satış", value: 1 },
  ];
  const initialValues = doc ? doc: {
    document_type_id: "",
    document_for: "",
    date: "",
    about: "",

  };
  const validationSchema = Yup.object({
    // id:"",
    // id:"",
    document_type_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // docNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    document_for: Yup.string().required("Mütləq doldurulmalıdır."),
    date: Yup.string().required("Mütləq doldurulmalıdır."),
    about: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper size="modal-lg" header={doc ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            doc
              ? await dispatch(updateDoc(values))
              : await dispatch(
                  createDoc({ ...values})
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
            <div className="row">
              <div className="col-md-4">
                <MySearchableSelect
                  id="document_type_id"
                  name="document_type_id"
                  options={documentTypesOptions}
                  // type="text"
                  // className="form-control"
                  placeholder="Sənəd növü"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  id="document_for"
                  name="document_for"
                  options={docPurposeSettings}
                  // type="text"
                  // className="form-control"
                  placeholder="Sənədin təyinatı"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  id="date"
                  name="date"
                  className="form-control"
                  type="date"
                  // className="form-control"
                  placeholder="Sənəd tarixi"
                />
              </div>
              <div className="col-md-12">
                <MyTextArea
                  id="about"
                  name="about"
                  // type="text"
                  className="form-control"
                  placeholder="Sənəd predmeti"
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
