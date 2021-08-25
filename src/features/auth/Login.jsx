import { Formik, Form } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
// #1b55e2
import "./form-1.css";
import "./switches.css";
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "./authActions";
import MyTextInput from "../../app/common/form/MyTextInput";
import { Redirect, useHistory } from "react-router";
export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state) => state.auth);
  const { loading } = useSelector((state) => state.async);

  useEffect(() => {
    var togglePassword = document.getElementById("toggle-password");

    if (togglePassword) {
      togglePassword.addEventListener("click", function () {
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
        } else {
          x.type = "password";
        }
      });
    }
  }, []);

  if (authenticated) {
    return <Redirect to="/dashboard" />;
    // return history.push("/dashboard");
  }
  return (
    <React.Fragment>
      <div className="form-container">
        <div className="form-form">
          <div className="form-form-wrap">
            <div className="form-container">
              <div className="form-content">
                <h1>
                  <span className="brand-name">Certus</span> Hesabat Sistemi{" "}
                </h1>
                <Formik
                  initialValues={{ username: "", password: "" }}
                  validationSchema={Yup.object({
                    username: Yup.string().required(
                      "Bu sahə mütləq doldurulmalıdır."
                    ),
                    password: Yup.string().required(
                      "Bu sahə mütləq doldurulmalıdır."
                    ),
                  })}
                  onSubmit={(values, { setSubmitting, setErrors }) => {
                    // console.log('ugurludur')
                    dispatch(
                      signInUser(history, {
                        email: values.username,
                        password: values.password,
                      })
                    );
                    setSubmitting(false);
                  }}
                >
                  {({ isSubmitting, isValid, dirty, errors }) => (
                    <Form className="text-left">
                      <div className="form">
                        <div
                          id="username-field"
                          className="field-wrapper input"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-user"
                          >
                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          <MyTextInput
                            id="username"
                            name="username"
                            type="text"
                            className="form-control"
                            placeholder="İstifadəçi adı"
                          />
                        </div>

                        <div
                          id="password-field"
                          className="field-wrapper input mb-2"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-lock"
                          >
                            <rect
                              x="3"
                              y="11"
                              width="18"
                              height="11"
                              rx="2"
                              ry="2"
                            ></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                          </svg>
                          <MyTextInput
                            id="password"
                            name="password"
                            type="password"
                            className="form-control"
                            placeholder="Şifrə"
                          />
                        </div>
                        <div className="d-sm-flex justify-content-between">
                          <div className="field-wrapper toggle-pass">
                            <p className="d-inline-block">Parolu Göstər</p>
                            <label
                              style={{
                                position: "relative",
                                display: "inline-block",
                                width: "35px",
                                height: "18px",
                              }}
                              className="switchLogin s-primary"
                            >
                              <input
                                type="checkbox"
                                id="toggle-password"
                                className="d-none"
                              />
                              <span
                                style={{
                                  position: "absolute",
                                  cursor: "pointer",
                                  top: 0,
                                  left: 0,
                                  right: 0,
                                  bottom: 0,
                                  backgroundColor: "#ebedf2",
                                  transition: ".4s",
                                }}
                                className="slider round"
                              ></span>
                            </label>
                          </div>

                          <div className="">
                            <button
                              disabled={!isValid || !dirty || isSubmitting}
                              type="submit"
                              // name="time"
                              className="btn btn-primary float-right  btn-lg mt-3 "
                            >
                              {loading && (
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
                                  <line
                                    x1="4.93"
                                    y1="4.93"
                                    x2="7.76"
                                    y2="7.76"
                                  />
                                  <line
                                    x1="16.24"
                                    y1="16.24"
                                    x2="19.07"
                                    y2="19.07"
                                  />
                                  <line x1={2} y1={12} x2={6} y2={12} />
                                  <line x1={18} y1={12} x2={22} y2={12} />
                                  <line
                                    x1="4.93"
                                    y1="19.07"
                                    x2="7.76"
                                    y2="16.24"
                                  />
                                  <line
                                    x1="16.24"
                                    y1="7.76"
                                    x2="19.07"
                                    y2="4.93"
                                  />
                                </svg>
                              )}
                              Daxil Ol
                            </button>
                          </div>
                        
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>

                {/* <p className="terms-conditions">© 2019 All Rights Reserved. <a href="index.html">CORK</a> is a product of Designreset. <a href="javascript:void(0);">Cookie Preferences</a>, <a href="javascript:void(0);">Privacy</a>, and <a href="javascript:void(0);">Terms</a>.</p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="form-image">
          <div className="l-image"></div>
        </div>
      </div>
      <div
        style={{ display: "none" }}
        className="sidebar-wrapper sidebar-theme"
      >
        <nav id="sidebar">
          <div className="shadow-bottom" />
          <ul
            className="list-unstyled menu-categories ps ps--active-y"
            id="accordionExample"
          >
            <div className="ps__rail-x" style={{ left: 0, bottom: 0 }}>
              <div
                className="ps__thumb-x"
                tabIndex={0}
                style={{ left: 0, width: 0 }}
              />
            </div>
            <div
              className="ps__rail-y"
              style={{ top: 0, height: 560, right: "-4px" }}
            >
              <div
                className="ps__thumb-y"
                tabIndex={0}
                style={{ top: 0, height: 300 }}
              />
            </div>
          </ul>
        </nav>
      </div>
    </React.Fragment>
  );
}
