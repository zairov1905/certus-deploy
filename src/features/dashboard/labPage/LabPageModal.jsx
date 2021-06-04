import React, { useEffect, useState } from "react";
import $ from "jquery";

import ModalWrapper from "../../../app/modal/ModalWrapper";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { closeModal } from "../../../app/modal/modalReducer";
import { createLab, updateLab } from "./labActions";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";

export default function LabPageModal({ lab }) {
  //   const { employees } = useSelector((state) => state.employees);
  //   let employeeOptions = [];

  //   employeeOptions = employees.map((employee) => {
  //     return {
  //       value: `${employee.firstname} ${employee.lastname}`,
  //       label: `${employee.firstname} ${employee.lastname}`,
  //     };
  //   });
  //   let orderSituation = [
  //     {value:"İcra edilir",label:"İcra edilir"},
  //     {value:"Gözləmədə",label:"Gözləmədə"},

  //   ]
  const dispatch = useDispatch();
  const { docs } = useSelector((state) => state.docs);
  let docsOptions =
    docs &&
    docs.map((doc) => {
      return {
        label: doc.docType,
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
    ? lab
    : {
        id: "",
        labName: "",
        labNote: "",
        contractNumber: "",
        labPeriod: "",
        labOperation: "",
      };
  const validationSchema = Yup.object({
    // id:"",
    labName: Yup.string().required("Mütləq doldurulmalıdır."),
    labNote: Yup.string().required("Mütləq doldurulmalıdır."),
    contractNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    labPeriod: Yup.string().required("Mütləq doldurulmalıdır."),
    labOperation: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper size="modal-lg" header={lab ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            lab
              ? await dispatch(updateLab(values))
              : await dispatch(
                  createLab({
                    ...values,
                    id: cuid(),
                    labNumber: `Lab${cuid()}`,
                  })
                );
            setSubmitting(false);
            lab
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
            <div className="row">
              <div className="col-md-4">
                <MyTextInput
                  id="labName"
                  name="labName"
                  type="text"
                  className="form-control"
                  placeholder="Laboratoriya adı"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  id="contractNumber"
                  name="contractNumber"
                  // type="text"
                  options={docsOptions}
                  // className="form-control"
                  placeholder="Müqavilə Nömrəsi"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  id="certificateNumber"
                  name="certificateNumber"
                  type="text"
                  className="form-control"
                  placeholder="Atestat Nömrəsi"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MyTextInput
                  id="labPeriod"
                  name="labPeriod"
                  type="text"
                  className="form-control"
                  placeholder="Dövriyyə"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  id="labOperation"
                  name="labOperation"
                  type="text"
                  className="form-control"
                  placeholder="Əməliyyatlar"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  id="labNote"
                  name="labNote"
                  type="text"
                  className="form-control"
                  placeholder="Qeyd"
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
