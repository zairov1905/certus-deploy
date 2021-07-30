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
import { createTraining, updateTraining } from "./trainingActions";
import MySearchableSelect from "../../../../app/common/form/MySearchableSelect";

export default function TrainingPageModal({ training }) {
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const { skills } = useSelector((state) => state.skills);
  const skillOptions = 
    skills &&
    skills.map((skill) => {
      return  {
        label: skill.name,
        value: skill.id,
      };
    });
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = training
    ? training
    : {
        id: "",
        name: "",
        about: "",
        skill_id: [],
        // trainingCategory: "",
      };
  const validationSchema = Yup.object({
    name: Yup.string().required("Mütləq doldurulmalıdır."),
    about: Yup.string().required("Mütləq doldurulmalıdır."),
    // trainingSkills: Yup.required("Mütləq doldurulmalıdır."),
    // trainingCategory: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper size="modal-lg" header={training ? "Redakte Et" : "Əlavə et"}>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            training
              ? await dispatch(updateTraining(values))
              : await dispatch(createTraining({ ...values}));
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
            <div className="row">
              <div className="col-md-12">
                <MyTextInput
                  id="name"
                  name="name"
                  type="text"
                  className="form-control"
                  placeholder="Təlim adı"
                />
              </div>
              <div className="col-md-12">
                <MyTextInput
                  id="about"
                  name="about"
                  type="text"
                  className="form-control"
                  placeholder="Təlim haqqında"
                />
              </div>
              <div className="col-md-12">
                {/* {console.log(values)} */}
                <MySearchableSelect
                  id="skill_id"
                  name="skill_id"
                  options={skillOptions}
                  defaultValue={
                    training &&
                    skillOptions.filter(
                      (skillOption) =>
                      skillOption.skill_id.id == skillOption.value
                    )
                  }
                  isMulti
                  placeholder="Təlimin səriştələri"
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
