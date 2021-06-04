import React, { useEffect } from "react";
import $ from "jquery";
import "./contacts.css";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployees, loadEmployees } from "./employeesActions";
import { openModal } from "../../../app/modal/modalReducer";
import { loadDuties } from "../settings/duty/dutyActions";
import { loadDepartments } from "../settings/department/departmentActions";

import { Redirect } from "react-router";
export default function Employees() {
  const dispatch = useDispatch();
  const { employees } = useSelector((state) => state.employees);
  const { loading } = useSelector((state) => state.async);
  const { authenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(loadEmployees());
    $(".view-grid").on("click", function (event) {
      event.preventDefault();
      /* Act on the event */

      $(this).parents(".switch").find(".view-list").removeClass("active-view");
      $(this).addClass("active-view");

      $(this).parents(".searchable-container").removeClass("list");
      $(this).parents(".searchable-container").addClass("grid");

      $(this)
        .parents(".searchable-container")
        .find(".searchable-items")
        .removeClass("list");
      $(this)
        .parents(".searchable-container")
        .find(".searchable-items")
        .addClass("grid");
    });

    $(".view-list").on("click", function (event) {
      event.preventDefault();
      /* Act on the event */
      $(this).parents(".switch").find(".view-grid").removeClass("active-view");
      $(this).addClass("active-view");

      $(this).parents(".searchable-container").removeClass("grid");
      $(this).parents(".searchable-container").addClass("list");

      $(this)
        .parents(".searchable-container")
        .find(".searchable-items")
        .removeClass("grid");
      $(this)
        .parents(".searchable-container")
        .find(".searchable-items")
        .addClass("list");
    });
    return function cleanup() {
      // dispatch(loadEmployees());
    };
  }, []);

  return (
    <React.Fragment>
      {/* BEGIN HOMEPAGE CONTAINER */}
      <div className="layout-px-spacing">
        <div className="row layout-spacing layout-top-spacing" id="cancel-row">
          <div className="col-lg-12">
            <div className="widget-content searchable-container list">
              <div className="row">
                <div className="col-xl-4 col-lg-5 col-md-5 col-sm-7 filtered-list-search layout-spacing align-self-center">
                  <form className="form-inline my-2 my-lg-0">
                    <div className="d-flex justify-content-sm-end justify-content-center">
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
                        className="feather feather-search"
                      >
                        <circle cx={11} cy={11} r={8} />
                        <line x1={21} y1={21} x2="16.65" y2="16.65" />
                      </svg>
                      <input
                        type="text"
                        className="form-control product-search"
                        id="input-search"
                        placeholder="Axtar..."
                      />
                    </div>
                  </form>
                </div>
                <div className="col-xl-8 col-lg-7 col-md-7 col-sm-5 text-sm-right text-center layout-spacing align-self-center">
                  <div className="d-flex justify-content-sm-end justify-content-center">
                    <svg
                      onClick={() => {
                        dispatch(
                          openModal({
                            modalType: "EmployeesModal",
                            modalProps: null,
                          })
                        );
                        dispatch(loadDuties());
                        dispatch(loadDepartments());
                      }}
                      type="button"
                      className="btn btn-rounded btn-primary mb-2 mr-2"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      id="btn-add-contact"
                      xmlns="http://www.w3.org/2000/svg"
                      width={24}
                      height={24}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-user-plus"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="8.5" cy={7} r={4} />
                      <line x1={20} y1={8} x2={20} y2={14} />
                      <line x1={23} y1={11} x2={17} y2={11} />
                    </svg>
                    <div className="switch align-self-center">
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
                        className="feather feather-list view-list active-view mr-3"
                      >
                        <line x1={8} y1={6} x2={21} y2={6} />
                        <line x1={8} y1={12} x2={21} y2={12} />
                        <line x1={8} y1={18} x2={21} y2={18} />
                        <line x1={3} y1={6} x2={3} y2={6} />
                        <line x1={3} y1={12} x2={3} y2={12} />
                        <line x1={3} y1={18} x2={3} y2={18} />
                      </svg>
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
                        className="feather feather-grid view-grid"
                      >
                        <rect x={3} y={3} width={7} height={7} />
                        <rect x={14} y={3} width={7} height={7} />
                        <rect x={14} y={14} width={7} height={7} />
                        <rect x={3} y={14} width={7} height={7} />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <div className="searchable-items list">
                <div className="items items-header-section">
                  <div className="item-content">
                    <div>
                      <div className="n-chk align-self-center text-center">
                        <label className="new-control new-checkbox checkbox-primary">
                          <input
                            type="checkbox"
                            className="new-control-input"
                            id="contact-check-all"
                          />
                          <span className="new-control-indicator" />
                        </label>
                      </div>
                      <h4>Ad Vəzifə</h4>
                    </div>
                    <div className="user-email">
                      <h4>Email</h4>
                    </div>

                    <div className="user-phone">
                      <h4 style={{ marginLeft: 3 }}>Telefon</h4>
                    </div>
                    <div className="user-location">
                      <h4 style={{ marginLeft: 0 }}>Dövriyyə</h4>
                    </div>
                    <div className="action-btn">
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
                        className="feather feather-trash-2  delete-multiple"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        <line x1={10} y1={11} x2={10} y2={17} />
                        <line x1={14} y1={11} x2={14} y2={17} />
                      </svg>
                    </div>
                  </div>
                </div>
                {loading && (
                  <div className="loader">
                    {" "}
                    <div className="loader-content text-center mt-5">
                      <div className="spinner-grow text-center align-self-center"></div>
                    </div>
                  </div>
                )}
                {employees.map((employee) => (
                  <div className="items" key={employee.id}>
                    <div className="item-content">
                      <div className="user-profile">
                        <div className="n-chk align-self-center text-center">
                          <label className="new-control new-checkbox checkbox-primary">
                            <input
                              type="checkbox"
                              className="new-control-input contact-chkbox"
                            />
                            <span className="new-control-indicator" />
                          </label>
                        </div>
                        <img src="assets/img/90x90.jpg" alt="avatar" />
                        <div className="user-meta-info">
                          <p
                            className="user-name"
                            data-name={employee.firstname}
                          >
                            {employee.firstname + " " + employee.lastname}
                          </p>
                          <p
                            className="user-work"
                            data-occupation={employee.duty}
                          >
                            {employee.duty}
                          </p>
                        </div>
                      </div>
                      <div className="user-email">
                        <p className="info-title">Email: </p>
                        <p
                          className="usr-email-addr"
                          data-email={employee.mail}
                        >
                          {employee.mail}
                        </p>
                      </div>
                      <div className="user-phone">
                        <p className="info-title">Telefon: </p>
                        <p className="usr-ph-no" data-phone="+1 (070) 123-4567">
                          {employee.phone}
                        </p>
                      </div>
                      <div className="user-location">
                        <p className="info-title">Dövriyyə: </p>
                        <p
                          className="usr-location"
                          data-location={employee.circulation}
                        >
                          {employee.circulation}
                        </p>
                      </div>

                      <div className="action-btn">
                        <svg
                          onClick={() => {
                            dispatch(
                              openModal({
                                modalType: "EmployeesModal",
                                modalProps: { employee },
                              })
                            );
                            dispatch(loadDuties());
                            dispatch(loadDepartments());
                          }}
                          type="button"
                          className="btn btn-rounded btn-primary mb-2 mr-2"
                          data-toggle="modal"
                          data-target="#exampleModal"
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-edit-2 edit"
                        >
                          <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
                        </svg>
                        <svg
                          onClick={() => {
                            dispatch(deleteEmployees(employee.id));
                          }}
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-user-minus delete"
                        >
                          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                          <circle cx="8.5" cy={7} r={4} />
                          <line x1={23} y1={11} x2={17} y2={11} />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* END HOMEPAGE CONTAINER */}
    </React.Fragment>
  );
}
