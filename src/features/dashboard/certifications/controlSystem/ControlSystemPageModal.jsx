import React, { useEffect, useState } from "react";
import $ from "jquery";
import ModalWrapper from "../../../../app/modal/ModalWrapper";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import MyTextInput from "../../../../app/common/form/MyTextInput";
import MySearchableSelect from "../../../../app/common/form/MySearchableSelect";
import { toast } from "react-toastify";
import cuid from "cuid";
import { Form, Formik } from "formik";
import { closeModal } from "../../../../app/modal/modalReducer";
import {
  createControlSystem,
  updateControlSystem,
} from "./controlSystemActions";
import { loadSignOfLegalAct } from "../../settings/signOfLegalAct/signOfLegalActActions";
import { loadLab } from "../../labPage/labActions";

export default function ControlSystemPageModal({ controlSystem }) {
  useEffect(() => {
    dispatch(loadSignOfLegalAct());
    dispatch(loadLab());
  }, []);
  const snCodeOptions = [
    { value: "1", label: "01" },
    { value: "2", label: "02" },
    { value: "3", label: "03" },
  ];

  const productNoteOptions = [
    { value: "1", label: "Ərzaq" },
    { value: "2", label: "Qeyri-ərzaq" },
    { value: "3", label: "Şərab məhsulu" },
    { value: "4", label: "Tikinti materialı" },
    { value: "5", label: "Rabitə vasitəsi" },
    { value: "6", label: "Ehtiyat hissəsi" },
    { value: "6", label: "Digər" },
  ];

  const allCountriesListOptions = [
    { label: "Albania", value: "AL" },
    { label: "Åland Islands", value: "AX" },
    { label: "Algeria", value: "DZ" },
    { label: "American Samoa", value: "AS" },
    { label: "Andorra", value: "AD" },
    { label: "Angola", value: "AO" },
    { label: "Anguilla", value: "AI" },
    { label: "Antarctica", value: "AQ" },
    { label: "Antigua and Barbuda", value: "AG" },
    { label: "Argentina", value: "AR" },
    { label: "Armenia", value: "AM" },
    { label: "Aruba", value: "AW" },
    { label: "Australia", value: "AU" },
    { label: "Austria", value: "AT" },
    { label: "Azerbaijan", value: "AZ" },
    { label: "Bahamas (the)", value: "BS" },
    { label: "Bahrain", value: "BH" },
    { label: "Bangladesh", value: "BD" },
    { label: "Barbados", value: "BB" },
    { label: "Belarus", value: "BY" },
    { label: "Belgium", value: "BE" },
    { label: "Belize", value: "BZ" },
    { label: "Benin", value: "BJ" },
    { label: "Bermuda", value: "BM" },
    { label: "Bhutan", value: "BT" },
    { label: "Bolivia (Plurinational State of)", value: "BO" },
    { label: "Bonaire, Sint Eustatius and Saba", value: "BQ" },
    { label: "Bosnia and Herzegovina", value: "BA" },
    { label: "Botswana", value: "BW" },
    { label: "Bouvet Island", value: "BV" },
    { label: "Brazil", value: "BR" },
    { label: "British Indian Ocean Territory (the)", value: "IO" },
    { label: "Brunei Darussalam", value: "BN" },
    { label: "Bulgaria", value: "BG" },
    { label: "Burkina Faso", value: "BF" },
    { label: "Burundi", value: "BI" },
    { label: "Cabo Verde", value: "CV" },
    { label: "Cambodia", value: "KH" },
    { label: "Cameroon", value: "CM" },
    { label: "Canada", value: "CA" },
    { label: "Cayman Islands (the)", value: "KY" },
    { label: "Central African Republic (the)", value: "CF" },
    { label: "Chad", value: "TD" },
    { label: "Chile", value: "CL" },
    { label: "China", value: "CN" },
    { label: "Christmas Island", value: "CX" },
    { label: "Cocos (Keeling) Islands (the)", value: "CC" },
    { label: "Colombia", value: "CO" },
    { label: "Comoros (the)", value: "KM" },
    { label: "Congo (the Democratic Republic of the)", value: "CD" },
    { label: "Congo (the)", value: "CG" },
    { label: "Cook Islands (the)", value: "CK" },
    { label: "Costa Rica", value: "CR" },
    { label: "Croatia", value: "HR" },
    { label: "Cuba", value: "CU" },
    { label: "Curaçao", value: "CW" },
    { label: "Cyprus", value: "CY" },
    { label: "Czechia", value: "CZ" },
    { label: "Côte d'Ivoire", value: "CI" },
    { label: "Denmark", value: "DK" },
    { label: "Djibouti", value: "DJ" },
    { label: "Dominica", value: "DM" },
    { label: "Dominican Republic (the)", value: "DO" },
    { label: "Ecuador", value: "EC" },
    { label: "Egypt", value: "EG" },
    { label: "El Salvador", value: "SV" },
    { label: "Equatorial Guinea", value: "GQ" },
    { label: "Eritrea", value: "ER" },
    { label: "Estonia", value: "EE" },
    { label: "Eswatini", value: "SZ" },
    { label: "Ethiopia", value: "ET" },
    { label: "Falkland Islands (the) [Malvinas]", value: "FK" },
    { label: "Faroe Islands (the)", value: "FO" },
    { label: "Fiji", value: "FJ" },
    { label: "Finland", value: "FI" },
    { label: "France", value: "FR" },
    { label: "French Guiana", value: "GF" },
    { label: "French Polynesia", value: "PF" },
    { label: "French Southern Territories (the)", value: "TF" },
    { label: "Gabon", value: "GA" },
    { label: "Gambia (the)", value: "GM" },
    { label: "Georgia", value: "GE" },
    { label: "Germany", value: "DE" },
    { label: "Ghana", value: "GH" },
    { label: "Gibraltar", value: "GI" },
    { label: "Greece", value: "GR" },
    { label: "Greenland", value: "GL" },
    { label: "Grenada", value: "GD" },
    { label: "Guadeloupe", value: "GP" },
    { label: "Guam", value: "GU" },
    { label: "Guatemala", value: "GT" },
    { label: "Guernsey", value: "GG" },
    { label: "Guinea", value: "GN" },
    { label: "Guinea-Bissau", value: "GW" },
    { label: "Guyana", value: "GY" },
    { label: "Haiti", value: "HT" },
    { label: "Heard Island and McDonald Islands", value: "HM" },
    { label: "Holy See (the)", value: "VA" },
    { label: "Honduras", value: "HN" },
    { label: "Hong Kong", value: "HK" },
    { label: "Hungary", value: "HU" },
    { label: "Iceland", value: "IS" },
    { label: "India", value: "IN" },
    { label: "Indonesia", value: "ID" },
    { label: "Iran (Islamic Republic of)", value: "IR" },
    { label: "Iraq", value: "IQ" },
    { label: "Ireland", value: "IE" },
    { label: "Isle of Man", value: "IM" },
    { label: "Israel", value: "IL" },
    { label: "Italy", value: "IT" },
    { label: "Jamaica", value: "JM" },
    { label: "Japan", value: "JP" },
    { label: "Jersey", value: "JE" },
    { label: "Jordan", value: "JO" },
    { label: "Kazakhstan", value: "KZ" },
    { label: "Kenya", value: "KE" },
    { label: "Kiribati", value: "KI" },
    { label: "Korea (the Democratic People's Republic of)", value: "KP" },
    { label: "Korea (the Republic of)", value: "KR" },
    { label: "Kuwait", value: "KW" },
    { label: "Kyrgyzstan", value: "KG" },
    { label: "Lao People's Democratic Republic (the)", value: "LA" },
    { label: "Latvia", value: "LV" },
    { label: "Lebanon", value: "LB" },
    { label: "Lesotho", value: "LS" },
    { label: "Liberia", value: "LR" },
    { label: "Libya", value: "LY" },
    { label: "Liechtenstein", value: "LI" },
    { label: "Lithuania", value: "LT" },
    { label: "Luxembourg", value: "LU" },
    { label: "Macao", value: "MO" },
    { label: "Madagascar", value: "MG" },
    { label: "Malawi", value: "MW" },
    { label: "Malaysia", value: "MY" },
    { label: "Maldives", value: "MV" },
    { label: "Mali", value: "ML" },
    { label: "Malta", value: "MT" },
    { label: "Marshall Islands (the)", value: "MH" },
    { label: "Martinique", value: "MQ" },
    { label: "Mauritania", value: "MR" },
    { label: "Mauritius", value: "MU" },
    { label: "Mayotte", value: "YT" },
    { label: "Mexico", value: "MX" },
    { label: "Micronesia (Federated States of)", value: "FM" },
    { label: "Moldova (the Republic of)", value: "MD" },
    { label: "Monaco", value: "MC" },
    { label: "Mongolia", value: "MN" },
    { label: "Montenegro", value: "ME" },
    { label: "Montserrat", value: "MS" },
    { label: "Morocco", value: "MA" },
    { label: "Mozambique", value: "MZ" },
    { label: "Myanmar", value: "MM" },
    { label: "Namibia", value: "NA" },
    { label: "Nauru", value: "NR" },
    { label: "Nepal", value: "NP" },
    { label: "Netherlands (the)", value: "NL" },
    { label: "New Caledonia", value: "NC" },
    { label: "New Zealand", value: "NZ" },
    { label: "Nicaragua", value: "NI" },
    { label: "Niger (the)", value: "NE" },
    { label: "Nigeria", value: "NG" },
    { label: "Niue", value: "NU" },
    { label: "Norfolk Island", value: "NF" },
    { label: "Northern Mariana Islands (the)", value: "MP" },
    { label: "Norway", value: "NO" },
    { label: "Oman", value: "OM" },
    { label: "Pakistan", value: "PK" },
    { label: "Palau", value: "PW" },
    { label: "Palestine, State of", value: "PS" },
    { label: "Panama", value: "PA" },
    { label: "Papua New Guinea", value: "PG" },
    { label: "Paraguay", value: "PY" },
    { label: "Peru", value: "PE" },
    { label: "Philippines (the)", value: "PH" },
    { label: "Pitcairn", value: "PN" },
    { label: "Poland", value: "PL" },
    { label: "Portugal", value: "PT" },
    { label: "Puerto Rico", value: "PR" },
    { label: "Qatar", value: "QA" },
    { label: "Republic of North Macedonia", value: "MK" },
    { label: "Romania", value: "RO" },
    { label: "Russian Federation (the)", value: "RU" },
    { label: "Rwanda", value: "RW" },
    { label: "Réunion", value: "RE" },
    { label: "Saint Barthélemy", value: "BL" },
    { label: "Saint Helena, Ascension and Tristan da Cunha", value: "SH" },
    { label: "Saint Kitts and Nevis", value: "KN" },
    { label: "Saint Lucia", value: "LC" },
    { label: "Saint Martin (French part)", value: "MF" },
    { label: "Saint Pierre and Miquelon", value: "PM" },
    { label: "Saint Vincent and the Grenadines", value: "VC" },
    { label: "Samoa", value: "WS" },
    { label: "San Marino", value: "SM" },
    { label: "Sao Tome and Principe", value: "ST" },
    { label: "Saudi Arabia", value: "SA" },
    { label: "Senegal", value: "SN" },
    { label: "Serbia", value: "RS" },
    { label: "Seychelles", value: "SC" },
    { label: "Sierra Leone", value: "SL" },
    { label: "Singapore", value: "SG" },
    { label: "Sint Maarten (Dutch part)", value: "SX" },
    { label: "Slovakia", value: "SK" },
    { label: "Slovenia", value: "SI" },
    { label: "Solomon Islands", value: "SB" },
    { label: "Somalia", value: "SO" },
    { label: "South Africa", value: "ZA" },
    { label: "South Georgia and the South Sandwich Islands", value: "GS" },
    { label: "South Sudan", value: "SS" },
    { label: "Spain", value: "ES" },
    { label: "Sri Lanka", value: "LK" },
    { label: "Sudan (the)", value: "SD" },
    { label: "Surilabel", value: "SR" },
    { label: "Svalbard and Jan Mayen", value: "SJ" },
    { label: "Sweden", value: "SE" },
    { label: "Switzerland", value: "CH" },
    { label: "Syrian Arab Republic", value: "SY" },
    { label: "Taiwan (Province of China)", value: "TW" },
    { label: "Tajikistan", value: "TJ" },
    { label: "Tanzania, United Republic of", value: "TZ" },
    { label: "Thailand", value: "TH" },
    { label: "Timor-Leste", value: "TL" },
    { label: "Togo", value: "TG" },
    { label: "Tokelau", value: "TK" },
    { label: "Tonga", value: "TO" },
    { label: "Trinidad and Tobago", value: "TT" },
    { label: "Tunisia", value: "TN" },
    { label: "Turkey", value: "TR" },
    { label: "Turkmenistan", value: "TM" },
    { label: "Turks and Caicos Islands (the)", value: "TC" },
    { label: "Tuvalu", value: "TV" },
    { label: "Uganda", value: "UG" },
    { label: "Ukraine", value: "UA" },
    { label: "United Arab Emirates (the)", value: "AE" },
    {
      label: "United Kingdom of Great Britain and Northern Ireland (the)",
      value: "GB",
    },
    { label: "United States Minor Outlying Islands (the)", value: "UM" },
    { label: "United States of America (the)", value: "US" },
    { label: "Uruguay", value: "UY" },
    { label: "Uzbekistan", value: "UZ" },
    { label: "Vanuatu", value: "VU" },
    { label: "Venezuela (Bolivarian Republic of)", value: "VE" },
    { label: "Viet Nam", value: "VN" },
    { label: "Virgin Islands (British)", value: "VG" },
    { label: "Virgin Islands (U.S.)", value: "VI" },
    { label: "Wallis and Futuna", value: "WF" },
    { label: "Western Sahara", value: "EH" },
    { label: "Yemen", value: "YE" },
    { label: "Zambia", value: "ZM" },
    { label: "Zimbabwe", value: "ZW" },
  ];
  const recognitionProcessNoteOptions = [
    { value: "1", label: "Aparılıb" },
    { value: "2", label: "Aparılmayıb" },
  ];
  const dispatch = useDispatch();
  // ++++++++++++++
  const { signOfLegalActs } = useSelector((state) => state.signOfLegalActs);
  const signOfLegalActOptions =
    signOfLegalActs &&
    signOfLegalActs.map((signOfLegalAct) => {
      return {
        label: signOfLegalAct.signOfLegalActName,
        value: signOfLegalAct.id,
      };
    });
  // ++++++++++++++
  const { labs } = useSelector((state) => state.labs);
  const accreditedLaboratoryNameOptions =
    labs &&
    labs.map((lab) => {
      return {
        label: lab.labName,
        value: lab.id,
      };
    });
  // ++++++++++++++

  const [modal, setModal] = useState(false);
  useEffect(() => {
    if (modal) {
      $("#closeModal").click();
    }
  });

  const initialValues = controlSystem
    ? controlSystem
    : {
        id: "",
        snCode: "",
        registrationNumber: "",
        blankNumber: "",
        accreditationNumber: "",
        certificateIssueDate: "",
        certificateExpirationDate: "",
        businessEntityName: "",
        legalStatus: "",
        VOEN: "",
        economicEntityPhoneNumber: "",
        legalAddressOfTheBusinessEntity: "",
        actualAddressOfTheBusiness: "",
        nameOfTheProduct: "",
        productCode: "",
        signOfLegalAct: "",
        recognitionProcessNote: "",
        testQuantity: "",
        productBatchHistory: "",
        note:""
      };
  const validationSchema = Yup.object({
    // id:"",

    snCode: Yup.string().required("Mütləq doldurulmalıdır."),
    registrationNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    blankNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    accreditationNumber: Yup.string().required("Mütləq doldurulmalıdır."),
    certificateIssueDate: Yup.string().required("Mütləq doldurulmalıdır."),
    certificateExpirationDate: Yup.string().required("Mütləq doldurulmalıdır."),
    businessEntityName: Yup.string().required("Mütləq doldurulmalıdır."),
    nameOfTheProduct: Yup.string().required("Mütləq doldurulmalıdır."),
    productCode: Yup.string().required("Mütləq doldurulmalıdır."),
    signOfLegalAct: Yup.string().required("Mütləq doldurulmalıdır."),
    certificateIsRecognized: Yup.string().required("Mütləq doldurulmalıdır."),
    recognitionProcessNote: Yup.string().required("Mütləq doldurulmalıdır."),
    testQuantity: Yup.string().required("Mütləq doldurulmalıdır."),
    productBatchHistory: Yup.string().required("Mütləq doldurulmalıdır."),
  });

  return (
    <ModalWrapper
      size="modal-lg"
      header={controlSystem ? "Redakte Et" : "Əlavə et"}
    >
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            controlSystem
              ? await dispatch(updateControlSystem(values))
              : await dispatch(
                  createControlSystem({
                    ...values,
                    id: cuid(),
                    labNumber: `Lab${cuid()}`,
                  })
                );
            setSubmitting(false);
            controlSystem
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
            <div className="row mb-4">
              <div className="col-md-12 mb-4">
                <MySearchableSelect
                  id="snCode"
                  name="snCode"
                  type="text"
                  options={snCodeOptions}
                  placeholder="SN kodu daxil edin"
                  label="SN kodu"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="registrationNumber"
                  name="registrationNumber"
                  type="text"
                  className="form-control"
                  placeholder="Reyestr nömrəsi daxil edin"
                  label="Reyestr nömrəsi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="blankNumber"
                  name="blankNumber"
                  type="text"
                  className="form-control"
                  placeholder="Blank nömrəsi daxil edin"
                  label="Blank nömrəsi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="accreditationNumber"
                  name="accreditationNumber"
                  type="text"
                  className="form-control"
                  placeholder="Akkreditasiya sahəsində sıra nömrəsi daxil edin"
                  label="Akkreditasiya sahəsində sıra nömrəsi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="certificateIssueDate"
                  name="certificateIssueDate"
                  type="date"
                  className="form-control"
                  placeholder="Sertifikatın verilmə tarixi daxil edin"
                  label="Sertifikatın verilmə tarixi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="certificateExpirationDate"
                  name="certificateExpirationDate"
                  type="date"
                  className="form-control"
                  placeholder="Sertifikatın qüvvədən düşdüyü tarix daxil edin"
                  label="Sertifikatın qüvvədən düşdüyü tarix"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="businessEntityName"
                  name="businessEntityName"
                  type="text"
                  className="form-control"
                  placeholder="Sertifikat təqdim edilən təsərrüfat subyektinin adını daxil edin"
                  label="Sertifikat təqdim edilən təsərrüfat subyektinin adı"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="legalStatus"
                  name="legalStatus"
                  type="text"
                  readOnly
                  className="form-control"
                  placeholder="Hüquqi statusunu daxil edin"
                  label="Hüquqi statusu"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="VOEN"
                  name="VOEN"
                  type="text"
                  readOnly
                  className="form-control"
                  placeholder="VÖEN daxil edin"
                  label="VÖEN"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="economicEntityPhoneNumber"
                  name="economicEntityPhoneNumber"
                  type="text"
                  readOnly
                  className="form-control"
                  placeholder="Təsərrüfat subyektinin rəhbərinin telefon nömrəsini daxil edin"
                  label="Təsərrüfat subyektinin rəhbərinin telefon nömrəsi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="legalAddressOfTheBusinessEntity"
                  name="legalAddressOfTheBusinessEntity"
                  type="text"
                  readOnly
                  className="form-control"
                  placeholder="Sertifikat təqdim edilən təsərrüfat subyektinin hüquqi ünvanını daxil edin"
                  label="Sertifikat təqdim edilən təsərrüfat subyektinin hüquqi ünvanı"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="actualAddressOfTheBusiness"
                  name="actualAddressOfTheBusiness"
                  type="text"
                  readOnly
                  className="form-control"
                  placeholder="Sertifikat təqdim edilən təsərrüfat subyektinin faktiki ünvanını daxil edin"
                  label="Sertifikat təqdim edilən təsərrüfat subyektinin faktiki ünvanı"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="nameOfTheProduct"
                  name="nameOfTheProduct"
                  type="text"
                  className="form-control"
                  placeholder="Məhsulun(xidmətin) adını daxil edin"
                  label="Məhsulun(xidmətin) adı"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="productCode"
                  name="productCode"
                  type="text"
                  className="form-control"
                  placeholder="Məhsulun kodunu daxil edin"
                  label="Məhsulun kodu"
                />
              </div>

              <div className="col-md-12 mb-4">
                <MySearchableSelect
                  id="signOfLegalAct"
                  name="signOfLegalAct"
                  isMulti
                  type="text"
                  options={signOfLegalActOptions}
                  // className="form-control"
                  placeholder="Hüquqi normativ texniki aktın işarəsini daxil edin"
                  label="Hüquqi normativ texniki aktın işarəsi"
                />
              </div>
              <div className="col-md-12 mb-4">
                <MySearchableSelect
                  id="recognitionProcessNote"
                  name="recognitionProcessNote"
                  type="text"
                  options={recognitionProcessNoteOptions}
                  // className="form-control"
                  placeholder="Tanınma prosesində auditin aparılması haqqında qeydi daxil edin"
                  label="Tanınma prosesində auditin aparılması haqqında qeyd"
                />
              </div>

              <div className="col-md-12 mb-4">
                <MyTextInput
                  id="testQuantity"
                  name="testQuantity"
                  type="text"
                  className="form-control"
                  placeholder="Aparılmış sınaqların miqdarını edin"
                  label="Aparılmış sınaqların miqdarı"
                />
              </div>
              <div className="col-md-12">
                <MyTextInput
                  id="productBatchHistory"
                  name="productBatchHistory"
                  type="text"
                  className="form-control"
                  placeholder="Məhsul partiyasının tarixini edin"
                  label="Məhsul partiyasının tarixi"
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
