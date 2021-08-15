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
import { loadCrm } from "../crmPage/crmActions";
import { loadDocs } from "../docPage/docActions";
import { loadEmployees } from "../employees/employeesActions";
import { loadLab } from "../labPage/labActions";
import { loadDocumentTypes } from "../settings/documentType/documentTypeActions";
import { loadExpenseGroup } from "../settings/expenseGroup/expenseGroupActions";
import { loadExpenseType } from "../settings/expenseType/expenseTypeActions";
import { loadOrderSource } from "../settings/orderSource/orderSourceActions";
import { loadReference } from "../settings/reference/referenceActions";
import { loadServiceType } from "../settings/serviceType/serviceTypeActions";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default function OperationPageModal({ operation }) {
  const dispatch = useDispatch();

  useEffect(async () => {
    dispatch(loadServiceType());
    dispatch(loadReference());
    dispatch(loadCrm());
    dispatch(loadOrderSource());
    dispatch(loadEmployees());
    dispatch(loadDocs());
    dispatch(loadLab());
    dispatch(loadExpenseGroup());
    await dispatch(loadExpenseType());
    await setLoader(false);
  }, []);
  const { serviceTypes } = useSelector((state) => state.serviceTypes);
  const { orderSources } = useSelector((state) => state.orderSources);
  const { references } = useSelector((state) => state.references);
  const { crms } = useSelector((state) => state.crms);
  const { employees } = useSelector((state) => state.employees);
  const { labs } = useSelector((state) => state.labs);
  const { docs } = useSelector((state) => state.docs);
  const { expenseGroups } = useSelector((state) => state.expenseGroups);
  const { expenseTypes } = useSelector((state) => state.expenseTypes);
  const [loader, setLoader] = useState(true);

  let serviceTypeOptions = [];
  let orderSourceOptions = [];
  let referenceOptions = [];
  let customerOptions = [];
  let employeeOptions = [];
  let labOptions = [];
  let docOptions = [];
  let expenseGroupOptions = [];
  let expenseTypeOptions = [];

  serviceTypeOptions =
    serviceTypes &&
    serviceTypes.map((serviceType) => {
      return {
        value: parseInt(serviceType.id),
        label: serviceType.name,
      };
    });

  orderSourceOptions =
    orderSources &&
    orderSources.map((orderSource) => {
      return {
        value: parseInt(orderSource.id),
        label: orderSource.name,
      };
    });
  referenceOptions =
    references &&
    references.map((reference) => {
      return {
        value: parseInt(reference.id),
        label: reference.name,
      };
    });
  customerOptions =
    crms &&
    crms.map((crm) => {
      return {
        value: parseInt(crm.id),
        label: crm.customer_name,
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
  labOptions =
    labs &&
    labs.map((lab) => {
      return {
        value: parseInt(lab.id),
        label: lab.name,
      };
    });
  docOptions =
    docs &&
    docs.map((doc) => {
      return {
        value: parseInt(doc.id),
        label: doc.document_number,
      };
    });
  expenseGroupOptions =
    expenseGroups &&
    expenseGroups.map((expenseGroup) => {
      return {
        value: parseInt(expenseGroup.id),
        label: expenseGroup.name,
      };
    });
  expenseTypeOptions =
    expenseTypes &&
    expenseTypes.map((expenseType) => {
      return {
        value: parseInt(expenseType.id),
        label: expenseType.name,
      };
    });
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });
  const [addedStudents, setAddedStudents] = useState([]);
  let mapAddedStudents = addedStudents;
  const handleAddStudent = () => {
    setAddedStudents([...addedStudents, { studentName: "" }]);
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
    ? {
        number: operation.number && operation.number,
        service_type_id:
          operation.service_type_id && operation.service_type_id.id,

        customer_id: operation.customer_id && operation.customer_id.id,
        order_source_id:
          operation.order_source_id && operation.order_source_id.id,
        reference_id: operation.reference_id && operation.reference_id.id,
        date: operation.date && operation.date,
        description: operation.description && operation.description,
        employee_id: operation.employee_id && operation.employee_id.id,
        document_id: operation.document_id && operation.document_id.id,
        faktura_id: operation.faktura_id && operation.faktura_id.id,
        amount: operation.amount,
        lab_id: operation.lab_id && operation.lab_id.id,
        income_expense_group_id:
          operation.income_expense_group_id &&
          operation.income_expense_group_id.id,
        expense_type_id:
          operation.expense_type_id && operation.expense_type_id.id,
        bonus: operation.bonus,

        performans: operation.performans && operation.performans,
      }
    : {
        number: "",
        service_type_id: "",
        customer_id: "",
        order_source_id: "",
        reference_id: "",
        date: "",
        description: "",
        employee_id: "",
        document_id: "",
        faktura_id: "",
        amount: "",
        lab_id: "",
        income_expense_group_id: "",
        expense_type_id: "",
        bonus: "",

        performans: "",
      };
  const validationSchema = Yup.object({
    number: Yup.string().required("Mütləq doldurulmalıdır."),
    service_type_id: Yup.string().required("Mütləq doldurulmalıdır."),
    customer_id: Yup.string().required("Mütləq doldurulmalıdır."),
    order_source_id: Yup.string().required("Mütləq doldurulmalıdır."),
    reference_id: Yup.string().required("Mütləq doldurulmalıdır."),
    date: Yup.string().required("Mütləq doldurulmalıdır."),
    description: Yup.string().required("Mütləq doldurulmalıdır."),
    employee_id: Yup.string().required("Mütləq doldurulmalıdır."),
    document_id: Yup.string().required("Mütləq doldurulmalıdır."),
    faktura_id: Yup.string().required("Mütləq doldurulmalıdır."),
    amount:"",
    lab_id: Yup.string().required("Mütləq doldurulmalıdır."),
    income_expense_group_id: Yup.string().required("Mütləq doldurulmalıdır."),
    expense_type_id: Yup.string().required("Mütləq doldurulmalıdır."),
    bonus: Yup.string().required("Mütləq doldurulmalıdır."),
    performans: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper
      size="modal-lg"
      header={operation ? "Redakte Et" : "Əlavə et"}
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
              operation
                ? await dispatch(updateOperation({...values,id:operation.id}))
                : await dispatch(createOperation({ ...values}));
              setSubmitting(false);
              // operation
              //   ? toast.success("Dəyişiklik uğurlar yerinə yetirildi")
              //   : toast.success("Uğurla əlavə edildi");
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
              <div className={`row ${operation && "mb-4"}`}>
                <div className="col-md-4">
                  <MyTextInput
                    id="number"
                    name="number"
                    type="text"
                    className="form-control"
                    placeholder="Sifariş Nömrəsi"
                    label={operation && "Sifariş Nömrəsi"}

                  />
                </div>
                <div className="col-md-4">
                  <MySearchableSelect
                    // defaultValue={
                    //   operation &&
                    //   customerOptions.filter(
                    //     (customerOption) =>
                    //       customerOption.value === operation.customer_id.id
                    //   )
                    // }
                    defaultValue={
                      operation && {
                        value: parseInt(operation.customer_id.id),
                        label: operation.customer_id.customer_name,
                      }
                    }
                    id="customer_id"
                    name="customer_id"
                    type="text"
                    options={customerOptions}
                    // className="form-control"
                    placeholder="Müştəri"
                    label={operation && "Müştəri"}

                  />
                </div>
                <div className="col-md-4">
                  <MySearchableSelect
                    // defaultValue={
                    //   operation &&
                    //   serviceTypeOptions.filter(
                    //     (serviceTypeOption) =>
                    //       serviceTypeOption.value ===
                    //       operation.service_type_id.id
                    //   )
                    // }
                    defaultValue={
                      operation && {
                        value: parseInt(operation.service_type_id.id),
                        label: operation.service_type_id.name,
                      }
                    }
                    id="service_type_id"
                    name="service_type_id"
                    type="text"
                    options={serviceTypeOptions}
                    label={operation && "Xidmət Növü"}

                    // className="form-control"
                    placeholder="Xidmət Növü"
                  />
                </div>
              </div>
              <div className={`row ${operation && "mb-4"}`}>
                <div className="col-md-4">
                  <MySearchableSelect
                    // defaultValue={
                    //   operation &&
                    //   orderSourceOptions.filter(
                    //     (orderSourceOption) =>
                    //       orderSourceOption.value ===
                    //       operation.order_source_id.id
                    //   )
                    // }
                    defaultValue={
                      operation && {
                        value: parseInt(operation.order_source_id.id),
                        label: operation.order_source_id.name,
                      }
                    }
                    id="order_source_id"
                    name="order_source_id"
                    type="text"
                    options={orderSourceOptions}
                    // className="form-control"
                    placeholder="Sifariş Mənbəyi"
                    label={operation && "Sifariş Mənbəyi"}

                  />
                </div>
                <div className="col-md-4">
                  <MySearchableSelect
                    // defaultValue={
                    //   operation &&
                    //   referenceOptions.filter(
                    //     (referenceOption) =>
                    //       referenceOption.value === operation.reference_id.id
                    //   )
                    // }
                    defaultValue={
                      operation && {
                        value: parseInt(operation.reference_id.id),
                        label: operation.reference_id.name,
                      }
                    }
                    name="reference_id"
                    id="reference_id"
                    type="text"
                    options={referenceOptions}
                    // className="form-control"
                    placeholder="Referans"
                    label={operation && "Referans"}

                  />
                </div>
                <div className="col-md-4">
                  <MyTextInput
                    name="date"
                    id="date"
                    type="date"
                    // onFocus={(e) => (e.target.type = "date")}
                    className="form-control"
                    placeholder="Əməliyyat tarixi"
                    label={operation && "Əməliyyat tarixi"}

                  />
                </div>
              </div>
              <div className={`row ${operation && "mb-4"}`}>
                <div className="col-md-12">
                  <MyTextArea
                    name="description"
                    id="description"
                    type="text"
                    className="form-control"
                    placeholder="Sifariş Təyinatı"
                    label={operation && "Sifariş Təyinatı"}

                  />
                </div>
              </div>

              <div className={`row ${operation && "mb-4"}`}>
                <div className="col-md-12">
                  <MySearchableSelect
                    // defaultValue={
                    //   operation &&
                    //   employeeOptions.filter(
                    //     (employeeOption) =>
                    //       employeeOption.value === operation.employee_id.id
                    //   )
                    // }
                    defaultValue={
                      operation && {
                        value: parseInt(operation.employee_id.id),
                        label: operation.employee_id.name,
                      }
                    }
                    name="employee_id"
                    id="employee_id"
                    type="text"
                    options={employeeOptions}
                    // className="form-control"
                    label={operation && "İcraçı"}

                    placeholder="İcraçı"
                  />
                </div>
              </div>
              <div className={`row ${operation && "mb-4"}`}>
                <div className="col-md-4">
                  <MySearchableSelect
                    defaultValue={
                      operation &&
                      docOptions.filter(
                        (docOption) =>
                          docOption.value ===
                          (operation.document_id && operation.document_id.id)
                      )
                    }
                    name="document_id"
                    id="document_id"
                    type="text"
                    options={docOptions}
                    // className="form-control"
                    placeholder="Müqavilə"
                    label={operation && "Müqavilə"}

                  />
                </div>
                <div className="col-md-4">
                  <MySearchableSelect
                    defaultValue={docOptions.filter(
                      (docOption) =>
                        docOption.value ===
                        (operation.document_id && operation.document_id.id)
                    )}
                    // }
                    name="faktura_id"
                    id="faktura_id"
                    type="text"
                    options={docOptions}
                    // className="form-control"
                    placeholder="Hesab faktura"
                    label={operation && "Hesab faktura"}

                  />
                </div>
                <div className="col-md-4">
                  <MyTextInput
                    name="amount"
                    id="amount"
                    type="text"
                    className="form-control"
                    placeholder="Məbləğ"
                    label={operation && "Məbləğ"}

                  />
                </div>
              </div>

              <div className={`row ${operation && "mb-4"}`}>
                <div className="col-md-4">
                  <MySearchableSelect
                    defaultValue={
                      operation &&
                      labOptions.filter(
                        (labOption) =>
                          labOption.value ===
                          (operation.lab_id && operation.lab_id.id)
                      )
                    }
                    name="lab_id"
                    id="lab_id"
                    type="text"
                    options={labOptions}
                    // className="form-control"
                    placeholder="Laboratoriya"
                    label={operation && "Laboratoriya"}

                  />
                </div>
                <div className="col-md-4">
                  <MySearchableSelect
                    defaultValue={
                      operation &&
                      expenseGroupOptions.filter(
                        (expenseGroupOption) =>
                          expenseGroupOption.value ===
                          (operation.income_expense_group_id &&
                            operation.income_expense_group_id.id)
                      )
                    }
                    name="income_expense_group_id"
                    id="income_expense_group_id"
                    type="text"
                    options={expenseGroupOptions}
                    // className="form-control"
                    placeholder="Xərc qrupu"
                    label={operation && "Xərc qrupu"}

                  />
                </div>
                <div className="col-md-4">
                  <MySearchableSelect
                    defaultValue={
                      operation &&
                      expenseTypeOptions.filter(
                        (expenseTypeOption) =>
                          expenseTypeOption.value ===
                          (operation.expense_type_id &&
                            operation.expense_type_id.id)
                      )
                    }
                    name="expense_type_id"
                    id="expense_type_id"
                    type="text"
                    options={expenseTypeOptions}
                    // className="form-control"
                    placeholder="Xərc tipi"
                    label={operation && "Xərc tipi"}

                  />
                </div>
              </div>
              <div className={`row ${operation && "mb-4"}`}>
                <div className="col-md-6">
                  <MyTextInput
                    name="bonus"
                    id="bonus"
                    type="text"
                    className="form-control"
                    placeholder="İcracı bonusu"
                    label={operation && "İcracı bonusu"}

                  />
                </div>
                <div className="col-md-6">
                  <MyTextInput
                    name="performans"
                    id="performans"
                    type="text"
                    className="form-control"
                    placeholder="Performans"
                    label={operation && "Performans"}

                  />
                </div>
              </div>
              {values.serviceType === "0" && (
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
                  <div className={`row ${operation && "mb-4"}`}>
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
              )}
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
