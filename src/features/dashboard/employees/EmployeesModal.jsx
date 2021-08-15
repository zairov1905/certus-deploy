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
import { loadDuties } from "../settings/duty/dutyActions";
import { loadDepartments } from "../settings/department/departmentActions";
import moment from "moment";

export default function EmployeesModal({ employee }) {
  const dispatch = useDispatch();

  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });
  useEffect(() => {
    dispatch(loadDuties());
    dispatch(loadDepartments());
  }, []);
  const { duties } = useSelector((state) => state.duties);
  const { departments } = useSelector((state) => state.departments);
  let dutyOptions =
    duties &&
    duties.map((duty) => {
      return {
        label: duty.name,
        value: duty.id,
      };
    });

  let departmentOptions =
    departments &&
    departments.map((department) => {
      return {
        label: department.name,
        value: department.id,
      };
    });
  const contractTypeOptions = [
    { label: "Əmək müqaviləsi", value: 0 },
    { label: "Xidmət müqaviləsi", value: 1 },
  ];
  const selectedContractType =
    employee && employee.agreement_type === 1
      ? { label: "Xidmət müqaviləsi", value: 1 }
      : { label: "Əmək müqaviləsi", value: 0 };
  const initialValues = employee
    ? {
      fin: employee.fin && employee.fin,
      name: employee.name && employee.name,
      surname: employee.surname && employee.surname,
      dadname: employee.dadname && employee.dadname,
      birthday: employee.birthday && employee.birthday,
      address: employee.address && employee.address,
      phone: employee.phone && employee.phone,

      whatsapp: employee.whatsapp && employee.whatsapp,
      telegram: employee.telegram && employee.telegram,
      facebook: employee.facebook && employee.facebook,
      linkedin: employee.linkedin && employee.linkedin,
      twitter: employee.twitter && employee.twitter,
      instagram: employee.instagram && employee.instagram,
      mail: employee.mail && employee.mail,

      position_id: employee.position_id && employee.position_id.id,
      structural_section_id: employee.structural_section_id && employee.structural_section_id.id,
      date: employee.date && moment(employee.date).format("YYYY-MM-DD"),
      turnover: employee.turnover && employee.turnover,
      bonus: employee.bonus && employee.bonus,
      customer_satisfaction: employee.customer_satisfaction && employee.customer_satisfaction,
      performans: employee.performans && employee.performans,
      agreement_type: employee.agreement_type && employee.agreement_type,
    }
    : {
        fin: "",
        name: "",
        surname: "",
        dadname: "",
        birthday: "",
        address: "",
        phone: "",

        whatsapp: "",
        telegram: "",
        facebook: "",
        linkedin: "",
        twitter: "",
        instagram: "",
        mail: "",

        position_id: "",
        structural_section_id: "",
        date: "",
        turnover: "",
        bonus: "",
        customer_satisfaction: "",
        performans: "",
        agreement_type: "",
      };

  const validationSchema = Yup.object({
    fin: Yup.string().required("Mütləq doldurulmalıdır."),
    name: Yup.string().required("Mütləq doldurulmalıdır."),
    surname: Yup.string().required("Mütləq doldurulmalıdır."),
    dadname: Yup.string().required("Mütləq doldurulmalıdır."),
    birthday: Yup.string().required("Mütləq doldurulmalıdır."),
    address: Yup.string().required("Mütləq doldurulmalıdır."),
    phone: Yup.string().required("Mütləq doldurulmalıdır."),

    whatsapp: Yup.string().required("Mütləq doldurulmalıdır."),
    telegram: Yup.string().required("Mütləq doldurulmalıdır."),
    facebook: Yup.string().required("Mütləq doldurulmalıdır."),
    linkedin: Yup.string().required("Mütləq doldurulmalıdır."),
    twitter: Yup.string().required("Mütləq doldurulmalıdır."),
    instagram: Yup.string().required("Mütləq doldurulmalıdır."),
    mail: Yup.string().required("Mütləq doldurulmalıdır."),

    position_id: Yup.string().required("Mütləq doldurulmalıdır."),
    structural_section_id: Yup.string().required("Mütləq doldurulmalıdır."),
    date: Yup.string().required("Mütləq doldurulmalıdır."),
    turnover: Yup.string().required("Mütləq doldurulmalıdır."),
    bonus: Yup.string().required("Mütləq doldurulmalıdır."),
    customer_satisfaction: Yup.string().required("Mütləq doldurulmalıdır."),
    performans: Yup.string().required("Mütləq doldurulmalıdır."),
    agreement_type: Yup.string().required("Mütləq doldurulmalıdır."),
  });
  return (
    <ModalWrapper size="modal-lg" header={employee ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            employee
              ? await dispatch(updateEmployees({...values,id:employee.id}))
              : await dispatch(createEmployees({ ...values }));
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
            <div className={`row ${employee && "mb-4"}`}>
              <div className="col-md-4">
                <MyTextInput
                  id="fim"
                  name="fin"
                  type="text"
                  className="form-control"
                  placeholder="FİN"
                  label={employee && "FİN"}

                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Ad"
                  label={employee && "Ad"}

                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  id="surname"
                  name="surname"
                  type="text"
                  className="form-control"
                  placeholder="Soyad"
                  label={employee && "Soyad"}

                  
                />
              </div>
            </div>
            <div className={`row ${employee && "mb-4"}`}>
              <div className="col-md-4">
                <MyTextInput
                  id="dadname"
                  name="dadname"
                  type="text"
                  className="form-control"
                  placeholder="Ata adı"
                  label={employee && "Ata adı"}
                  
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="birthday"
                  id="birthday"
                  type="date"
                  className="form-control"
                  placeholder="Doğum tarixi"
                  label={employee && "Doğum tarixi"}

                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="address"
                  id="address"
                  type="text"
                  className="form-control"
                  placeholder="Ünvan"
                  label={employee && "Ünvan"}

                />
              </div>
            </div>
            <div className={`row ${employee && "mb-4"}`}>
              <div className="col-md-4">
                <MyTextInput
                  name="phone"
                  id="phone"
                  type="text"
                  className="form-control"
                  placeholder="Telefon"
                  label={employee && "Telefon"}

                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="whatsapp"
                  id="whatsapp"
                  type="text"
                  className="form-control"
                  placeholder="Whatsapp"
                  label={employee && "Whatsapp"}

                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="telegram"
                  id="telegram"
                  type="text"
                  className="form-control"
                  placeholder="Telegram"
                  label={employee && "Telegram"}

                />
              </div>
            </div>
            <div className={`row ${employee && "mb-4"}`}>
              <div className="col-md-4">
                <MyTextInput
                  name="instagram"
                  id="instagram"
                  type="text"
                  className="form-control"
                  placeholder="Instagram"
                  label={employee && "Instagram"}

                />
              </div>{" "}
              <div className="col-md-8">
                <MyTextInput
                  name="mail"
                  id="mail"
                  type="text"
                  className="form-control"
                  placeholder="Mail"
                  label={employee && "Mail"}

                />
              </div>
            </div>
            <div className={`row ${employee && "mb-4"}`}>
              <div className="col-md-4">
                <MySearchableSelect
                  name="position_id"
                  id="position_id"
                  options={dutyOptions}
                  // type="text"
                  // className="form-control"
                  placeholder="Vəzifəsi"
                  label={employee && "Vəzifəsi"}

                  defaultValue={
                    employee && {
                      label: employee.position_id.name,
                      value: employee.position_id.id,
                    }
                  }
                />
              </div>
              <div className="col-md-8">
                <MySearchableSelect
                  name="structural_section_id"
                  id="structural_section_id"
                  options={departmentOptions}

                  defaultValue={
                    employee && {
                      label: employee.structural_section_id.name,
                      value: employee.structural_section_id.id,
                    }
                  }
                  // type="text"
                  // className="form-control"
                  placeholder="Struktur bölməsi"
                  label={employee && "Struktur bölməsi"}

                />
              </div>
            </div>
            <div className={`row ${employee && "mb-4"}`}>
              <div className="col-md-4">
                <MyTextInput
                  name="date"
                  id="date"
                  type="date"
                  className="form-control"
                  placeholder="İşə qəbul tarixi"
                  label={employee && "İşə qəbul tarixi"}

                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="turnover"
                  id="turnover"
                  type="text"
                  className="form-control"
                  placeholder="Dövriyyə"
                  label={employee && "Dövriyyə"}

                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="bonus"
                  id="bonus"
                  type="text"
                  className="form-control"
                  placeholder="Bonus"
                  label={employee && "Bonus"}

                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MyTextInput
                  name="customer_satisfaction"
                  id="customer_satisfaction"
                  type="text"
                  className="form-control"
                  label={employee && "Müştəri məmnuniyyəti"}
                  
                  placeholder="Müştəri məmnuniyyəti"
                />
              </div>{" "}
              <div className="col-md-4">
                <MyTextInput
                  name="performans"
                  id="performans"
                  type="text"
                  className="form-control"
                  placeholder="Performans"
                  label={employee && "Performans"}

                />
              </div>{" "}
              <div className="col-md-4">
                <MySearchableSelect
                  name="agreement_type"
                  id="agreement_type"
                  options={contractTypeOptions}
                  defaultValue={selectedContractType}
                  // type="text"
                  // className="form-control"
                  placeholder="Müqavilə növü"
                  label={employee && "Müqavilə növü"}

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
