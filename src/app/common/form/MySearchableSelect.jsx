import React from "react";
import { useField } from "formik";
import Select from "react-select";
export default function MySearchableSelect({ label, ...props }) {
  const [field, meta, helpers, state] = useField(props);
  const { options } = props;

  const { setValue, setTouched } = helpers;
  const onChange = (e) => {
    setValue(Array.isArray(e) ? e.map((x) => x.value) : e.value);
  };
  const customStyles1 = {
    control: (provided, state) => ({
      ...provided,
      height: "auto",
      border: "1px solid #bfc9d4",
      color: "#3b3f5c",
      fontSize: "15px",
      //   padding: "8px 10px",
      letterSpacing: "1px",
      height: "calc(1.4em + 1.4rem + 2px)",
      // paddingRight: "1.25rem",
      paddingLeft: "1.25rem",
      // marginTop: "20.5px",
      borderRadius: "6px",
      boxShadow: state.isFocused
        ? "0 0 5px 2px rgb(194 213 255 / 62%)!important"
        : null,
      borderColor: state.isFocused ? "#fe0040!important" : null,
    }),
  };

  return (
    <React.Fragment>
      <label>{label}</label>
      <Select
        {...props}
        name={field.name}
        options={options}

        // value={field.defaultValue}
        onChange={onChange}
        styles={customStyles1}
        onBlur={setTouched}
        minHeight={"44px"}
        isSearchable="true"
        // isClearable
      />

      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </React.Fragment>
  );
}