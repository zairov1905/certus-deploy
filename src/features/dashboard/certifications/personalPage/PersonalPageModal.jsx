import React, { useEffect, useState } from "react";
import $ from "jquery";
import ModalWrapper from "../../../../app/modal/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import MySearchableSelect from "../../../../app/common/form/MySearchableSelect";
import { Form, Formik } from "formik";
import { closeModal } from "../../../../app/modal/modalReducer";
import { createPersonal, updatePersonal } from "./personalActions";
import { loadSignOfLegalAct } from "../../settings/signOfLegalAct/signOfLegalActActions";
import { loadLab } from "../../labPage/labActions";
import moment from "moment";
import { loadEmployees } from "../../employees/employeesActions";
import { loadTraining } from "../../settings/training/trainingActions";
import { loadOperation } from "../../operationPage/operationActions";

export default function PersonalPageModal({ personal }) {
  const [loader, setLoader] = useState(true);

  useEffect(async () => {
    dispatch(loadTraining());
    dispatch(loadOperation());
    dispatch(loadSignOfLegalAct());
    dispatch(loadLab());
    await dispatch(loadEmployees());
    await setLoader(false);
  }, []);

  const snCodeOptions = [
    { value: 1, label: "01" },
    { value: 2, label: "02" },
    { value: 3, label: "03" },
    { value: 4, label: "04" },

  ];

  const dispatch = useDispatch();
  // ++++++++++++++
  const { trainings } = useSelector((state) => state.trainings);
  const trainingOptions =
    trainings &&
    trainings.map((training) => {
      return {
        label: training.name,
        value: parseInt(training.id),
      };
    });
  // ++++++++++
  const { operations } = useSelector((state) => state.operations);
  const operationOptions =
    operations &&
    operations.map((operation) => {
      return {
        label: `OR${operation.id}`,
        value: parseInt(operation.id),
      };
    });
  // ++++++++++++++
  const { employees } = useSelector((state) => state.employees);
  const trainerNameOptions =
    employees &&
    employees.map((employee) => {
      return {
        value: parseInt(employee.id),
        label: `${employee.name} ${employee.surname}`,
      };
    });

  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = personal
    ? {
        sn_code_id: personal.sn_code_id && personal.sn_code_id,
        registration_number:
          personal.registration_number && personal.registration_number,
        blank_number: personal.blank_number && personal.blank_number,
        serial_number: personal.serial_number && personal.serial_number,
        issue_date:
          personal.issue_date &&
          moment(personal.issue_date).format("YYYY-MM-DD"),
        expiration_date:
          personal.expiration_date &&
          moment(personal.expiration_date).format("YYYY-MM-DD"),
        participant_name:
          personal.participant_name && personal.participant_name,
        trainer_name: personal.trainer_name && personal.trainer_name.id,
        training_id: personal.training_id && personal.training_id.id,
        skill:
          personal.training_id &&
          personal.training_id.skill_id.map((skill) => skill.name),
        product_code: personal.product_code && personal.product_code,
        // normative_document_sign_id: personal.normative_document_sign_id && personal.normative_document_sign_id.id,
        note: personal.note && personal.note,
        operation_id: personal.operation_id && personal.operation_id.id,
      }
    : {
        sn_code_id: "",
        registration_number: "",
        blank_number: "",
        serial_number: "",
        issue_date: "",
        expiration_date: "",
        participant_name: "",
        trainer_name: "",
        training_id: "",
        // skill: [],
        product_code: "",
        // normative_document_sign_id: "",
        note: "",
        // yeni elave edilecek inputlar
        operation_id: "",
      };
  const validationSchema = Yup.object({
    // id:"",
    sn_code_id: Yup.string().required("Mütləq doldurulmalıdır."),
    registration_number: Yup.string().required("Mütləq doldurulmalıdır."),
    blank_number: Yup.string().required("Mütləq doldurulmalıdır."),
    serial_number: Yup.string().required("Mütləq doldurulmalıdır."),
    issue_date: Yup.string().required("Mütləq doldurulmalıdır."),
    expiration_date: Yup.string().required("Mütləq doldurulmalıdır."),
    participant_name: Yup.string().required("Mütləq doldurulmalıdır."),
    trainer_name: Yup.string().required("Mütləq doldurulmalıdır."),
    training_id: Yup.string().required("Mütləq doldurulmalıdır."),
    product_code: Yup.string().required("Mütləq doldurulmalıdır."),

    operation_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // normative_document_sign_id: Yup.string().required(
    //   "Mütləq doldurulmalıdır."
    // ),
  });

  return (
    <ModalWrapper size="modal-lg" header={personal ? "Redakte Et" : "Əlavə et"}>
      {loader ? (
        <div className="loader text-center">
          {" "}
          <div className="loader-content">
            <div className="spinner-grow align-self-center"></div>
          </div>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              personal
                ? await dispatch(updatePersonal({ ...values, id: personal.id }))
                : await dispatch(
                    createPersonal({
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
              <div className="row mb-4">
                <div className="col-md-12 mb-4">
                  <MySearchableSelect
                    id="sn_code_id"
                    name="sn_code_id"
                    type="text"
                    options={snCodeOptions}
                    placeholder="SN kodu daxil edin*"
                    defaultValue={
                      personal && {
                        label: `${personal.sn_code_id}`,
                        value: parseInt(personal.sn_code_id),
                      }
                    }
                    label={personal && "SN kodu*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="registration_number"
                    name="registration_number"
                    type="text"
                    className="form-control"
                    placeholder="Reyestr nömrəsi daxil edin*"
                    label={personal && "Reyestr nömrəsi*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="blank_number"
                    name="blank_number"
                    type="text"
                    className="form-control"
                    placeholder="Blank nömrəsi daxil edin*"
                    label={personal && "Blank nömrəsi*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="serial_number"
                    name="serial_number"
                    type="text"
                    className="form-control"
                    placeholder="Akkreditasiya sahəsində sıra nömrəsi daxil edin*"
                    label={personal && "Akkreditasiya sahəsində sıra nömrəsi*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="issue_date"
                    name="issue_date"
                    type={personal ? "date" : "text"}
                    onFocus={(e) => {
                      e.currentTarget.type = "date";
                      e.currentTarget.focus();
                    }}
                    className="form-control"
                    placeholder="Sertifikatın verilmə tarixi daxil edin*"
                    label={personal && "Sertifikatın verilmə tarixi*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="expiration_date"
                    name="expiration_date"
                    type={personal ? "date" : "text"}
                    onFocus={(e) => {
                      e.currentTarget.type = "date";
                      e.currentTarget.focus();
                    }}
                    className="form-control"
                    placeholder="Sertifikatın qüvvədən düşdüyü tarix daxil edin*"
                    label={personal && "Sertifikatın qüvvədən düşdüyü tarix*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MySearchableSelect
                    id="training_id"
                    name="training_id"
                    options={trainingOptions}
                    defaultValue={
                      personal && {
                        label: personal.training_id.name,
                        value: parseInt(personal.training_id.id),
                      }
                    }
                    type="text"
                    // className="form-control"
                    placeholder="Təlimin adın daxil edin*"
                    label={personal && "Təlimin adı"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MySearchableSelect
                    id="trainer_name"
                    name="trainer_name"
                    type="text"
                    options={trainerNameOptions}
                    defaultValue={
                      personal && {
                        label: `${personal.trainer_name.name} ${personal.trainer_name.surname}`,
                        value: parseInt(personal.trainer_name.id),
                      }
                    }
                    placeholder="Təlimçinin adını daxil edin*"
                    label={personal && "Təlimçinin adı*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="participant_name"
                    name="participant_name"
                    type="text"
                    className="form-control"
                    placeholder="İştirakçı adını daxil edin*"
                    label={personal && "İştirakçı adı*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MySearchableSelect
                    id="operation_id"
                    name="operation_id"
                    options={operationOptions}
                    defaultValue={
                      personal && {
                        label:
                          personal.operation_id &&
                          `OR${personal.operation_id.id}`,
                        value:
                          personal.operation_id &&
                          parseInt(personal.operation_id.id),
                      }
                    }
                    type="text"
                    // className="form-control"
                    placeholder="Aid olduğu əməliyyat*"
                    label={personal && "Aid olduğu əməliyyat*"}
                  />
                </div>

                {personal && (
                  <div className="col-md-12 mb-4">
                    <MyTextInput
                      id="skill"
                      name="skill"
                      type="text"
                      readOnly
                      className="form-control"
                      placeholder="Səriştələr"
                      label={personal && "Səriştələr"}
                    />
                  </div>
                )}

                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="product_code"
                    name="product_code"
                    type="text"
                    className="form-control"
                    placeholder="Xidmətin kodunu daxil edin*"
                    label={personal && "Xidmətin kodu*"}
                  />
                </div>
                {/* <div className="col-md-12 mb-4">
                <MyTextInput
                  id="normative_document_sign_id"
                  name="normative_document_sign_id"
                  type="text"
                  className="form-control"
                  placeholder="Normativ sənədin işarəsini daxil edin"
                    label={personal && "Normativ sənədin işarəsi"}
                />
              </div> */}
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="note"
                    name="note"
                    type="text"
                    className="form-control"
                    placeholder="Qeyd daxil edin"
                    label={personal && "Qeyd"}
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
      )}
    </ModalWrapper>
  );
}
