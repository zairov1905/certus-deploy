import React, { useEffect, useState } from "react";
import $ from "jquery";

import ModalWrapper from "../../../app/modal/ModalWrapper";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { createExpense, updateExpense } from "./expenseActions";
import { closeModal } from "../../../app/modal/modalReducer";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import moment from "moment";

export default function ExpensePageModal({ expense }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { expenseGroups } = useSelector((state) => state.expenseGroups);
  const { expenseTypes } = useSelector((state) => state.expenseTypes);
  const { counterparties } = useSelector((state) => state.counterparties);
  const { docs } = useSelector((state) => state.docs);
  // OPTIONS XERC qruplari
  const expenseGroupsOptions =
    expenseGroups &&
    expenseGroups.map((expenseGroup) => {
      return {
        label: expenseGroup.name,
        value: expenseGroup.id,
      };
    });
  // Options xerc novleri
  const expenseTypesOptions =
    expenseTypes &&
    expenseTypes.map((expenseType) => {
      return {
        label: expenseType.name,
        value: expenseType.id,
      };
    });
  //Options Kontragent
  const counterpartiesOptions =
    counterparties &&
    counterparties.map((counterparty) => {
      return {
        label: counterparty.name,
        value: counterparty.id,
      };
    });
  //Options Sened
  const docsOptions =
    docs &&
    docs.map((doc) => {
      return {
        label: doc.document_number,
        value: doc.id,
      };
    });

  // options əməliyyat növü

  const operationTypeOptions = [
    { label: "Gəlir", value: 1 },
    { label: "Xərc", value: 0 },
  ];

  // options ödəniş
  const paymentOptions = [
    { label: "Rəsmi", value: 0 },
    { label: "Qeyri rəsmi", value: 1 },
  ];

  // options ödəniş tipi
  const paymentTypeOptions = [
    { label: "Bank", value: 1 },
    { label: "Kassa", value: 2 },
    { label: "Nəğd", value: 3 },
  ];
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });
  

  const initialValues = expense
    ? {
      income_expense_group_id: expense.income_expense_group_id && expense.income_expense_group_id.id,
      expense_type_id: expense.expense_type_id && expense.expense_type_id.id,
      date: expense.date && moment(expense.date).format("YYYY-MM-DD"),
      contractor_id: expense.contractor_id && expense.contractor_id.id,
      document_id: expense.document_id && expense.document_id.id,
      // expenseInvoice: "",
      operation_id: expense.operation_id && expense.operation_id,
      payment_id: expense.payment_id && expense.payment_id,
      payment_type_id: expense.payment_type_id && expense.payment_type_id,
      faktura: expense.faktura && expense.faktura,
    }
    : {
        income_expense_group_id: "",
        expense_type_id: "",
        date: "",
        contractor_id: "",
        document_id: "",
        // expenseInvoice: "",
        operation_id: "",
        payment_id: "",
        payment_type_id: "",
        faktura: "",
      };
  const validationSchema = Yup.object({
    income_expense_group_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // expense_type_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // date: Yup.string().required("Mütləq doldurulmalıdır."),
    // contractor_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // document_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // // expenseInvoice: Yup.string().required("Mütləq doldurulmalıdır."),
    // operation_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // payment_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // payment_type_id: Yup.string().required("Mütləq doldurulmalıdır."),
    // faktura: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper size="modal-lg" header={expense ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            expense
              ? await dispatch(updateExpense({...values, id:expense.id}))
              : await dispatch(createExpense({ ...values }));
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
            <div className={`row ${expense && "mb-4"}`}>
              <div className="col-md-6">
                <MySearchableSelect
                  id="income_expense_group_id"
                  name="income_expense_group_id"
                  options={expenseGroupsOptions}
                  label={expense && "Gəlir-Xərc qrupu"}
                  defaultValue={
                    expense && {
                      label: expense.income_expense_group_id.name,
                      value: expense.income_expense_group_id.id,
                    }
                  }
                  // type="text"
                  // className="form-control"
                  placeholder="Gəlir-Xərc qrupu"
                />
              </div>
              <div className="col-md-6">
                <MySearchableSelect
                  id="expense_type_id"
                  name="expense_type_id"
                  options={expenseTypesOptions}
                  defaultValue={
                    expense && {
                      label: expense.expense_type_id.name,
                      value: expense.expense_type_id.id,
                    }
                  }
                  type="text"
                  label={expense && "Gəlir-Xərc Növü"}
                  // className="form-control"
                  placeholder="Gəlir-Xərc Növü"
                />
              </div>
            </div>
            <div className={`row ${expense && "mb-4"}`}>
              <div className="col-md-4">
                <MyTextInput
                  id="date"
                  name="date"
                  type="date"
                  className="form-control"
                  label={expense && "Tarix"}

                  placeholder="Tarix"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  name="contractor_id"
                  id="contractor_id"
                  options={counterpartiesOptions}
                  defaultValue={
                    expense && {
                      label: expense.contractor_id.name,
                      value: expense.contractor_id.id,
                    }
                  }
                  // type="text"
                  // className="form-control"
                  label={expense && "Kontragent"}

                  placeholder="Kontragent"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  name="document_id"
                  id="document_id"
                  // type="text"
                  defaultValue={
                    expense && {
                      label: expense.document_id.document_number,
                      value: expense.document_id.id,
                    }
                  }
                  options={docsOptions}
                  // className="form-control"
                  label={expense && "Müqavilə"}

                  placeholder="Müqavilə"
                />
              </div>
            </div>
            <div className={`row ${expense && "mb-4"}`}>
              <div className="col-md-4">
                <MySearchableSelect
                  name="operation_id"
                  id="operation_id"
                  // type="text"
                  options={operationTypeOptions}
                  defaultValue={
                    expense &&
                    operationTypeOptions.filter(
                      (operationTypeOption) =>
                        expense.operation_id === operationTypeOption.value
                    )
                  }
                  // className="form-control"
                  label={expense && "Əməliyyat növü"}

                  placeholder="Əməliyyat növü"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  name="payment_id"
                  id="payment_id"
                  // type="text"
                  options={paymentOptions}
                  defaultValue={
                    expense &&
                    paymentOptions.filter(
                      (paymentOption) =>
                        expense.payment_id === paymentOption.value
                    )
                  }
                  // className="form-control"
                  placeholder="Ödəniş"
                  label={expense && "Ödəniş"}

                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  name="payment_type_id"
                  id="payment_type_id"
                  // type="text"
                  options={paymentTypeOptions}
                  defaultValue={
                    expense &&
                    paymentTypeOptions.filter(
                      (paymentTypeOption) =>
                        expense.payment_type_id === paymentTypeOption.value
                    )
                  }
                  // className="form-control"
                  placeholder="Ödəniş növü"
                  label={expense && "Ödəniş növü"}

                />
              </div>
            </div>

            <div className={`row ${expense && "mb-4"}`}>
              <div className="col-md-12">
                <MyTextInput
                  name="faktura"
                  id="faktura"
                  // type="text"
                  className="form-control"
                  placeholder="Hesab faktura"
                  label={expense && "Hesab faktura"}

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
