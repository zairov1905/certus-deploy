import React, { useEffect, useState } from "react";
import $ from "jquery";
import ModalWrapper from "../../../../app/modal/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import MySearchableSelect from "../../../../app/common/form/MySearchableSelect";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { closeModal } from "../../../../app/modal/modalReducer";
import { createPersonal, updatePersonal } from "./personalActions";
import { loadSignOfLegalAct } from "../../settings/signOfLegalAct/signOfLegalActActions";
import { loadLab } from "../../labPage/labActions";

export default function PersonalPageModal({ personal }) {
  useEffect(() => {
    dispatch(loadSignOfLegalAct());
    dispatch(loadLab());
  }, []);
  const snCodeOptions = [
    { value: "1", label: "01" },
    { value: "2", label: "02" },
    { value: "3", label: "03" },
  ];

  const dispatch = useDispatch();
  // ++++++++++++++
  const { trainings } = useSelector((state) => state.trainings);
  const trainingOptions =
  trainings &&
  trainings.map((training) => {
      return {
        label: training.trainingName,
        value: training.id,
      };
    });
  // ++++++++++++++

  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = personal
    ? personal
    : {
        id: cuid(),
        snCode: "",
        registrationNumber: "",
        blankNumber: "",
        accreditationNumber: "",
        certificateIssueDate: "",
        certificateExpirationDate: "",
        participantName: "",
        instructorName: "",
        training: "",
        skill: [],
        productCode: "",
        signOfDocument: "",
        note: "",
      };
  const validationSchema = Yup.object({
    // id:"",
    snCode: Yup.string().required("Mütləq doldurulmalıdır."),
    registrationNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    blankNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    accreditationNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    certificateIssueDate: Yup.string().required("Mütləq doldurulmalıdır."),
    certificateExpirationDate: Yup.string().required("Mütləq doldurulmalıdır."),
    participantName: Yup.string().required("Mütləq doldurulmalıdır."),
    instructorName: Yup.string().required("Mütləq doldurulmalıdır."),
    training: Yup.string().required("Mütləq doldurulmalıdır."),
    productCode: Yup.string().required("Mütləq doldurulmalıdır."),
    signOfDocument: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper size="modal-lg" header={personal ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            personal
              ? await dispatch(updatePersonal(values))
              : await dispatch(
                  createPersonal({
                    ...values,
                    id: cuid(),
                    labNumber: `Lab${cuid()}`,
                  })
                );
            setSubmitting(false);
            personal
              ? toast.success("Dəyişiklik uğurlar yerinə yetirildi")
              : toast.success("Uğurla əlavə edildi");
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
            <div className="row mb-4">
              <div className="col-md-12 mb-4">
                <MySearchableSelect
                  id="snCode"
                  name="snCode"
                  type="text"
                  options={snCodeOptions}
                  placeholder="SN kodu daxil edin"
                  label="SN kodu"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  className="form-control"
                  placeholder="Reyestr nömrəsi daxil edin"
                  label="Reyestr nömrəsi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="blankNumber"
                  name="blankNumber"
                  type="text"
                  className="form-control"
                  placeholder="Blank nömrəsi daxil edin"
                  label="Blank nömrəsi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="accreditationNumber"
                  name="accreditationNumber"
                  type="text"
                  className="form-control"
                  placeholder="Akkreditasiya sahəsində sıra nömrəsi daxil edin"
                  label="Akkreditasiya sahəsində sıra nömrəsi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="certificateIssueDate"
                  name="certificateIssueDate"
                  type="date"
                  className="form-control"
                  placeholder="Sertifikatın verilmə tarixi daxil edin"
                  label="Sertifikatın verilmə tarixi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="certificateExpirationDate"
                  name="certificateExpirationDate"
                  type="date"
                  className="form-control"
                  placeholder="Sertifikatın qüvvədən düşdüyü tarix daxil edin"
                  label="Sertifikatın qüvvədən düşdüyü tarix"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="participantName"
                  name="participantName"
                  type="text"
                  className="form-control"
                  placeholder="İştirakçı adını daxil edin"
                  label="İştirakçı adı"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="instructorName"
                  name="instructorName"
                  type="text"
                  className="form-control"
                  placeholder="Təlimçinin adını daxil edin"
                  label="Təlimçinin adı"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MySearchableSelect
                  id="training"
                  name="training"
                  options={trainingOptions}
                  type="text"
                  // className="form-control"
                  placeholder="Təlimin adın daxil edin"
                  label="Təlimin adı"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="skill"
                  name="skill"
                  type="text"
                  readOnly
                  className="form-control"
                  placeholder="Səriştələr"
                  label="Səriştələr"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="productCode"
                  name="productCode"
                  type="text"
                  className="form-control"
                  placeholder="Məhsulun kodunu daxil edin"
                  label="Məhsulun kodu"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="signOfDocument"
                  name="signOfDocument"
                  type="text"
                  className="form-control"
                  placeholder="Normativ sənədin işarəsini daxil edin"
                  label="Normativ sənədin işarəsi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="note"
                  name="note"
                  type="text"
                  className="form-control"
                  placeholder="Qeyd daxil edin"
                  label="Qeyd"
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
