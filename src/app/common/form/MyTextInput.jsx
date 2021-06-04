import React from 'react'
import { useField } from 'formik';


export default function MyTextInput({label, ...props}) {
    const [field, meta] = useField(props);
    return (
        <React.Fragment>
        <label>
          {label}
        </label>
        <input {...field} {...props} />

        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </React.Fragment>
    )
}
