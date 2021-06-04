import React, { useEffect, useState } from "react";
import $ from "jquery";

import ModalWrapper from "../../../app/modal/ModalWrapper";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { createOrder, updateOrder } from "./orderActions";
import { closeModal } from "../../../app/modal/modalReducer";
import MySearchableSelect from "../../../app/common/form/MySearchableSelect";
import MyTextArea from "../../../app/common/form/MyTextArea";

export default function OrderPageModal({ order }) {
  const { serviceTypes } = useSelector((state) => state.serviceTypes);
  const { orderSources } = useSelector((state) => state.orderSources);
  const { references } = useSelector((state) => state.references);
  const { crms } = useSelector((state) => state.crms);
  let serviceTypeOptions = [];
  let orderSourceOptions = [];
  let referenceOptions = [];
  let customerOptions = [];

  serviceTypeOptions =
    serviceTypes &&
    serviceTypes.map((serviceType) => {
      return {
        value: `${serviceType.serviceTypeName}`,
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
  customerOptions =
    crms &&
    crms.map((crm) => {
      return {
        value: `${crm.customerName}`,
        label: `${crm.customerName}`,
      };
    });
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = order
    ? order
    : {
        id: "",
        orderNumber: "",
        serviceType: "",
        customer: "",
        orderSource: "",
        oderAppointment: "",
        orderReference: "",
        orderDate: "",
        orderNote: "",

        /////
      };
  const validationSchema = Yup.object({
    orderNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    serviceType: Yup.string().required("Mütləq doldurulmalıdır."),
    customer: Yup.string().required("Mütləq doldurulmalıdır."),
    orderSource: Yup.string().required("Mütləq doldurulmalıdır."),
    oderAppointment: Yup.string().required("Mütləq doldurulmalıdır."),
    orderReference: Yup.string().required("Mütləq doldurulmalıdır."),
    orderDate: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper size="modal-lg" header={order ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            order
              ? await dispatch(updateOrder(values))
              : await dispatch(createOrder({ ...values, id: cuid() }));
            setSubmitting(false);
            order
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
                  id="orderNumber"
                  name="orderNumber"
                  type="text"
                  className="form-control"
                  placeholder="Sifariş Nömrəsi"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  defaultValue={
                    order &&
                    serviceTypeOptions.filter(
                      (serviceTypeOption) =>
                        serviceTypeOption.value === order.serviceType
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
              <div className="col-md-4">
                <MySearchableSelect
                  defaultValue={
                    order &&
                    customerOptions.filter(
                      (customerOption) =>
                        customerOption.value === order.customer
                    )
                  }
                  id="customer"
                  name="customer"
                  options={customerOptions}
                  // className="form-control"
                  placeholder="Müştəri"
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-4">
                <MySearchableSelect
                  defaultValue={
                    order &&
                    orderSourceOptions.filter(
                      (orderSourceOption) =>
                        orderSourceOption.value === order.orderSource
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
                    order &&
                    referenceOptions.filter(
                      (referenceOption) =>
                        referenceOption.value === order.orderReference
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
                  name="orderDate"
                  id="orderDate"
                  type="date"
                  className="form-control"
                  placeholder="Sifariş tarixi"
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
