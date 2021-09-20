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
import moment from "moment";

export default function CrmPageModal({ crm }) {
  const { employees } = useSelector((state) => state.employees);
  const { references } = useSelector((state) => state.references);
  let employeeOptions = [];
  let referenceOptions = [];
  const legalStatusOptions = [
    { label: "Hüquqi şəxs", value: parseInt(0) },
    { label: "Fiziki şəxs", value: parseInt(1) },
    { label: "Qeyri vergi ödəyicisi fiziki şəxs", value: parseInt(2) },
  ];
  const selectedLegalStatus =
    crm &&
    legalStatusOptions.filter(
      (legalStatusOption) => crm.legal_status_id === legalStatusOption.value
    );
  const placeOptions = [
    { label: "Hüquqi ünvan", value: 0 },
    { label: "Faktiki ünvan", value: 1 },
  ];
  referenceOptions =
    references &&
    references.map((reference) => {
      return {
        value: parseInt(reference.id),
        label: `${reference.name}`,
      };
    });
  employeeOptions =
    employees &&
    employees.map((employee) => {
      return {
        value: parseInt(employee.id),
        label: `${employee.name} ${employee.surname}`,
      };
    });

  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  // dovriyye il uzre
  const [circulationWithYears, setCirculationWithYears] = useState(
    crm
      ? JSON.parse(crm.circulationByYears)
      : [{ circulationYear: "", circulation: "" }]
  );
  let mapCirculations = circulationWithYears;
  console.log(mapCirculations);
  const handleAddCirculationByYear = () => {
    setCirculationWithYears([
      ...circulationWithYears,
      { circulationYear: "", circulation: "" },
    ]);
  };
  const handleRemoveCirculationByYear = () => {
    if (circulationWithYears.length > 1) {
      let lastIndex = circulationWithYears.length - 1;
      let values = [...circulationWithYears];
      values.splice(lastIndex, 1);
      setCirculationWithYears(values);
    }
  };
  /// isciler il uzre

  const [workersYears, setWorkersYears] = useState(
    crm ? JSON.parse(crm.workersYears) : [{ workerYear: "", worker: "" }]
  );
  let mapWorkersYears = workersYears;
  const handleAddWorkersYear = () => {
    setWorkersYears([...workersYears, { workerYear: "", worker: "" }]);
  };
  const handleRemoveWorkersYear = () => {
    if (workersYears.length > 1) {
      let lastIndex = workersYears.length - 1;
      let values = [...workersYears];
      values.splice(lastIndex, 1);
      setWorkersYears(values);
    }
  };

  /// Tedbirler  uzre

  const [measures, setMeasures] = useState(
    crm ? JSON.parse(crm.measures) : [{ measureYear: "", measure: "" }]
  );
  let mapMeasures = measures;
  const handleAddMeasures = () => {
    setMeasures([...measures, { measureYear: "", measure: "" }]);
  };
  const handleRemoveMeasures = () => {
    if (measures.length > 1) {
      let lastIndex = measures.length - 1;
      let values = [...measures];
      values.splice(lastIndex, 1);
      setMeasures(values);
    }
  };
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = crm
    ? {
        contact_name: crm.contact_name && crm.contact_name,
        contact_surname: crm.contact_surname && crm.contact_surname,
        contact_dadname: crm.contact_dadname && crm.contact_dadname,
        contact_phone: crm.contact_phone && crm.contact_phone,
        contact_whatsapp: crm.contact_whatsapp && crm.contact_whatsapp,
        contact_telegram: crm.contact_telegram && crm.contact_telegram,
        contact_facebook: crm.contact_facebook && crm.contact_facebook,
        contact_linkedin: crm.contact_linkedin && crm.contact_linkedin,
        contact_twitter: crm.contact_twitter && crm.contact_twitter,
        contact_instagram: crm.contact_instagram && crm.contact_instagram,
        contact_mail: crm.contact_instagram && crm.contact_instagram,

        employee_id: crm.employee_id && crm.employee_id.id,
        legal_status_id: crm.legal_status_id && crm.legal_status_id,
        customer_name: crm.customer_name && crm.customer_name,
        voen: crm.voen && crm.voen,
        date: crm.date && moment(crm.date).format("YYYY-MM-DD"),

        // logo: "",
        legal_adress: crm.legal_adress && crm.legal_adress,
        actual_adress: crm.actual_adress && crm.actual_adress,
        customer_phone: crm.customer_phone && crm.customer_phone,
        customer_email: crm.customer_email && crm.customer_email,
        customer_linkedin: crm.customer_linkedin && crm.customer_linkedin,
        customer_twitter: crm.customer_twitter && crm.customer_twitter,
        customer_instagram: crm.customer_instagram && crm.customer_instagram,
        customer_website: crm.customer_website && crm.customer_website,
        customer_whatsapp: crm.customer_whatsapp && crm.customer_whatsapp,
        customer_telegram: crm.customer_telegram && crm.customer_telegram,
        customer_facebook: crm.customer_facebook && crm.customer_facebook,

        referans_id: crm.referans_id && crm.referans_id.id,
        customer_category: crm.customer_category && crm.customer_category,
        customer_satisfaction:
          crm.customer_satisfaction && crm.customer_satisfaction,
        turnover: crm.turnover && crm.turnover,
        circulationByYears:
          crm.circulationByYears && JSON.parse(crm.circulationByYears),
        workersYears: crm.workersYears && JSON.parse(crm.workersYears),
        measures: crm.measures && JSON.parse(crm.measures),

        note: crm.note && crm.note,
        note2: crm.note2 && crm.note2,

      }
    : {
        contact_name: "",
        contact_surname: "",
        contact_dadname: "",
        contact_phone: "",
        contact_whatsapp: "",
        contact_telegram: "",
        contact_facebook: "",
        contact_linkedin: "",
        contact_twitter: "",
        contact_instagram: "",
        contact_mail: "",

        employee_id: "",
        legal_status_id: "",
        customer_name: "",
        voen: "",
        date: "",

        // logo: "",
        legal_adress: "",
        actual_adress: "",
        customer_phone: "",
        customer_email: "",
        customer_linkedin: "",
        customer_twitter: "",
        customer_instagram: "",
        customer_website: "",
        customer_whatsapp: "",
        customer_telegram: "",
        customer_facebook: "",

        referans_id: "",
        customer_category: "",
        customer_satisfaction: "",
        turnover: "",
        circulationByYears: circulationWithYears,
        workersYears: workersYears,
        measures: measures,
        note: "",
        note2:""
      };
  const validationSchema = Yup.object({
    contact_name: Yup.string().required("Mutuel doldurulmalıdır."),
    contact_surname: Yup.string().required("Mutuel doldurulmalıdır."),
    employee_id: Yup.string().required("Mutuel doldurulmalıdır."),
    // customerCode: Yup.string().required("Mütləq doldurulmalıdır."),
    customer_name: Yup.string().required("Mütləq doldurulmalıdır."),
    voen: Yup.string().required("Mütləq doldurulmalıdır."),
    // date: Yup.string().required("Mütləq doldurulmalıdır."),
    // // logo: Yup.string().required("Mütləq doldurulmalıdır."),
    // legal_adress: Yup.string().required("Mütləq doldurulmalıdır."),
    // actual_adress: Yup.string().required("Mütləq doldurulmalıdır."),
    // customer_phone: Yup.string().required("Mütləq doldurulmalıdır."),
    // customer_website: Yup.string().required("Mütləq doldurulmalıdır."),
    // whatsapp: Yup.string().required("Mütləq doldurulmalıdır."),
    // telegram: Yup.string().required("Mütləq doldurulmalıdır."),
    // facebook: Yup.string().required("Mütləq doldurulmalıdır."),
    // linkedin: Yup.string().required("Mütləq doldurulmalıdır."),
    // twitter: Yup.string().required("Mütləq doldurulmalıdır."),
    // instagram: Yup.string().required("Mütləq doldurulmalıdır."),
    // customer_email: Yup.string().required("Mütləq doldurulmalıdır."),
    referans_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // circulation: Yup.string().required("Mütləq doldurulmalıdır."),
    // customer_category: Yup.string().required("Mütləq doldurulmalıdır."),
    // customer_satisfaction: Yup.string().required("Mütləq doldurulmalıdır."),
    // note: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper
      data={crm && `Müştəri - CS${crm.id}`}
      size="modal-xl"
      header={crm ? "Redakte Et" : "Əlavə et"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            crm
              ? await dispatch(
                  updateCrm({
                    ...values,
                    id: crm.id,
                  })
                )
              : await dispatch(createCrm({ ...values }));
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
            <div id="iconsAccordion" className="accordion-icons">
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
                      Müştəri haqqında məlumatlar
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
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-4">
                        <MyTextInput
                          id="customer_name"
                          name="customer_name"
                          type="text"
                          className="form-control"
                          placeholder="Müştəri adı*"
                          label={crm && "Müştəri adı*"}
                        />
                      </div>
                      <div className="col-md-4">
                        <MySearchableSelect
                          name="employee_id"
                          id="employee_id"
                          type="text"
                          options={employeeOptions}
                          // className="form-control"
                          defaultValue={
                            crm && {
                              label: `${crm.employee_id.name && crm.employee_id.name} ${crm.employee_id.surname && crm.employee_id.surname}`,
                              value: parseInt(crm.employee_id.id && crm.employee_id.id),
                            }
                          }
                          placeholder="Kurator*"
                          label={crm && "Kurator*"}
                        />
                      </div>
                      <div className="col-md-4">
                        <MySearchableSelect
                          name="legal_status_id"
                          labe
                          id="legal_status_id"
                          type="text"
                          options={legalStatusOptions}
                          defaultValue={crm && selectedLegalStatus[0]}
                          // className="form-control"
                          placeholder="Hüquqi status"
                          label={crm && "Hüquqi status"}
                        />
                      </div>
                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-12">
                        <MyTextInput
                          id="voen"
                          name="voen"
                          type="text"
                          className="form-control"
                          placeholder="VÖEN*"
                          label={crm && "VÖEN*"}
                        />
                      </div>

                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-6">
                        <MyTextInput
                          name="legal_adress"
                          id="legal_adress"
                          type="text"
                          className="form-control"
                          placeholder="Hüquqi ünvan"
                          label={crm && "Hüquqi ünvan"}
                        />
                      </div>
                      <div className="col-md-6">
                        <MyTextInput
                          name="actual_adress"
                          id="actual_adress"
                          type="text"
                          className="form-control"
                          label={crm && "Faktiki ünvans"}
                          placeholder="Faktiki ünvan"
                        />
                      </div>
                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-6">
                        <MyTextInput
                          name="customer_phone"
                          id="customer_phone"
                          type="text"
                          className="form-control"
                          label={crm && "Əlaqə nömrəsi"}
                          placeholder="Əlaqə nömrəsi"
                        />
                      </div>
                      <div className="col-md-6">
                        <MyTextInput
                          name="customer_email"
                          id="customer_email"
                          type="email"
                          className="form-control"
                          placeholder="Email"
                          label={crm && "Email"}
                        />
                      </div>
                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-4">
                        <MyTextInput
                          name="customer_linkedin"
                          id="customer_linkedin"
                          type="text"
                          className="form-control"
                          placeholder="Linkedin"
                          label={crm && "Linkedin"}
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="customer_twitter"
                          id="customer_twitter"
                          type="text"
                          className="form-control"
                          placeholder="Twitter"
                          label={crm && "Twitter"}
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="customer_instagram"
                          id="customer_instagram"
                          type="text"
                          className="form-control"
                          placeholder="Instagram"
                          label={crm && "Instagram"}
                        />
                      </div>
                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-3">
                        <MyTextInput
                          name="customer_website"
                          id="customer_website"
                          type="text"
                          className="form-control"
                          label={crm && "Vebsayt"}
                          placeholder="Vebsayt"
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="customer_whatsapp"
                          id="customer_whatsapp"
                          type="text"
                          className="form-control"
                          placeholder="Whatsapp"
                          label={crm && "Whatsapp"}
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="customer_telegram"
                          id="customer_telegram"
                          type="text"
                          className="form-control"
                          placeholder="Telegram"
                          label={crm && "Telegram"}
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="customer_facebook"
                          id="customer_facebook"
                          type="text"
                          className="form-control"
                          placeholder="Facebook"
                          label={crm && "Facebook"}
                        />
                      </div>
                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-3">
                        <MySearchableSelect
                          name="referans_id"
                          id="referans_id"
                          type="text"
                          defaultValue={
                            crm && {
                              label: crm.referans_id.name && crm.referans_id.name,
                              value: parseInt(crm.referans_id.id && crm.referans_id.id),
                            }
                          }
                          options={referenceOptions}
                          // className="form-control"
                          placeholder="Referans"
                          label={crm && "Referans"}
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="customer_category"
                          id="customer_category"
                          type="text"
                          className="form-control"
                          placeholder="Müştəri kateqoriyası"
                          label={crm && "Müştəri kateqoriyası"}
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="customer_satisfaction"
                          id="customer_satisfaction"
                          type="text"
                          className="form-control"
                          placeholder="Müştəri məmnuniyyəti"
                          label={crm && "Müştəri məmnuniyyəti"}
                        />
                      </div>
                      <div className="col-md-3">
                        <MyTextInput
                          name="turnover"
                          id="turnover"
                          type="text"
                          className="form-control"
                          placeholder="Dövriyyə"
                          label={crm && "Dövriyyə"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-4">
                        <MyTextInput
                          id="contact_name"
                          //  label={crm ? 'Ad' : ''}
                          label={crm && "Ad*"}
                          name="contact_name"
                          type="text"
                          className="form-control"
                          placeholder="Ad*"
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          id="contact_surname"
                          name="contact_surname"
                          type="text"
                          label={crm && "Soyad*"}
                          className="form-control"
                          placeholder="Soyad*"
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          id="contact_dadname"
                          name="contact_dadname"
                          type="text"
                          className="form-control"
                          placeholder="Ata adı"
                          label={crm && "Ata adı"}
                        />
                      </div>
                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-4">
                        <MyTextInput
                          name="contact_phone"
                          id="contact_phone"
                          type="text"
                          className="form-control"
                          placeholder="Telefon"
                          label={crm && "Telefon"}
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="contact_whatsapp"
                          id="contact_whatsapp"
                          type="text"
                          className="form-control"
                          placeholder="Whatsapp"
                          label={crm && "Whatsapp"}
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="contact_telegram"
                          id="contact_telegram"
                          type="text"
                          className="form-control"
                          placeholder="Telegram"
                          label={crm && "Telegram"}
                        />
                      </div>
                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-4">
                        <MyTextInput
                          name="contact_facebook"
                          id="contact_facebook"
                          type="text"
                          className="form-control"
                          placeholder="Facebook"
                          label={crm && "Facebook"}
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="contact_linkedin"
                          id="contact_linkedin"
                          type="text"
                          className="form-control"
                          placeholder="Linkedin"
                          label={crm && "Linkedin"}
                        />
                      </div>{" "}
                      <div className="col-md-4">
                        <MyTextInput
                          name="contact_twitter"
                          id="contact_twitter"
                          type="text"
                          className="form-control"
                          placeholder="Twitter"
                          label={crm && "Twitter"}
                        />
                      </div>{" "}
                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-4">
                        <MyTextInput
                          name="contact_instagram"
                          id="contact_instagram"
                          type="text"
                          className="form-control"
                          placeholder="Instagram"
                          label={crm && "Instagram"}
                        />
                      </div>{" "}
                      <div className="col-md-4">
                        <MyTextInput
                          name="contact_mail"
                          id="contact_mail"
                          type="text"
                          className="form-control"
                          placeholder="Mail"
                          label={crm && "Mail"}
                        />
                      </div>
                      <div className="col-md-4">
                        <MyTextInput
                          name="date"
                          id="date"
                          type={crm ? "date" : "text"}
                          onFocus={(e) => {
                            e.currentTarget.type = "date";
                            e.currentTarget.focus();
                          }}
                          className="form-control"
                          placeholder="Tarix"
                          label={crm && "Tarix"}
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
                      data-target="#iconAccordionThree"
                      aria-expanded="false"
                      aria-controls="iconAccordionThree"
                    >
                      <div className="accordion-icon">
                        <svg
                          viewBox="0 0 24 24"
                          width={24}
                          height={24}
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1"
                        >
                          <line x1={12} y1={1} x2={12} y2={23} />
                          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                        </svg>
                      </div>
                      Son illərdəki dövriyyəsi
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
                  id="iconAccordionThree"
                  className="collapse"
                  aria-labelledby="headingTwo3"
                  data-parent="#iconsAccordion"
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2 offset-10 text-right">
                        <div className="icon-container">
                          <button
                            type="button"
                            className="close"
                            onClick={() => handleAddCirculationByYear()}
                          >
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
                              className="feather feather-plus-circle"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <line x1={12} y1={8} x2={12} y2={16} />
                              <line x1={8} y1={12} x2={16} y2={12} />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveCirculationByYear()}
                            className="close"
                          >
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
                              className="feather feather-minus-circle"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <line x1={8} y1={12} x2={16} y2={12} />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      {mapCirculations &&
                        mapCirculations.map((mapCirculation, index) => (
                          <React.Fragment key={index}>
                            <div className="col-md-6">
                              <MyTextInput
                                id="circulationYear"
                                name={`circulationByYears[${index}].circulationYear`}
                                type="text"
                                defaultValue={
                                  mapCirculations &&
                                  mapCirculation.circulationYear
                                }
                                className="form-control"
                                placeholder="İl"
                              />
                            </div>
                            <div className="col-md-6">
                              <MyTextInput
                                name={`circulationByYears[${index}].circulation`}
                                defaultValue={
                                  mapCirculations && mapCirculation.circulation
                                }
                                id="circulation"
                                type="text"
                                className="form-control"
                                placeholder="Dövriyyə"
                              />
                            </div>
                          </React.Fragment>
                        ))}
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
                      data-target="#iconAccordionForth"
                      aria-expanded="false"
                      aria-controls="iconAccordionForth"
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
                          className="feather feather-users"
                        >
                          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx={9} cy={7} r={4} />
                          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                        </svg>
                      </div>
                      Son illərdəki işçi sayı
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
                  id="iconAccordionForth"
                  className="collapse"
                  aria-labelledby="headingTwo3"
                  data-parent="#iconsAccordion"
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2 offset-10 text-right">
                        <div className="icon-container">
                          <button
                            type="button"
                            className="close"
                            onClick={() => handleAddWorkersYear()}
                          >
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
                              className="feather feather-plus-circle"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <line x1={12} y1={8} x2={12} y2={16} />
                              <line x1={8} y1={12} x2={16} y2={12} />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveWorkersYear()}
                            className="close"
                          >
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
                              className="feather feather-minus-circle"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <line x1={8} y1={12} x2={16} y2={12} />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {mapWorkersYears &&
                        mapWorkersYears.map((mapWorkersYears, index) => (
                          <React.Fragment key={index}>
                            <div className="col-md-6">
                              <MyTextInput
                                id={`workersYears[${index}].workerYear`}
                                name={`workersYears[${index}]workerYear`}
                                defaultValue={
                                  mapWorkersYears && mapWorkersYears.workerYear
                                }
                                type="text"
                                className="form-control"
                                placeholder="İl"
                              />
                            </div>
                            <div className="col-md-6">
                              <MyTextInput
                                name={`workersYears[${index}]worker`}
                                id={`workersYears[${index}].worker`}
                                defaultValue={
                                  mapWorkersYears && mapWorkersYears.worker
                                }
                                type="text"
                                className="form-control"
                                placeholder="İşçilər"
                              />
                            </div>
                          </React.Fragment>
                        ))}
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
                      data-target="#iconAccordionFive"
                      aria-expanded="false"
                      aria-controls="iconAccordionFive"
                    >
                      <div className="accordion-icon">
                        <svg
                          viewBox="0 0 24 24"
                          width={24}
                          height={24}
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1"
                        >
                          <rect
                            x={3}
                            y={4}
                            width={18}
                            height={18}
                            rx={2}
                            ry={2}
                          />
                          <line x1={16} y1={2} x2={16} y2={6} />
                          <line x1={8} y1={2} x2={8} y2={6} />
                          <line x1={3} y1={10} x2={21} y2={10} />
                        </svg>
                      </div>
                      Müştəri tədbirləri
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
                  id="iconAccordionFive"
                  className="collapse"
                  aria-labelledby="headingTwo3"
                  data-parent="#iconsAccordion"
                >
                  <div className="card-body">
                    <div className="row">
                      <div className="col-md-2 offset-10 text-right">
                        <div className="icon-container">
                          <button
                            type="button"
                            className="close"
                            onClick={() => handleAddMeasures()}
                          >
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
                              className="feather feather-plus-circle"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <line x1={12} y1={8} x2={12} y2={16} />
                              <line x1={8} y1={12} x2={16} y2={12} />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleRemoveMeasures()}
                            className="close"
                          >
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
                              className="feather feather-minus-circle"
                            >
                              <circle cx={12} cy={12} r={10} />
                              <line x1={8} y1={12} x2={16} y2={12} />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {mapMeasures &&
                        mapMeasures.map((mapMeasure, index) => (
                          <React.Fragment key={index}>
                            <div className="col-md-6">
                              <MyTextInput
                                id={`measures[${index}].measureYear`}
                                name={`measures[${index}]measureYear`}
                                defaultValue={
                                  mapMeasures && mapMeasure.measureYear
                                }
                                className="form-control"
                                placeholder="İl"
                                type={crm ? "date" : "text"}
                                onFocus={(e) => {
                                  e.currentTarget.type = "date";
                                  e.currentTarget.focus();
                                }}
                              />
                            </div>
                            <div className="col-md-6">
                              <MyTextInput
                                name={`measures[${index}]measure`}
                                id={`measures[${index}].measure`}
                                defaultValue={mapMeasures && mapMeasure.measure}
                                type="text"
                                className="form-control"
                                placeholder="Tədbir"
                              />
                            </div>
                          </React.Fragment>
                        ))}
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
                      data-target="#iconAccordionSix"
                      aria-expanded="false"
                      aria-controls="iconAccordionSix"
                    >
                      <div className="accordion-icon">
                        <svg
                          viewBox="0 0 24 24"
                          width={24}
                          height={24}
                          stroke="currentColor"
                          strokeWidth={2}
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="css-i6dzq1"
                        >
                          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                          <rect
                            x={8}
                            y={2}
                            width={8}
                            height={4}
                            rx={1}
                            ry={1}
                          />
                        </svg>
                      </div>
                      Əlavə Qeydlər
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
                  id="iconAccordionSix"
                  className="collapse"
                  aria-labelledby="headingTwo3"
                  data-parent="#iconsAccordion"
                >
                  <div className="card-body">
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-12">
                        <MyTextArea
                          name="note"
                          id="note"
                          className="form-control"
                          placeholder="Şirkət haqqında qeydlərimiz"
                          label={crm && "Qeyd"}
                        /> 
                      </div>
                    </div>
                    <div className={`row ${crm && "mb-4"}`}>
                      <div className="col-md-12">
                        <MyTextArea
                          name="note2"
                          id="note2"
                          className="form-control"
                          placeholder="Vergi qeydləri"
                          label={crm && "Vergi qeydləri"}
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
