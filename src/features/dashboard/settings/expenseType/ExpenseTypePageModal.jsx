import React, { useEffect, useState } from "react";
import $ from "jquery";

import ModalWrapper from "../../../../app/modal/ModalWrapper";

import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { closeModal } from "../../../../app/modal/modalReducer";
import { createExpenseType, updateExpenseType } from "./expenseTypeActions";
import MySearchableSelect from "../../../../app/common/form/MySearchableSelect";
import MyTextArea from "../../../../app/common/form/MyTextArea";

export default function ExpenseTypePageModal({ expenseType }) {
  const dispatch = useDispatch();
  const { expenseGroups } = useSelector((state) => state.expenseGroups);
  let expenseGroupOptions =
    expenseGroups &&
    expenseGroups.map((expenseGroup) => {
      return {
        label: expenseGroup.name,
        value: expenseGroup.id,
      };
    });
  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = expenseType
    ? {
        name: expenseType.name && expenseType.name,
        group_id: expenseType.group_id && expenseType.group_id.id,
        note: expenseType.note && expenseType.note,
      }
    : {
        name: "",
        group_id: "",
        note: "",
      };

  const validationSchema = Yup.object({
    name: Yup.string().required("Mütləq doldurulmalıdır."),
    group_id: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper
      size="modal-lg"
      header={expenseType ? "Redakte Et" : "Əlavə et"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            expenseType
              ? await dispatch(
                  updateExpenseType({ ...values, id: expenseType.id })
                )
              : await dispatch(createExpenseType({ ...values }));
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
            <div className="row">
              {" "}
              <div className={`col-md-12 ${expenseType && "mb-4"}`}>
                <MySearchableSelect
                  defaultValue={
                    expenseType && {
                      label: expenseType.group_id.name,
                      value: expenseType.group_id.id,
                    }
                  }
                  id="group_id"
                  name="group_id"
                  type="text"
                  options={expenseGroupOptions}
                  label={expenseType && "Gəlir-Xərc qrupu*"}
                  // className="form-control"
                  placeholder="Gəlir-Xərc qrupu*"
                />
              </div>
              <div className="col-md-12">
                <MyTextInput
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  label={expenseType && "Gəlir-Xərc növü*"}
                  placeholder="Gəlir-Xərc növü*"
                />
              </div>
              <div className={`col-md-12 ${expenseType && "mt-4"}`}>
                <MyTextArea
                  id="note"
                  name="note"
                  // type="text"
                  className="form-control"
                  label={expenseType && "Qeyd"}
                  placeholder="Qeyd"
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
