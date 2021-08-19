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
import moment from "moment";

export default function OrderPageModal({ order }) {
  const { serviceTypes } = useSelector((state) => state.serviceTypes);
  const { orderSources } = useSelector((state) => state.orderSources);
  const { references } = useSelector((state) => state.references);
  const { crms } = useSelector((state) => state.crms);
  const { docs } = useSelector((state) => state.docs);
  // console.log(docs);

  let serviceTypeOptions = [];
  let orderSourceOptions = [];
  let referenceOptions = [];
  let customerOptions = [];
  let docOptions = [];

  serviceTypeOptions =
    serviceTypes &&
    serviceTypes.map((serviceType) => {
      return {
        value: `${serviceType.id}`,
        label: `${serviceType.name}`,
      };
    });

  orderSourceOptions =
    orderSources &&
    orderSources.map((orderSource) => {
      return {
        value: `${orderSource.id}`,
        label: `${orderSource.name}`,
      };
    });
  referenceOptions =
    references &&
    references.map((reference) => {
      return {
        value: `${reference.id}`,
        label: `${reference.name}`,
      };
    });
  customerOptions =
    crms &&
    crms.map((crm) => {
      return {
        value: `${crm.id}`,
        label: `${crm.customer_name}`,
      };
    });
  docOptions =
    docs &&
    docs.map((doc) => {
      return {
        value: doc.document_number,
        label: doc.document_number,
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
  
    ? {
      number: order.number && order.number,
      service_type_id: order.service_type_id && order.service_type_id.id,
      customer_id: order.customer_id && order.customer_id.id,
      order_source_id: order.order_source_id && order.order_source_id.id,
      reference_id: order.reference_id && order.reference_id.id,
      date: order.date && moment(order.date).format("YYYY-MM-DD"),
      description: order.description && order.description,
    }
    : {
        number: "",
        service_type_id: "",
        customer_id: "",
        order_source_id: "",
        reference_id: "",
        date: "",
        description: "",

        /////
      };
  const validationSchema = Yup.object({
    // number: Yup.string().required("Mütləq doldurulmalıdır."),
    service_type_id: Yup.number().required("Mütləq doldurulmalıdır."),
    // customer_id: Yup.number(),
    // order_source_id: Yup.number(),
    // reference_id: Yup.number(),
    // date: Yup.string(),
    // description: "",
  });

  return (
    <ModalWrapper size="modal-lg" header={order ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            order
              ? await dispatch(
                  updateOrder({
                    ...values,
                    id:order.id
                  }),
                )
              : await dispatch(createOrder(values));
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
        {({ isSubmitting, isValid, dirty, errors, values }) => (
          <Form id="emp">
            <div className={`row ${order && "mb-4"}`}>
              <div className="col-md-4">
                <MySearchableSelect
                  id="number"
                  name="number"
                  type="text"
                  defaultValue={
                    order && {
                      label: order.number,
                      value: parseInt(order.number),
                    }
                  }
                  label={order && "Sifariş Nömrəsi"}

                  options={docOptions}
                  placeholder="Sifariş Nömrəsi"
                />
                {/* {console.log(values.service_type_id)} */}
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  id="service_type_id"
                  name="service_type_id"
                  type="text"
                  label={order && "Xidmət Növü"}

                  defaultValue={
                    order && {
                      label: order.service_type_id.name,
                      value: parseInt(order.service_type_id.id),
                    }
                  }
                  options={serviceTypeOptions}
                  // getOptionLabel={ x => x.label}
                  // getOptionValue={ x => x.value}
                  // className="form-control"
                  placeholder="Xidmət Növü"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  defaultValue={
                    order && {
                      label: order.customer_id.customer_name,
                      value: parseInt(order.customer_id.id),
                    }
                  }
                  id="customer_id"
                  name="customer_id"
                  options={customerOptions}
                  label={order && "Müştəri"}

                  // className="form-control"
                  placeholder="Müştəri"
                />
              </div>
            </div>
            <div className={`row ${order && "mb-4"}`}>
              <div className="col-md-4">
                <MySearchableSelect
                  defaultValue={
                    order && {
                      label: order.order_source_id.name,
                      value: parseInt(order.order_source_id.id),
                    }
                  }
                  id="order_source_id"
                  name="order_source_id"
                  type="text"
                  label={order && "Sifariş Mənbəyi"}

                  options={orderSourceOptions}
                  // className="form-control"
                  placeholder="Sifariş Mənbəyi"
                />
              </div>
              <div className="col-md-4">
                <MySearchableSelect
                  defaultValue={
                    order && {
                      label: order.reference_id.name,
                      value: parseInt(order.reference_id.id),
                    }
                  }
                  name="reference_id"
                  id="reference_id"
                  type="text"
                  options={referenceOptions}
                  // className="form-control"
                  placeholder="Referans"
                  label={order && "Referans"}

                />
              </div>
              <div className="col-md-4">
                <MyTextInput
                  name="date"
                  id="date"
                  type="date"
                  className="form-control"
                  placeholder="Sifariş tarixi"
                  label={order && "Sifariş tarixi"}
                  
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <MyTextArea
                  name="description"
                  id="description"
                  type="text"
                  className="form-control"
                  placeholder="Sifariş Təyinatı"
                  label={order && "Sifariş Təyinatı"}

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
