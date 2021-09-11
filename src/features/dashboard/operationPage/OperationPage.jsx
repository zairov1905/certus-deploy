import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { openModal } from "../../../app/modal/modalReducer";

import { deleteOperation, loadOperation } from "./operationActions";
export default function OperationPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadOperation());
    //   // return () => {
    //   //   // dispatch(loadOrder())
    //   // }
  }, []);
  const [perPage, setPerPage] = useState(10);
  const [PageNumber, setPageNumber] = useState(1);
  const { operations, totalCount } = useSelector((state) => state.operations);
  const [hover, sethover] = useState(false);
  const [target, setTarget] = useState({ id: null, name: null });

  const data = operations;
  const buttonStyle = {
    padding: "9px",
    background: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "35px",
    boxShadow: "0px 2px 4px rgb(126 142 177 / 12%)",
    width: "43px",
    height: "41px",
    color: "#fe0040",
    fill: "rgba(232, 186, 183, 0.239)",
  };
  const buttonStyle1 = {
    //   '&:hover':{
    //     background:'#sdsdss'
    //   },
    padding: "9px",
    background: "#ffffff",
    borderRadius: "5px",
    cursor: "pointer",
    // marginRight: "2px",
    marginBottom: "10px",
    marginTop: "10px",
    boxShadow: "0px 2px 4px rgb(126 142 177 / 12%)",
    width: "36px",
    height: "34px",
    color: "#fe0040",
    fill: "rgba(232, 186, 183, 0.239)",
  };
  const buttonHover = {
    color: "#515365",
    fill: "#ffcacd",
  };
  const handlePageChange = (page) => {
    dispatch(loadOperation({ s: page, take: perPage }));
    setPageNumber(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(loadOperation({ s: page, take: newPerPage }));
    setPerPage(newPerPage);
  };
  // const actions = (
  //   <svg
  //     data-name="add"
  //     onClick={() => {
  //       dispatch(
  //         openModal({
  //           modalType: "OperationPageModal",
  //           modalProps: null,
  //         })
  //       );
  //       dispatch(loadServiceType());
  //       dispatch(loadReference());
  //       dispatch(loadOrderSource());
  //       dispatch(loadEmployees());
  //       dispatch(loadDocs());
  //       dispatch(loadLab());
  //       dispatch(loadExpenseGroup());
  //       dispatch(loadExpenseType());

  //     }}
  //     style={{
  //       ...buttonStyle,
  //       ...(hover && target.name === "add" && buttonHover),
  //     }}
  //     onMouseEnter={(e) => {
  //       sethover(true);
  //       setTarget({
  //         ...target,
  //         name: e.target.getAttribute("data-name"),
  //       });
  //     }}
  //     onMouseLeave={() => {
  //       sethover(false);
  //       setTarget(null);
  //     }}
  //     type="button"
  //     xmlns="http://www.w3.org/2000/svg"
  //     width={24}
  //     height={24}
  //     viewBox="0 0 24 24"
  //     fill="none"
  //     stroke="currentColor"
  //     strokeWidth={2}
  //     strokeLinecap="round"
  //     strokeLinejoin="round"
  //     className="feather mr-4 feather-plus icon-container"
  //     data-toggle="modal"
  //     data-target="#exampleModal"
  //   >
  //     <line x1={12} y1={5} x2={12} y2={19} />
  //     <line x1={5} y1={12} x2={19} y2={12} />
  //   </svg>
  // );

  const columns = [
    {
      name: "№",
      cell: (operation) => <p>{operation.id && `OR${operation.id}`}</p>,
      sortable: true,
    },
    {
      name: "Xidmət növü",
      cell: (operation) => (
        <p>{operation.service_type_id && operation.service_type_id.name}</p>
      ),
      sortable: true,
    },
    {
      name: "Müştəri",
      cell: (operation) => (
        <p>{operation.customer_id && operation.customer_id.customer_name}</p>
      ),
      sortable: true,
    },
    {
      name: "Əməliyyat tarixi",
      selector: "date",
      sortable: true,
    },
    {
      name: "Referans",
      cell: (operation) => (
        <p>{operation.reference_id && operation.reference_id.name}</p>
      ),
      sortable: true,
    },
    {
      name: "Sifariş təyinatı",
      selector: "description",
      sortable: true,
    },
    {
      name: "Məbləğ",
      cell: (operation) => {
        if (operation.amount == null) {
          return "Təyin edilməyib";
        } else {
          return operation.amount;
        }
      },
      sortable: true,
    },

    {
      name: "İcra vəziyyəti",

      cell: (row) => {
        if (row.executivePositionn === 0) {
          return (
            <button
              className="btn btn-danger mb-2 mr-2 rounded-circle text-center"
              title="Hazırlıq mərhələsindədir"
              style={{ marginLeft: "18px" }}
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
                className="feather feather-sun"
              >
                <circle cx={12} cy={12} r={5} />
                <line x1={12} y1={1} x2={12} y2={3} />
                <line x1={12} y1={21} x2={12} y2={23} />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1={1} y1={12} x2={3} y2={12} />
                <line x1={21} y1={12} x2={23} y2={12} />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
          );
        } else if (row.executivePositionn === 1) {
          return (
            <button
              title="İcra edilir"
              className="btn btn-info mb-2 mr-2 rounded-circle text-center"
              style={{ marginLeft: "18px" }}
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
                className="feather feather-sun"
              >
                <circle cx={12} cy={12} r={5} />
                <line x1={12} y1={1} x2={12} y2={3} />
                <line x1={12} y1={21} x2={12} y2={23} />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1={1} y1={12} x2={3} y2={12} />
                <line x1={21} y1={12} x2={23} y2={12} />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
          );
        } else {
          return (
            <button
              className="btn btn-success mb-2 mr-2 bs-tooltip  rounded-circle text-center"
              style={{ marginLeft: "18px" }}
              title="İcra edildi"

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
                className="feather feather-sun"
              >
                <circle cx={12} cy={12} r={5} />
                <line x1={12} y1={1} x2={12} y2={3} />
                <line x1={12} y1={21} x2={12} y2={23} />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1={1} y1={12} x2={3} y2={12} />
                <line x1={21} y1={12} x2={23} y2={12} />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </svg>
            </button>
          );
        }
      },
    },
    {
      name: " ",
      cell: (operation) => (
        <div className="action-btn">
          <svg
            onClick={() => {
              dispatch(
                openModal({
                  modalType: "OperationPageModal",
                  modalProps: { operation },
                })
              );
            }}
            data-name="edit"
            id={operation.id}
            onMouseEnter={(e) => {
              sethover(true);
              setTarget({
                ...target,
                id: e.target.id,
                name: e.target.getAttribute("data-name"),
              });
              // console.log(e.target.getAttribute('data-name'))
            }}
            onMouseLeave={() => {
              sethover(false);
              setTarget();
            }}
            style={{
              ...buttonStyle1,
              ...(hover &&
                target.id === `${operation.id}` &&
                target.name === "edit" &&
                buttonHover),
            }}
            type="button"
            className="icon-hover btn btn-rounded btn-primary mb-2 mr-4"
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
            data-name="delete"
            id={operation.id}
            onClick={() => {
              if (
                prompt(`Zəhmət olmasa silmək üçün şifrəni daxil edin`) == 9519
              ) {
                dispatch(deleteOperation(operation.id));
              } else {
                toast.info(
                  "Silmək cəhtiniz uğursuzdur, silmək üçün düzgün şifrə daxil edin."
                );
              }
            }}
            onMouseEnter={(e) => {
              sethover(true);
              setTarget({
                ...target,
                id: e.target.id,
                name: e.target.getAttribute("data-name"),
              });
              // console.log(e.target.getAttribute('data-name'))
            }}
            onMouseLeave={() => {
              sethover(false);
              setTarget();
            }}
            style={{
              ...buttonStyle1,
              ...(hover &&
                target.id === `${operation.id}` &&
                target.name === "delete" &&
                buttonHover),
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
      ),
    },
  ];

  return (
    <React.Fragment>
      {/* BEGIN ORDERPAGE CONTAINER */}
      <div className="layout-px-spacing">
        <div className="row layout-top-spacing">
          <div className="col-xl-12 col-lg-12 col-sm-12  layout-spacing">
            <div className="widget-content widget-content-area br-6">
              <DataTable
                // className="dataTables_wrapper container-fluid dt-bootstrap4 table-responsive"
                // selectableRows
                title="Əməliyyatlar"
                columns={columns}
                data={data}
                pagination
                paginationServer
                paginationTotalRows={totalCount}
                paginationDefaultPage={PageNumber}
                onChangeRowsPerPage={handlePerRowsChange}
                onChangePage={handlePageChange}
                highlightOnHover
                Clicked
                // actions={actions}
              />
            </div>
          </div>
        </div>
      </div>
      {/* END ORDERPAGE CONTAINER */}
    </React.Fragment>
  );
}
