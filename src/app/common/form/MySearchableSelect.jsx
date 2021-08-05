import React from "react";
import { useField, FieldProps } from "formik";
import Select, { Option, ReactSelectProps } from "react-select";
export default function MySearchableSelect({ label, ...props }) {
  const [field, meta, helpers] = useField(props);
  const { options } = props;
  const { touched, error, value } = meta;
  const { setValue } = helpers;
  const customStyles1 = {
    control: (provided, state) => ({
      ...provided,
      height: "auto",
      border: "1px solid #bfc9d4",
      color: " #3b3f5c",
      fontSize: " 15px",
      //   padding: "8px 10px",
      letterSpacing: "1px",
      height: "calc(1.4em + 1.4rem + 2px)",
      width:"100%",
      // paddingRight: "1.25rem",
      paddingLeft: "1.25rem",
      // marginTop: "20.5px",
      borderRadius: "6px",
      boxShadow: state.isFocused
        ? "0 0 5px 2px rgb(194 213 255 / 62%)!important"
        : null,
      borderColor: state.isFocused ? "#1b55e2!important" : null,
    }),
  };

  //   const customStyles = {
  //     menu: (provided, state) => ({
  //       ...provided,
  //       width: state.selectProps.width,
  //       borderBottom: '1px dotted pink',
  //       color: state.selectProps.menuColor,
  //       padding: 20,
  //   height: "auto",
  //   border: "1px solid #bfc9d4",
  //   color: " #3b3f5c",
  //   fontSize: " 15px",
  //   padding: "8px 10px",
  //   letterSpacing: "1px",
  //   height: "calc(1.4em + 1.4rem + 2px)",
  //   padding: ".75rem 1.25rem",
  //   borderRadius: "6px",
  // }),

  // control: (_, { selectProps: { width }}) => ({
  //   width: width
  // }),

  // singleValue: (provided, state) => {
  //   const opacity = state.isDisabled ? 0.5 : 1;
  //   const transition = 'opacity 300ms';

  //   return { ...provided, opacity, transition };
  // }
  //   }

  return (
    <>
      <label>{label}</label>
      <Select
        {...props}
        name={field.name}
        value={field.defaultValue}
        options={options}
        onChange={(option) => setValue(option.value)}
        instanceId={props.id}
        styles={customStyles1}
        minHeight={"44px"}
        isSearchable="true"
        // isClearable
      />

      {meta.touched && meta.error ? (
        <div className="invalid-feedback">{meta.error}</div>
      ) : null}
    </>
  );
}
