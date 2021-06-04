import React, { useEffect, useState } from "react";
import $ from "jquery";

import ModalWrapper from "../../../app/modal/ModalWrapper";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { createCrm, updateCrm } from "./crmActions";
import { closeModal } from "../../../app/modal/modalReducer";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default function CrmPageModal({ crm }) {
  const { employees } = useSelector((state) => state.employees);
  const { references } = useSelector((state) => state.references);
  let employeeOptions = [];
  let referenceOptions = [];
  const legalStatusOptions = [
    { label: "Hüquqi şəxs", value: 0 },
    { label: "Fiziki şəxs", value: 1 },
    { label: "Qeyri vergi ödəyicisi fiziki şəxs", value: 2 },
  ];
  const placeOptions = [
    { label: "Hüquqi ünvan", value: 0 },
    { label: "Faktiki ünvan", value: 1 },
  ];
  referenceOptions =
    references &&
    references.map((reference) => {
      return {
        value: `${reference.referenceName} `,
        label: `${reference.referenceName}`,
      };
    });
  employeeOptions =
    employees &&
    employees.map((employee) => {
      return {
        value: `${employee.firstname} ${employee.lastname}`,
        label: `${employee.firstname} ${employee.lastname}`,
      };
    });

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = crm
    ? crm
    : {
        id: "",

        firstname: "",
        lastname: "",
        middlename: "",
        birthday: "",
        p_phone: "",
        p_whatsapp: "",
        p_telegram: "",
        p_facebook: "",
        p_linkedin: "",
        p_twitter: "",
        p_instagram: "",
        p_mail: "",

        curator: "",
        customerCode: "",
        customerName: "",
        vöen: "",
        createDate: "",

        logo: "",
        legalAddress: "",
        actualAddress: "",
        phone: "",
        website: "",
        whatsapp: "",
        telegram: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        mail: "",

        reference: "",
        serviceType: "",
        orderSource: "",
        orderDestination: "",
        circulation: "",
        customerCategory: "",
        customerSatisfaction: "",
        note: "",
      };
  const validationSchema = Yup.object({
    curator: Yup.string().required("Mütləq doldurulmalıdır."),
    // customerCode: Yup.string().required("Mütləq doldurulmalıdır."),
    customerName: Yup.string().required("Mütləq doldurulmalıdır."),
    vöen: Yup.string().required("Mütləq doldurulmalıdır."),
    createDate: Yup.string().required("Mütləq doldurulmalıdır."),

    // logo: Yup.string().required("Mütləq doldurulmalıdır."),
    legalAddress: Yup.string().required("Mütləq doldurulmalıdır."),
    actualAddress: Yup.string().required("Mütləq doldurulmalıdır."),
    phone: Yup.string().required("Mütləq doldurulmalıdır."),
    website: Yup.string().required("Mütləq doldurulmalıdır."),
    whatsapp: Yup.string().required("Mütləq doldurulmalıdır."),
    telegram: Yup.string().required("Mütləq doldurulmalıdır."),
    facebook: Yup.string().required("Mütləq doldurulmalıdır."),
    linkedin: Yup.string().required("Mütləq doldurulmalıdır."),
    twitter: Yup.string().required("Mütləq doldurulmalıdır."),
    instagram: Yup.string().required("Mütləq doldurulmalıdır."),
    mail: Yup.string().required("Mütləq doldurulmalıdır."),
    reference: Yup.string().required("Mütləq doldurulmalıdır."),
    circulation: Yup.string().required("Mütləq doldurulmalıdır."),
    customerCategory: Yup.string().required("Mütləq doldurulmalıdır."),
    customerSatisfaction: Yup.string().required("Mütləq doldurulmalıdır."),
    note: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper size="modal-xl" header={crm ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            crm
              ? await dispatch(updateCrm(values))
              : await dispatch(createCrm({ ...values, id: cuid() }));
            setSubmitting(false);
            crm
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
            <div id="iconsAccordion" className="accordion-icons">
              <div className="card">
                <div className="card-header" id="headingOne3">
                  <section className="mb-0 mt-0">
                    <div
                      role="menu"
                      className="collapsed"
                      data-toggle="collapse"
                      data-target="#iconAccordionOne"
                      aria-expanded="false"
                      aria-controls="iconAccordionOne"
                    >
                      <div className="accordion-icon">
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
                          className="feather feather-user"
                        >
                          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                      </div>
                      Kontakt şəxs haqqında məlumatlar
                      <div className="icons">
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
                          className="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </section>
                </div>
                <div
                  id="iconAccordionOne"
                  className="collapse"
                  aria-labelledby="headingOne3"
                  data-parent="#iconsAccordion"
                  style={{}}
                >
                  <div className="card-body">
                    <div className="row">
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
                      <div className="col-md-4">
                        <MyTextInput
                          id="middlename"
                          name="middlename"
                          type="text"
                          className="form-control"
                          placeholder="Ata adı"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <MyTextInput
                          name="p_phone"
                          id="p_phone"
                          type="text"
                          className="form-control"
                          placeholder="Telefon"
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="p_whatsapp"
                          id="p_whatsapp"
                          type="text"
                          className="form-control"
                          placeholder="Whatsapp"
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="p_telegram"
                          id="p_telegram"
                          type="text"
                          className="form-control"
                          placeholder="Telegram"
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="p_facebook"
                          id="p_facebook"
                          type="text"
                          className="form-control"
                          placeholder="Facebook"
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="p_linkedin"
                          id="p_linkedin"
                          type="text"
                          className="form-control"
                          placeholder="Linkedin"
                        />
                      </div>{" "}
                      <div className="col-md-4">
                        <MyTextInput
                          name="p_twitter"
                          id="p_twitter"
                          type="text"
                          className="form-control"
                          placeholder="Twitter"
                        />
                      </div>{" "}
                      <div className="col-md-4">
                        <MyTextInput
                          name="p_instagram"
                          id="p_instagram"
                          type="text"
                          className="form-control"
                          placeholder="Instagram"
                        />
                      </div>{" "}
                      <div className="col-md-8">
                        <MyTextInput
                          name="p_mail"
                          id="p_mail"
                          type="text"
                          className="form-control"
                          placeholder="Mail"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo3">
                  <section className="mb-0 mt-0">
                    <div
                      role="menu"
                      className="collapsed"
                      data-toggle="collapse"
                      data-target="#iconAccordionTwo"
                      aria-expanded="false"
                      aria-controls="iconAccordionTwo"
                    >
                      <div className="accordion-icon">
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
                          className="feather feather-box"
                        >
                          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                          <line x1={12} y1="22.08" x2={12} y2={12} />
                        </svg>
                      </div>
                      Crm haqqında məlumatlar
                      <div className="icons">
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
                          className="feather feather-chevron-down"
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>
                  </section>
                </div>
                <div
                  id="iconAccordionTwo"
                  className="collapse"
                  aria-labelledby="headingTwo3"
                  data-parent="#iconsAccordion"
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-4">
                        <MySearchableSelect
                          name="curator"
                          id="curator"
                          type="text"
                          options={employeeOptions}
                          // className="form-control"
                          placeholder="Kurator"
                        />
                      </div>
                      <div className="col-md-4">
                        <MySearchableSelect
                          name="legalStatus"
                          id="legalStatus"
                          type="text"
                          options={legalStatusOptions}
                          // className="form-control"
                          placeholder="Hüquqi status"
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          id="customerName"
                          name="customerName"
                          type="text"
                          className="form-control"
                          placeholder="Müştəri adı"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <MyTextInput
                          id="vöen"
                          name="vöen"
                          type="text"
                          className="form-control"
                          placeholder="VÖEN"
                        />
                      </div>
                      <div className="col-md-6">
                        <MyTextInput
                          name="createDate"
                          id="createDate"
                          type="date"
                          className="form-control"
                          placeholder="Tarix"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6">
                        <MyTextInput
                          name="legalAddress"
                          id="legalAddress"
                          type="text"
                          className="form-control"
                          placeholder="Hüquqi ünvan"
                        />
                      </div>
                      <div className="col-md-6">
                        <MyTextInput
                          name="actualAddress"
                          id="actualAddress"
                          type="text"
                          className="form-control"
                          placeholder="Faktiki ünvan"
                        />
                      </div>
                      <div className="col-md-6">
                        <MyTextInput
                          name="phone"
                          id="phone"
                          type="text"
                          className="form-control"
                          placeholder="Nömrə"
                        />
                      </div>
                      <div className="col-md-6">
                        <MyTextInput
                          name="mail"
                          id="mail"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-4">
                        <MyTextInput
                          name="linkedin"
                          id="linkedin"
                          type="text"
                          className="form-control"
                          placeholder="Linkedin"
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="twitter"
                          id="twitter"
                          type="text"
                          className="form-control"
                          placeholder="Twitter"
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="instagram"
                          id="instagram"
                          type="text"
                          className="form-control"
                          placeholder="Instagram"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <MyTextInput
                          name="website"
                          id="website"
                          type="text"
                          className="form-control"
                          placeholder="Vebsayt"
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="whatsapp"
                          id="whatsapp"
                          type="text"
                          className="form-control"
                          placeholder="Whatsapp"
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="telegram"
                          id="telegram"
                          type="text"
                          className="form-control"
                          placeholder="Telegram"
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="facebook"
                          id="facebook"
                          type="email"
                          className="form-control"
                          placeholder="Facebook"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-3">
                        <MySearchableSelect
                          name="reference"
                          id="reference"
                          type="text"
                          options={referenceOptions}
                          // className="form-control"
                          placeholder="Referans"
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="customerCategory"
                          id="customerCategory"
                          type="text"
                          className="form-control"
                          placeholder="Müştəri kateqoriyası"
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="customerSatisfaction"
                          id="customerSatisfaction"
                          type="text"
                          className="form-control"
                          placeholder="Müştəri məmnuniyyəti"
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="circulation"
                          id="circulation"
                          type="text"
                          className="form-control"
                          placeholder="Dövriyyə"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <MyTextArea
                          name="note"
                          id="note"
                          type="email"
                          className="form-control"
                          placeholder="Qeyd"
                        />
                      </div>
                    </div>
                  </div>
                </div>
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
