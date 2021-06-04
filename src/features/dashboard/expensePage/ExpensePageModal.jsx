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
        label: expenseGroup.expenseGroupName,
        value: expenseGroup.expenseGroupName,
      };
    });
  // Options xerc novleri
  const expenseTypesOptions =
    expenseTypes &&
    expenseTypes.map((expenseType) => {
      return {
        label: expenseType.expenseTypeName,
        value: expenseType.expenseTypeName,
      };
    });
  //Options Kontragent
  const counterpartiesOptions =
    counterparties &&
    counterparties.map((counterparty) => {
      return {
        label: counterparty.counterpartyName,
        value: counterparty.counterpartyName,
      };
    });
  //Options Sened
  const docsOptions =
    docs &&
    docs.map((doc) => {
      return {
        label: doc.docType,
        value: doc.docType,
      };
    });

  // options əməliyyat növü

  const operationTypeOptions = [
    { label: "Gəlir", value: 0 },
    { label: "Xərc", value: 1 },
  ];

  // options ödəniş
  const paymentOptions = [
    { label: "Rəsmi", value: 0 },
    { label: "Qeyri rəsmi", value: 1 },
  ];

  // options ödəniş tipi
  const paymentTypeOptions = [
    { label: "Bank", value: 0 },
    { label: "Kassa", value: 1 },
    { label: "Nəğd", value: 2 },
  ];
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = expense
    ? expense
    : {
        id: "",
        expenseGroup: "",
        expenseType: "",
        expenseDate: "",
        expenseCounterparty: "",
        expenseContract: "",
        expenseInvoice: "",
        operationType: "",
        payment: "",
        paymentType: "",
      };
  const validationSchema = Yup.object({
    expenseGroup: Yup.string().required("Mütləq doldurulmalıdır."),
    expenseType: Yup.string().required("Mütləq doldurulmalıdır."),
    expenseDate: Yup.string().required("Mütləq doldurulmalıdır."),
    expenseCounterparty: Yup.string().required("Mütləq doldurulmalıdır."),
    expenseContract: Yup.string().required("Mütləq doldurulmalıdır."),
    expenseInvoice: Yup.string().required("Mütləq doldurulmalıdır."),
    operationType: Yup.string().required("Mütləq doldurulmalıdır."),
    payment: Yup.string().required("Mütləq doldurulmalıdır."),
    paymentType: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper size="modal-lg" header={expense ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            expense
              ? await dispatch(updateExpense(values))
              : await dispatch(createExpense({ ...values, id: cuid() }));
            setSubmitting(false);
            expense
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
              <div className="col-md-6">
                <MySearchableSelect
                  id="expenseGroup"
                  name="expenseGroup"
                  // defaultValue={expense && { label:`${expense.expenseGroupName}`, value: `${expense.expenseGroupName}` }}

                  // defaultValue = { expense && {label:`${expenseGroupsOptions.filter(expenseGroupsOption=> expenseGroupsOption.label = expense.expenseGroupName )}`}   }
                  options={expenseGroupsOptions}
                  // type="text"
                  // className="form-control"
                  placeholder="Gəlir-Xərc qrupu"
                />
              </div>
              <div className="col-md-6">
                <MySearchableSelect
                  id="expenseType"
                  name="expenseType"
                  options={expenseTypesOptions}
                  type="text"
                  // className="form-control"
                  placeholder="Gəlir-Xərc Növü"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MyTextInput
                  id="expenseDate"
                  name="expenseDate"
                  type="date"
                  className="form-control"
                  placeholder="Tarix"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  name="expenseCounterparty"
                  id="expenseCounterparty"
                  options={counterpartiesOptions}
                  // type="text"
                  // className="form-control"
                  placeholder="Kontragent"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  name="expenseContract"
                  id="expenseContract"
                  // type="text"
                  options={docsOptions}
                  // className="form-control"
                  placeholder="Müqavilə"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MySearchableSelect
                  name="operationType"
                  id="operationType"
                  // type="text"
                  options={operationTypeOptions}
                  // className="form-control"
                  placeholder="Əməliyyat növü"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  name="payment"
                  id="payment"
                  // type="text"
                  options={paymentOptions}
                  // className="form-control"
                  placeholder="Ödəniş"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  name="paymentType"
                  id="paymentType"
                  // type="text"
                  options={paymentTypeOptions}
                  // className="form-control"
                  placeholder="Ödəniş növü"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <MySearchableSelect
                  name="expenseInvoice"
                  id="expenseInvoice"
                  // type="text"
                  options={docsOptions}
                  // className="form-control"
                  placeholder="Hesab faktura"
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
