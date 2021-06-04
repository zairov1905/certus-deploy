import React, { useEffect, useState } from "react";
import $ from "jquery";

import ModalWrapper from "../../../app/modal/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { createEmployees, updateEmployees } from "./employeesActions";
import { closeModal } from "../../../app/modal/modalReducer";

export default function EmployeesModal({ employee }) {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });
  const {duties} = useSelector(state => state.duties)
  const {departments} = useSelector(state => state.departments)
  let dutyOptions = duties && duties.map(duty => {
    return {
      label: duty.duty,
      value: duty.duty,
    }
  })
  let departmentOptions = departments && departments.map(department => {
    return {
      label: department.department,
      value: department.department,
    }
  })
  const contractTypeOptions = [
    { label: "Əmək müqaviləsi", value: 0 },
    { label: "Xidmət müqaviləsi", value: 1 },
  ];
  const initialValues = employee ? employee: {
    id: null,
    pin:"",
    firstname: "",
    lastname: "",
    middlename: "",
    birthday: "",
    place: "",
    phone: "",

    whatsapp: "",
    telegram: "",
    facebook: "",
    linkedin: "",
    twitter: "",
    instagram: "",
    mail: "",

    duty: "",
    department: "",
    startWork: "",
    circulation: "",
    bonus: "",
    customerSatisfaction: "",
    performance: "",
    contractType:""
  };

  const validationSchema = Yup.object({
    pin:Yup.string().required("Mütləq doldurulmalıdır."),
    firstname: Yup.string().required("Mütləq doldurulmalıdır."),
    lastname: Yup.string().required("Mütləq doldurulmalıdır."),
    middlename: Yup.string().required("Mütləq doldurulmalıdır."),
    birthday: Yup.string().required("Mütləq doldurulmalıdır."),
    place: Yup.string().required("Mütləq doldurulmalıdır."),
    phone: Yup.string().required("Mütləq doldurulmalıdır."),

    whatsapp: Yup.string().required("Mütləq doldurulmalıdır."),
    telegram: Yup.string().required("Mütləq doldurulmalıdır."),
    facebook: Yup.string().required("Mütləq doldurulmalıdır."),
    linkedin: Yup.string().required("Mütləq doldurulmalıdır."),
    twitter: Yup.string().required("Mütləq doldurulmalıdır."),
    instagram: Yup.string().required("Mütləq doldurulmalıdır."),
    mail: Yup.string().required("Mütləq doldurulmalıdır."),

    duty: Yup.string().required("Mütləq doldurulmalıdır."),
    department: Yup.string().required("Mütləq doldurulmalıdır."),
    startWork: Yup.string().required("Mütləq doldurulmalıdır."),
    circulation: Yup.string().required("Mütləq doldurulmalıdır."),
    bonus: Yup.string().required("Mütləq doldurulmalıdır."),
    customerSatisfaction: Yup.string().required("Mütləq doldurulmalıdır."),
    performance: Yup.string().required("Mütləq doldurulmalıdır."),
  });
  return (
    <ModalWrapper size="modal-lg" header={employee ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            employee
              ? await dispatch(updateEmployees(values))
              : await dispatch(createEmployees({ ...values, id: cuid() }));
            setSubmitting(false);
            employee
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
                  id="pin"
                  name="pin"
                  type="text"
                  className="form-control"
                  placeholder="FİN"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  id="firstname"
                  name="firstname"
                  type="text"
                  className="form-control"
                  placeholder="Ad"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  id="lastname"
                  name="lastname"
                  type="text"
                  className="form-control"
                  placeholder="Soyad"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MyTextInput
                  id="middlename"
                  name="middlename"
                  type="text"
                  className="form-control"
                  placeholder="Ata adı"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="birthday"
                  id="birthday"
                  type="date"
                  className="form-control"
                  placeholder="Doğum tarixi"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="place"
                  id="place"
                  type="text"
                  className="form-control"
                  placeholder="Ünvan"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MyTextInput
                  name="phone"
                  id="phone"
                  type="text"
                  className="form-control"
                  placeholder="Telefon"
                />
              </div>

              <div className="col-md-4">
                <MyTextInput
                  name="whatsapp"
                  id="whatsapp"
                  type="text"
                  className="form-control"
                  placeholder="Whatsapp"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="telegram"
                  id="telegram"
                  type="text"
                  className="form-control"
                  placeholder="Telegram"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="facebook"
                  id="facebook"
                  type="text"
                  className="form-control"
                  placeholder="Facebook"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="linkedin"
                  id="linkedin"
                  type="text"
                  className="form-control"
                  placeholder="Linkedin"
                />
              </div>{" "}
              <div className="col-md-4">
                <MyTextInput
                  name="twitter"
                  id="twitter"
                  type="text"
                  className="form-control"
                  placeholder="Twitter"
                />
              </div>{" "}
              <div className="col-md-4">
                <MyTextInput
                  name="instagram"
                  id="instagram"
                  type="text"
                  className="form-control"
                  placeholder="Instagram"
                />
              </div>{" "}
              <div className="col-md-8">
                <MyTextInput
                  name="mail"
                  id="mail"
                  type="text"
                  className="form-control"
                  placeholder="Mail"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MySearchableSelect
                  name="duty"
                  id="duty"
                  options={dutyOptions}
                  // type="text"
                  // className="form-control"
                  placeholder="Vəzifəsi"
                />
              </div>
              <div className="col-md-8">
                <MySearchableSelect
                  name="department"
                  id="department"
                  options={departmentOptions}

                  // type="text"
                  // className="form-control"
                  placeholder="Struktur bölməsi"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="startWork"
                  id="startWork"
                  type="date"
                  className="form-control"
                  placeholder="İşə qəbul tarixi"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="circulation"
                  id="circulation"
                  type="text"
                  className="form-control"
                  placeholder="Dövriyyə"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="bonus"
                  id="bonus"
                  type="text"
                  className="form-control"
                  placeholder="Bonus"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="customerSatisfaction"
                  id="customerSatisfaction"
                  type="text"
                  className="form-control"
                  placeholder="Müştəri məmnuniyyəti"
                />
              </div>{" "}
              <div className="col-md-4">
                <MyTextInput
                  name="performance"
                  id="performance"
                  type="text"
                  className="form-control"
                  placeholder="Performans"
                />
              </div>{" "}
              <div className="col-md-4">
                <MySearchableSelect
                  name="contractType"
                  id="contractType"
                  options={contractTypeOptions}

                  // type="text"
                  // className="form-control"
                  placeholder="Müqavilə növü"
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
