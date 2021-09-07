import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar-wrapper sidebar-theme">
      <nav id="sidebar">
        <div className="shadow-bottom" />
        <ul
          className="list-unstyled menu-categories ps ps--active-y"
          id="accordionExample"
        >
          <li className="menu">
            <NavLink
              to="/dashboard"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div>
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
                  className="feather feather-home"
                >
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>Ana Səhifə</span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <NavLink
              to="/crm"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
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
                  className="feather feather-map"
                >
                  <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                  <line x1={8} y1={2} x2={8} y2={18} />
                  <line x1={16} y1={6} x2={16} y2={22} />
                </svg>
                <span>Müştəri</span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <NavLink
              to="/orders"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1={3} y1={6} x2={21} y2={6} />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>

                <span>Sifarişlər</span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <NavLink
              to="/operation"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
                <span>Əməliyyatlar</span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <NavLink
              to="/expense"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <line x1="12" y1="1" x2="12" y2="23"></line>
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                </svg>
                <span>Gəlir-xərc</span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <NavLink
              to="/labs"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                </svg>

                <span>Laboratoriyalar</span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <NavLink
              to="/employees"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
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
                  className="feather feather-users"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx={9} cy={7} r={4} />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>

                <span>İşçilər</span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <NavLink
              to="/documents"
              aria-expanded="false"
              className="dropdown-toggle"
              activeStyle={{
                background: "#bfc9d4",
                boxShadow:
                  "0 1px 3px 0 rgb(0 0 0 / 10%), 0 1px 2px 0 rgb(0 0 0 / 6%)",
                borderRadius: " 6px",
              }}
            >
              <div>
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
                  className="feather feather-file-text"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
                <span>Sənədlər</span>
              </div>
            </NavLink>
          </li>
          <li className="menu">
            <a
              href="#certificates"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div>
                <svg
                  viewBox="0 0 24 24"
                  width={24}
                  height={24}
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="css-i6dzq1"
                >
                  <polyline points="9 11 12 14 22 4" />
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                </svg>

                <span>Sertifikatlar</span>
              </div>
              <div>
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
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </a>
            <ul
              className="collapse submenu list-unstyled"
              id="certificates"
              data-parent="#certificates"
            >
              <li>
                <NavLink
                  to="/certificates/productService"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Məhsul/Xidmət
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/certificates/personal"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Perseonal sertifikatları
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/certificates/controlSystem"
                  activeStyle={{ color: "#fe0040" }}
                >
                  İdarəetmə sistemləri
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="menu">
            <a
              href="#users"
              data-toggle="collapse"
              aria-expanded="false"
              className="dropdown-toggle"
            >
              <div>
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
                  className="feather feather-settings"
                >
                  <circle cx={12} cy={12} r={3} />
                  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                </svg>

                <span>Tənzimləmələr</span>
              </div>
              <div>
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
                  className="feather feather-chevron-right"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </a>
            <ul
              className="collapse submenu list-unstyled"
              id="users"
              data-parent="#accordionExample"
            >
              <li>
                <NavLink
                  to="/settings/documentTypes"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Sənəd növləri
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings/departments"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Struktur bölmələr
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings/duties"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Vəzifələr
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings/counterparties"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Kontragentlər
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings/expenseGroups"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Gəlir-Xərc qrupları
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings/expenseTypes"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Gəlir-Xərc növləri
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings/serviceTypes"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Xidmət növləri
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings/orderSources"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Sifariş mənbəyi
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings/references"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Referanslar
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/settings/signOfLegalAct"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Texniki Aktlar
                </NavLink>
                <NavLink
                  to="/settings/trainings"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Təlimlər
                </NavLink>
                <NavLink
                  to="/settings/skills"
                  activeStyle={{ color: "#fe0040" }}
                >
                  Səriştələr
                </NavLink>
              </li>
            </ul>
          </li>

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
        {/* <div className="shadow-bottom"></div> */}
      </nav>
    </div>
  );
}
