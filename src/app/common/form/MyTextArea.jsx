import { useField } from "formik";
import React from "react";

export default function MyTextArea({ label, ...props }) {
  const [field, meta] = useField(props);
  return (
    <React.Fragment>
      <label>{label}</label>
      <textarea {...field} {...props} />

      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
}
