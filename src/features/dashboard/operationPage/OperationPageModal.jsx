import React, { useEffect, useState } from "react";
import $ from "jquery";

import ModalWrapper from "../../../app/modal/ModalWrapper";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { createOperation, updateOperation } from "./operationActions";
import { closeModal } from "../../../app/modal/modalReducer";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default function OperationPageModal({ operation }) {
  const { serviceTypes } = useSelector((state) => state.serviceTypes);
  const { orderSources } = useSelector((state) => state.orderSources);
  const { references } = useSelector((state) => state.references);
  const { employees } = useSelector((state) => state.employees);
  const { labs } = useSelector((state) => state.labs);
  const { docs } = useSelector((state) => state.docs);
  const { expenseGroups } = useSelector((state) => state.expenseGroups);
  const { expenseTypes } = useSelector((state) => state.expenseTypes);
  let serviceTypeOptions = [];
  let orderSourceOptions = [];
  let referenceOptions = [];
  let employeeOptions = [];
  let labOptions = [];
  let docOptions = [];
  let expenseGroupOptions = [];
  let expenseTypeOptions = [];

  serviceTypeOptions =
    serviceTypes &&
    serviceTypes.map((serviceType) => {
      return {
        value: `${serviceType.id}`,
        label: `${serviceType.serviceTypeName}`,
      };
    });

  orderSourceOptions =
    orderSources &&
    orderSources.map((orderSource) => {
      return {
        value: `${orderSource.orderSourceName}`,
        label: `${orderSource.orderSourceName}`,
      };
    });
  referenceOptions =
    references &&
    references.map((reference) => {
      return {
        value: `${reference.referenceName}`,
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
  labOptions =
    labs &&
    labs.map((lab) => {
      return {
        value: `${lab.labName}`,
        label: `${lab.labName}`,
      };
    });
  docOptions =
    docs &&
    docs.map((doc) => {
      return {
        value: `${doc.docType}`,
        label: `${doc.docType}`,
      };
    });
  expenseGroupOptions =
    expenseGroups &&
    expenseGroups.map((expenseGroup) => {
      return {
        value: `${expenseGroup.expenseGroupName}`,
        label: `${expenseGroup.expenseGroupName}`,
      };
    });
  expenseTypeOptions =
    expenseTypes &&
    expenseTypes.map((expenseType) => {
      return {
        value: `${expenseType.expenseTypeName}`,
        label: `${expenseType.expenseTypeName}`,
      };
    });
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });
  const [addedStudents, setAddedStudents] = useState([]);
  let mapAddedStudents = addedStudents;
  const handleAddStudent = () => {
    setAddedStudents([...addedStudents, {  studentName: "" }]);
  };
  const handleRemoveStudent = () => {
    if (addedStudents.length > 1) {
      let lastIndex = addedStudents.length - 1;
      let values = [...addedStudents];
      values.splice(lastIndex, 1);
      setAddedStudents(values);
    }
  };
  const initialValues = operation
    ? operation
    : {
        id: "",
        orderNumber: "",
        serviceType: "",
        orderSource: "",
        oderAppointment: "",
        orderReference: "",
        operationDate: "",
        orderNote: "",
        /////
        executor: "",
        contractNumber: "",
        invoice: "",
        sum: "",
        lab: "",
        expenseGroup: "",
        expenseType: "",
        executorBonus: "",
        performance: "",
        students:addedStudents
      };
  const validationSchema = Yup.object({
    orderNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    serviceType: Yup.string().required("Mütləq doldurulmalıdır."),
    orderSource: Yup.string().required("Mütləq doldurulmalıdır."),
    oderAppointment: Yup.string().required("Mütləq doldurulmalıdır."),
    orderReference: Yup.string().required("Mütləq doldurulmalıdır."),
    operationDate: Yup.string().required("Mütləq doldurulmalıdır."),

    ////////
    executor: Yup.string().required("Mütləq doldurulmalıdır."),
    contractNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    invoice: Yup.string().required("Mütləq doldurulmalıdır."),
    sum: Yup.string().required("Mütləq doldurulmalıdır."),
    lab: Yup.string().required("Mütləq doldurulmalıdır."),
    expenseGroup: Yup.string().required("Mütləq doldurulmalıdır."),
    expenseType: Yup.string().required("Mütləq doldurulmalıdır."),
    executorBonus: Yup.string().required("Mütləq doldurulmalıdır."),
    performance: Yup.string().required("Mütləq doldurulmalıdır."),
  });
  return (
    <ModalWrapper
      size="modal-lg"
      header={operation ? "Redakte Et" : "Əlavə et"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            operation
              ? await dispatch(updateOperation(values))
              : await dispatch(createOperation({ ...values, id: cuid() }));
            setSubmitting(false);
            operation
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
        {({ isSubmitting, isValid, dirty, errors, values }) => (
          <Form id="emp">

            <div className="row">
              <div className="col-md-6">
                <MyTextInput
                  id="orderNumber"
                  name="orderNumber"
                  type="text"
                  className="form-control"
                  placeholder="Sifariş Nömrəsi"
                />
              </div>
              <div className="col-md-6">
                <MySearchableSelect
                  defaultValue={
                    operation &&
                    serviceTypeOptions.filter(
                      (serviceTypeOption) =>
                        serviceTypeOption.value === operation.serviceType
                    )
                  }
                  id="serviceType"
                  name="serviceType"
                  type="text"
                  options={serviceTypeOptions}
                  // className="form-control"
                  placeholder="Xidmət Növü"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MySearchableSelect
                  defaultValue={
                    operation &&
                    orderSourceOptions.filter(
                      (orderSourceOption) =>
                        orderSourceOption.value === operation.orderSource
                    )
                  }
                  id="orderSource"
                  name="orderSource"
                  type="text"
                  options={orderSourceOptions}
                  // className="form-control"
                  placeholder="Sifariş Mənbəyi"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  defaultValue={
                    operation &&
                    referenceOptions.filter(
                      (referenceOption) =>
                        referenceOption.value === operation.orderReference
                    )
                  }
                  name="orderReference"
                  id="orderReference"
                  type="text"
                  options={referenceOptions}
                  // className="form-control"
                  placeholder="Referans"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="operationDate"
                  id="operationDate"
                  type="text"
                  onFocus={(e) => (e.target.type = "date")}
                  className="form-control"
                  placeholder="Əməliyyat tarixi"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <MyTextArea
                  name="oderAppointment"
                  id="oderAppointment"
                  type="text"
                  className="form-control"
                  placeholder="Sifariş Təyinatı"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <MySearchableSelect
                  // defaultValue={
                  //   operation &&
                  //   employeeOptions.filter(
                  //     (referenceOption) =>
                  //       referenceOption.value === operation.orderReference
                  //   )
                  // }
                  name="executor"
                  id="executor"
                  type="text"
                  options={employeeOptions}
                  // className="form-control"
                  placeholder="İcraçı"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MySearchableSelect
                  // defaultValue={
                  //   operation &&
                  //   referenceOptions.filter(
                  //     (referenceOption) =>
                  //       referenceOption.value === operation.orderReference
                  //   )
                  // }
                  name="contractNumber"
                  id="contractNumber"
                  type="text"
                  options={docOptions}
                  // className="form-control"
                  placeholder="Müqavilə"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  // defaultValue={
                  //   operation &&
                  //   referenceOptions.filter(
                  //     (referenceOption) =>
                  //       referenceOption.value === operation.orderReference
                  //   )
                  // }
                  name="invoice"
                  id="invoice"
                  type="text"
                  options={docOptions}
                  // className="form-control"
                  placeholder="Hesab faktura"
                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="sum"
                  id="sum"
                  type="text"
                  className="form-control"
                  placeholder="Məbləğ"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <MySearchableSelect
                  // defaultValue={
                  //   operation &&
                  //   referenceOptions.filter(
                  //     (referenceOption) =>
                  //       referenceOption.value === operation.orderReference
                  //   )
                  // }
                  name="lab"
                  id="lab"
                  type="text"
                  options={labOptions}
                  // className="form-control"
                  placeholder="Laboratoriya"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  // defaultValue={
                  //   operation &&
                  //   referenceOptions.filter(
                  //     (referenceOption) =>
                  //       referenceOption.value === operation.orderReference
                  //   )
                  // }
                  name="expenseGroup"
                  id="expenseGroup"
                  type="text"
                  options={expenseGroupOptions}
                  // className="form-control"
                  placeholder="Xərc qrupu"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  // defaultValue={
                  //   operation &&
                  //   referenceOptions.filter(
                  //     (referenceOption) =>
                  //       referenceOption.value === operation.orderReference
                  //   )
                  // }
                  name="expenseType"
                  id="expenseType"
                  type="text"
                  options={expenseTypeOptions}
                  // className="form-control"
                  placeholder="Xərc tipi"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <MyTextInput
                  name="executorBonus"
                  id="executorBonus"
                  type="text"
                  className="form-control"
                  placeholder="İcracı bonusu"
                />
              </div>
              <div className="col-md-6">
                <MyTextInput
                  name="performance"
                  id="performance"
                  type="text"
                  className="form-control"
                  placeholder="Performans"
                />
              </div>
            </div>
            {values.serviceType === '0' && 
                        <div className="student mt-5">
                        <div className="row">
                          <div className="col-md-2 offset-10 text-right">
                            <div className="icon-container">
                              <button
                                type="button"
                                className="close"
                                onClick={() => handleAddStudent()}
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
                                onClick={() => handleRemoveStudent()}
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
                          {mapAddedStudents &&
                            mapAddedStudents.map((mapAddedStudent, index) => (
                              <React.Fragment key={index}>
                                <div className="col-md-12">
                                  <MyTextInput
                                    id={`students.${index}.studentName`}
                                    name={`students.${index}.studentName`}
                                    type="text"
                                    className="form-control"
                                    placeholder="İştirakçı adı"
                                  />
                                </div>
          
                              </React.Fragment>
                            ))}
                        </div>
                      </div>
                      
            }
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
