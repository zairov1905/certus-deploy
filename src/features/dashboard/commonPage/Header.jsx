import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
// import useScript from "../../../app/common/loadJs/loadJs";
import { signOutUser } from "../../auth/authActions";

export default function Header() {
  const dispatch = useDispatch();
  // useScript("../../../../public/assets/js/app.js");
  const auth = useSelector((state) => state.auth);
  // useEffect(() => {
  //   if (auth.authenticated === false) {
  //     return <Redirect to="/" />;

  //   }
  // }, []);
  // if (auth.authenticated === false) {
  //   return <Redirect to="/" />;
  // }

  return (
    <div className="header-container fixed-top">
      <header className="header navbar navbar-expand-sm">
        <ul className="navbar-item theme-brand flex-row  text-center">
          <li className="nav-item theme-logo">
            <a href="index.html">
              <img
                src="https://zairov1905.github.io/certus-deploy/assets/img/apple-touch-icon.png"
                className="navbar-logo"
                alt="logo"
              />
            </a>
          </li>
          <li className="nav-item theme-text">
            <a href="index.html" className="nav-link">
              {" "}
              CERTUS{" "}
            </a>
          </li>
        </ul>
        <ul className="navbar-item flex-row ml-md-0 ml-auto">
          <li className="nav-item align-self-center search-animated">
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
              className="feather feather-search toggle-search"
            >
              <circle cx={11} cy={11} r={8} />
              <line x1={21} y1={21} x2="16.65" y2="16.65" />
            </svg>
            <form
              className="form-inline search-full form-inline search"
              role="search"
            >
              <div className="search-bar">
                <input
                  type="text"
                  className="form-control search-form-control  ml-lg-auto"
                  placeholder="Axtar"
                />
              </div>
            </form>
          </li>
        </ul>
        <ul className="navbar-item flex-row ml-md-auto">
          <li className="nav-item dropdown language-dropdown">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="nav-link dropdown-toggle"
              id="language-dropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="https://zairov1905.github.io/certus-deploy/assets/img/ca.png" className="flag-width" alt="flag" />
            </a>
            <div
              className="dropdown-menu position-absolute"
              aria-labelledby="language-dropdown"
            >
              <a
                className="dropdown-item d-flex"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src="https://zairov1905.github.io/certus-deploy/assets/img/de.png"
                  className="flag-width"
                  alt="flag"
                />{" "}
                <span className="align-self-center">&nbsp;German</span>
              </a>
              <a className="dropdown-item d-flex" href="#">
                <img
                  src="https://zairov1905.github.io/certus-deploy/assets/img/jp.png"
                  className="flag-width"
                  alt="flag"
                />{" "}
                <span className="align-self-center">&nbsp;Japanese</span>
              </a>
              <a
                className="dropdown-item d-flex"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src="https://zairov1905.github.io/certus-deploy/assets/img/fr.png"
                  className="flag-width"
                  alt="flag"
                />{" "}
                <span className="align-self-center">&nbsp;French</span>
              </a>
              <a
                className="dropdown-item d-flex"
                href="#"
                onClick={(e) => e.preventDefault()}
              >
                <img
                  src="https://zairov1905.github.io/certus-deploy/assets/img/ca.png"
                  className="flag-width"
                  alt="flag"
                />{" "}
                <span className="align-self-center">&nbsp;English</span>
              </a>
            </div>
          </li>
          <li className="nav-item dropdown message-dropdown">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="nav-link dropdown-toggle"
              id="messageDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
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
                className="feather feather-mail"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>
            <div
              className="dropdown-menu p-0 position-absolute"
              aria-labelledby="messageDropdown"
            >
              <div>
                <a className="dropdown-item">
                  <div>
                    <div className="media">
                      <div className="user-img">
                        <img
                          className="usr-img rounded-circle"
                          src="https://zairov1905.github.io/certus-deploy/assets/img/90x90.jpg"
                          alt="profile"
                        />
                      </div>
                      <div className="media-body">
                        <div>
                          <h5 className="usr-name">Kara Young</h5>
                          <p className="msg-title">ACCOUNT UPDATE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <a className="dropdown-item">
                  <div>
                    <div className="media">
                      <div className="user-img">
                        <img
                          className="usr-img rounded-circle"
                          src="https://zairov1905.github.io/certus-deploy/assets/img/90x90.jpg"
                          alt="profile"
                        />
                      </div>
                      <div className="media-body">
                        <div>
                          <h5 className="usr-name">Daisy Anderson</h5>
                          <p className="msg-title">ACCOUNT UPDATE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
                <a className="dropdown-item">
                  <div>
                    <div className="media">
                      <div className="user-img">
                        <img
                          className="usr-img rounded-circle"
                          src="https://zairov1905.github.io/certus-deploy/assets/img/90x90.jpg"
                          alt="profile"
                        />
                      </div>
                      <div className="media-body">
                        <div>
                          <h5 className="usr-name">Oscar Garner</h5>
                          <p className="msg-title">ACCOUNT UPDATE</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown notification-dropdown">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="nav-link dropdown-toggle"
              id="notificationDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
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
                className="feather feather-bell"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="badge badge-success" />
            </a>
            <div
              className="dropdown-menu position-absolute"
              aria-labelledby="notificationDropdown"
            >
              <div className="notification-scroll">
                <div className="dropdown-item">
                  <div className="media">
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
                      className="feather feather-heart"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <div className="media-body">
                      <div className="notification-para">
                        <span className="user-name">Shaun Park</span> likes your
                        photo.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="media">
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
                      className="feather feather-share-2"
                    >
                      <circle cx={18} cy={5} r={3} />
                      <circle cx={6} cy={12} r={3} />
                      <circle cx={18} cy={19} r={3} />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                    <div className="media-body">
                      <div className="notification-para">
                        <span className="user-name">Kelly Young</span> shared
                        your post
                      </div>
                    </div>
                  </div>
                </div>
                <div className="dropdown-item">
                  <div className="media">
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
                      className="feather feather-tag"
                    >
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                      <line x1={7} y1={7} x2={7} y2={7} />
                    </svg>
                    <div className="media-body">
                      <div className="notification-para">
                        <span className="user-name">Kelly Young</span> mentioned
                        you in comment.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className="nav-item dropdown user-profile-dropdown">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="nav-link dropdown-toggle user"
              id="userProfileDropdown"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img src="https://zairov1905.github.io/certus-deploy/assets/img/90x90.jpg" alt="avatar" />
            </a>
            <div
              className="dropdown-menu position-absolute"
              aria-labelledby="userProfileDropdown"
            >
              <div>
                <div className="dropdown-item">
                  <a href="user_profile.html">
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
                      className="feather feather-user"
                    >
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx={12} cy={7} r={4} />
                    </svg>{" "}
                    {auth.currentUser ? auth.currentUser.username : ""}
                  </a>
                </div>
                <div className="dropdown-item">
                  <a href="apps_mailbox.html">
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
                      className="feather feather-inbox"
                    >
                      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
                      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
                    </svg>{" "}
                    Inbox
                  </a>
                </div>
                <div className="dropdown-item">
                  <a href="auth_lockscreen.html">
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
                      className="feather feather-lock"
                    >
                      <rect x={3} y={11} width={18} height={11} rx={2} ry={2} />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>{" "}
                    Lock Screen
                  </a>
                </div>
                <div className="dropdown-item">
                  <Link to="#" onClick={() => dispatch(signOutUser())}>
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
                      className="feather feather-log-out"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1={21} y1={12} x2={9} y2={12} />
                    </svg>{" "}
                    Sign Out
                  </Link>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </header>
    </div>
  );
}
