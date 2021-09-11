import React, { useEffect, useState } from "react";
import $ from "jquery";
import ModalWrapper from "../../../../app/modal/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import MySearchableSelect from "../../../../app/common/form/MySearchableSelect";
import { Form, Formik } from "formik";
import { closeModal } from "../../../../app/modal/modalReducer";
import {
  createControlSystem,
  updateControlSystem,
} from "./controlSystemActions";
import { loadSignOfLegalAct } from "../../settings/signOfLegalAct/signOfLegalActActions";
import { loadLab } from "../../labPage/labActions";
import { loadCrm } from "../../crmPage/crmActions";
import moment from "moment";
import MyTextArea from "../../../../app/common/form/MyTextArea";
import { loadOperation } from "../../operationPage/operationActions";

export default function ControlSystemPageModal({ controlSystem }) {
  const [loader, setLoader] = useState(true);

  useEffect(async () => {
    dispatch(loadCrm());
    dispatch(loadLab());
    dispatch(loadOperation());
    await dispatch(loadSignOfLegalAct());
    await setLoader(false);
  }, []);
  const snCodeOptions = [
    { value: 1, label: "01" },
    { value: 2, label: "02" },
    { value: 3, label: "03" },
  ];

  const dispatch = useDispatch();
  // ++++++++++++++
  const { signOfLegalActs } = useSelector((state) => state.signOfLegalActs);
  const signOfLegalActOptions =
    signOfLegalActs &&
    signOfLegalActs.map((signOfLegalAct) => {
      return {
        label: signOfLegalAct.name,
        value: parseInt(signOfLegalAct.id),
      };
    });

  // ++++++++++++++
  const { crms } = useSelector((state) => state.crms);
  let customerOptions =
    crms &&
    crms.map((crm) => {
      return {
        value: parseInt(crm.id),
        label: crm.customer_name,
      };
    });
  // ++++++++++++++
  const { operations } = useSelector((state) => state.operations);
  const operationOptions =
    operations &&
    operations.map((operation) => {
      return {
        label: `OR${operation.id}`,
        value: parseInt(operation.id),
      };
    });
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = controlSystem
    ? {
        sn_code_id: controlSystem.sn_code_id && controlSystem.sn_code_id,
        registration_number:
          controlSystem.registration_number &&
          controlSystem.registration_number,
        blank_number: controlSystem.blank_number && controlSystem.blank_number,
        serial_number:
          controlSystem.serial_number && controlSystem.serial_number,
        issue_date:
          controlSystem.issue_date &&
          moment(controlSystem.issue_date).format("YYYY-MM-DD"),
        expiration_date:
          controlSystem.expiration_date &&
          moment(controlSystem.expiration_date).format("YYYY-MM-DD"),
        customer_id: controlSystem.customer_id && controlSystem.customer_id.id,
        // only customer_id den gelecek data
        legalStatus:
          controlSystem.customer_id &&
          controlSystem.customer_id.legal_status_id,
        VOEN: controlSystem.customer_id && controlSystem.customer_id.voen,
        economicEntityPhoneNumber:
          controlSystem.customer_id && controlSystem.customer_id.customer_phone,
        legalAddressOfTheBusinessEntity:
          controlSystem.customer_id && controlSystem.customer_id.legal_adress,
        actualAddressOfTheBusiness:
          controlSystem.customer_id && controlSystem.customer_id.actual_adress,
        //
        product_name: controlSystem.product_name && controlSystem.product_name,
        product_code: controlSystem.product_code && controlSystem.product_code,
        act_sign_id:
          controlSystem.act_sign_id && JSON.parse(controlSystem.act_sign_id),
        test_id: controlSystem.test_id && controlSystem.test_id,
        test_number: controlSystem.test_number && controlSystem.test_number,
        product_batch_date:
          controlSystem.product_batch_date &&
          moment(controlSystem.product_batch_date).format("YYYY-MM-DD"),

        note: controlSystem.note && controlSystem.note,

        // new
        operation_id:
          controlSystem.operation_id && controlSystem.operation_id.id,
      }
    : {
        sn_code_id: "",
        registration_number: "",
        blank_number: "",
        serial_number: "",
        issue_date: "",
        expiration_date: "",
        customer_id: "",
        // only customer_id den gelecek data

        // legalStatus: "",
        // VOEN: "",
        // economicEntityPhoneNumber: "",
        // legalAddressOfTheBusinessEntity: "",
        // actualAddressOfTheBusiness: "",
        product_name: "",
        product_code: "",
        act_sign_id: "",
        test_id: "",
        test_number: "",
        product_batch_date: "",
        note: "",
        // new
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
    customer_id: Yup.string().required("Mütləq doldurulmalıdır."),
    product_name: Yup.string().required("Mütləq doldurulmalıdır."),
    product_code: Yup.string().required("Mütləq doldurulmalıdır."),
    act_sign_id: Yup.number().required("Mütləq doldurulmalıdır."),
    operation_id: Yup.number().required("Mütləq doldurulmalıdır."),

    // certificateIsRecognized: Yup.string().required("Mütləq doldurulmalıdır."),
    // test_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // test_number: Yup.string().required("Mütləq doldurulmalıdır."),
    // product_batch_date: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper
      size="modal-lg"
      header={controlSystem ? "Redakte Et" : "Əlavə et"}
    >
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
              controlSystem
                ? await dispatch(
                    updateControlSystem({ ...values, id: controlSystem.id })
                  )
                : await dispatch(
                    createControlSystem({
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
                    defaultValue={
                      controlSystem && {
                        label: `0${controlSystem.sn_code_id}`,
                        value: parseInt(controlSystem.sn_code_id),
                      }
                    }
                    placeholder="SN kodu daxil edin*"
                    label={controlSystem && "SN kodu*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="registration_number"
                    name="registration_number"
                    type="text"
                    className="form-control"
                    placeholder="Reyestr nömrəsi daxil edin*"
                    label={controlSystem && "Reyestr nömrəsi*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="blank_number"
                    name="blank_number"
                    type="text"
                    className="form-control"
                    placeholder="Blank nömrəsi daxil edin*"
                    label={controlSystem && "Blank nömrəsi*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="serial_number"
                    name="serial_number"
                    type="text"
                    className="form-control"
                    placeholder="Akkreditasiya sahəsində sıra nömrəsi daxil edin*"
                    label={
                      controlSystem && "Akkreditasiya sahəsində sıra nömrəsi*"
                    }
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="issue_date"
                    name="issue_date"
                    type={controlSystem ? "date" : "text"}
                    onFocus={(e) => {
                      e.currentTarget.type = "date";
                      e.currentTarget.focus();
                    }}
                    className="form-control"
                    placeholder="Sertifikatın verilmə tarixi daxil edin*"
                    label={controlSystem && "Sertifikatın verilmə tarixi*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="expiration_date"
                    name="expiration_date"
                    type={controlSystem ? "date" : "text"}
                    onFocus={(e) => {
                      e.currentTarget.type = "date";
                      e.currentTarget.focus();
                    }}
                    className="form-control"
                    placeholder="Sertifikatın qüvvədən düşdüyü tarix daxil edin*"
                    label={
                      controlSystem && "Sertifikatın qüvvədən düşdüyü tarix*"
                    }
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MySearchableSelect
                    id="customer_id"
                    name="customer_id"
                    type="text"
                    options={customerOptions}
                    defaultValue={
                      controlSystem && {
                        label: `${
                          controlSystem.customer_id
                            ? controlSystem.customer_id.customer_name
                            : "Təyin edilməyib"
                        }`,
                        value: parseInt(
                          controlSystem.customer_id &&
                            controlSystem.customer_id.id
                        ),
                      }
                    }
                    // className="form-control"
                    placeholder="Sertifikat təqdim edilən təsərrüfat subyektinin adını daxil edin*"
                    label={
                      controlSystem &&
                      "Sertifikat təqdim edilən təsərrüfat subyektinin adı*"
                    }
                  />
                </div>
                {controlSystem && (
                  <React.Fragment>
                    <div className="col-md-12 mb-4">
                      <MyTextInput
                        id="legalStatus"
                        name="legalStatus"
                        type="text"
                        readOnly
                        className="form-control"
                        placeholder="Hüquqi statusunu daxil edin"
                        label={controlSystem && "Hüquqi statusu"}
                      />
                    </div>
                    <div className="col-md-12 mb-4">
                      <MyTextInput
                        id="VOEN"
                        name="VOEN"
                        type="text"
                        readOnly
                        className="form-control"
                        placeholder="VÖEN daxil edin"
                        label={controlSystem && "VÖEN"}
                      />
                    </div>
                    <div className="col-md-12 mb-4">
                      <MyTextInput
                        id="economicEntityPhoneNumber"
                        name="economicEntityPhoneNumber"
                        type="text"
                        readOnly
                        className="form-control"
                        placeholder="Təsərrüfat subyektinin rəhbərinin telefon nömrəsini daxil edin"
                        label={
                          controlSystem &&
                          "Təsərrüfat subyektinin rəhbərinin telefon nömrəsi"
                        }
                      />
                    </div>
                    <div className="col-md-12 mb-4">
                      <MyTextInput
                        id="legalAddressOfTheBusinessEntity"
                        name="legalAddressOfTheBusinessEntity"
                        type="text"
                        readOnly
                        className="form-control"
                        placeholder="Sertifikat təqdim edilən təsərrüfat subyektinin hüquqi ünvanını daxil edin"
                        label={
                          controlSystem &&
                          "Sertifikat təqdim edilən təsərrüfat subyektinin hüquqi ünvanı"
                        }
                      />
                    </div>
                    <div className="col-md-12 mb-4">
                      <MyTextInput
                        id="actualAddressOfTheBusiness"
                        name="actualAddressOfTheBusiness"
                        type="text"
                        readOnly
                        className="form-control"
                        placeholder="Sertifikat təqdim edilən təsərrüfat subyektinin faktiki ünvanını daxil edin"
                        label={
                          controlSystem &&
                          "Sertifikat təqdim edilən təsərrüfat subyektinin faktiki ünvanı"
                        }
                      />
                    </div>
                  </React.Fragment>
                )}

                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="product_name"
                    name="product_name"
                    type="text"
                    className="form-control"
                    placeholder="Xidmətin adını daxil edin*"
                    label={controlSystem && "Xidmətin adı*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MySearchableSelect
                    id="operation_id"
                    name="operation_id"
                    options={operationOptions}

                    defaultValue={
                      controlSystem && {
                        label:
                        controlSystem.operation_id &&
                          `OR${controlSystem.operation_id.id}`,
                        value: controlSystem.operation_id &&  parseInt(controlSystem.operation_id.id),
                      }
                    }
                    type="text"
                    // className="form-control"
                    placeholder="Aid olduğu əməliyyat*"
                    label={controlSystem && "Aid olduğu əməliyyat*"}
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="product_code"
                    name="product_code"
                    type="text"
                    className="form-control"
                    placeholder="Xidmətin kodunu daxil edin*"
                    label={controlSystem && "Xidmətin kodu*"}
                  />
                </div>

                <div className="col-md-12 mb-4">
                  <MySearchableSelect
                    id="act_sign_id"
                    name="act_sign_id"
                    isMulti
                    type="text"
                    options={signOfLegalActOptions}
                    defaultValue={
                      controlSystem &&
                      signOfLegalActOptions.filter((signOfLegalActOption) =>
                        JSON.parse(controlSystem.act_sign_id).includes(
                          parseInt(signOfLegalActOption.value)
                        )
                      )
                    }
                    // className="form-control"
                    placeholder="Hüquqi normativ texniki aktın işarəsini daxil edin*"
                    label={
                      controlSystem && "Hüquqi normativ texniki aktın işarəsi*"
                    }
                  />
                </div>
                <div className="col-md-12 mb-4">
                  <MyTextArea
                    id="note"
                    name="note"
                    type="text"
                    className="form-control"
                    placeholder="Qeyd"
                    label={controlSystem && "Qeyd"}
                    label="Qeyd"
                  />
                </div>
                {/* <div className="col-md-12 mb-4">
                  <MySearchableSelect
                    id="test_id"
                    name="test_id"
                    type="text"
                    options={recognitionProcessNoteOptions}
                    defaultValue={
                      controlSystem &&
                      recognitionProcessNoteOptions.filter(
                        (recognitionProcessNoteOption) =>
                          parseInt(recognitionProcessNoteOption.value) ===
                          parseInt(controlSystem.test_id)
                      )
                    }
                    // className="form-control"
                    placeholder="Tanınma prosesində auditin aparılması haqqında qeydi daxil edin"
                    label={controlSystem && "Tanınma prosesində auditin aparılması haqqında qeyd"}
                  />
                </div>

                <div className="col-md-12 mb-4">
                  <MyTextInput
                    id="test_number"
                    name="test_number"
                    type="text"
                    className="form-control"
                    placeholder="Aparılmış sınaqların miqdarını edin"
                    label={controlSystem && "Aparılmış sınaqların miqdarı"}
                  />
                </div>
                <div className="col-md-12">
                  <MyTextInput
                    id="product_batch_date"
                    name="product_batch_date"
                    type="date"
                    className="form-control"
                    placeholder="Məhsul partiyasının tarixini edin"
                    label={controlSystem && "Məhsul partiyasının tarixi"}
                  />
                </div>
               */}
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
