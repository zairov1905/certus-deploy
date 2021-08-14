import React, { useEffect, useState } from "react";
import DataTable, { defaultThemes } from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../app/modal/modalReducer";
import { loadDocs } from "../docPage/docActions";
import { loadCounterparty } from "../settings/counterparty/counterpartyActions";
import { loadExpenseGroup } from "../settings/expenseGroup/expenseGroupActions";
import { loadExpenseType } from "../settings/expenseType/expenseTypeActions";

import { deleteExpense, loadExpense } from "./expenseActions";
export default function ExpensePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadExpense());
    //   // return () => {
    //   //   // dispatch(loadOrder())
    //   // }
  }, []);
  const [perPage, setPerPage] = useState(10);
  const [PageNumber, setPageNumber] = useState(1);
  const { expenses,totalCount } = useSelector((state) => state.expenses);
  const [hover, sethover] = useState(false);
  const [target, setTarget] = useState({ id: null, name: null });

  const data = expenses;
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
    dispatch(loadExpense({ s: page, take: perPage }));
    setPageNumber(page);
  };

  const handlePerRowsChange = async (newPerPage, page) => {
    dispatch(loadExpense({ s: page, take: newPerPage }));
    setPerPage(newPerPage);
  };
  const actions = (
    <svg
      data-name="add"
      onClick={() => {
        dispatch(
          openModal({
            modalType: "ExpensePageModal",
            modalProps: null,
          })
        );
        dispatch(loadCounterparty());
        dispatch(loadExpenseGroup());
        dispatch(loadExpenseType());
        dispatch(loadDocs());
      }}
      style={{
        ...buttonStyle,
        ...(hover && target.name === "add" && buttonHover),
      }}
      onMouseEnter={(e) => {
        sethover(true);
        setTarget({
          ...target,
          name: e.target.getAttribute("data-name"),
        });
      }}
      onMouseLeave={() => {
        sethover(false);
        setTarget(null);
      }}
      type="button"
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather mr-4 feather-plus icon-container"
      data-toggle="modal"
      data-target="#exampleModal"
    >
      <line x1={12} y1={5} x2={12} y2={19} />
      <line x1={5} y1={12} x2={19} y2={12} />
    </svg>
  );

  const columns = [
    {
      name: "Gəlir-Xərc qrupu",
      sortable: true,
      cell:expense=>(
        <p>{expense.income_expense_group_id.name}</p>
      )
    },
    {
      name: "Gəlir-Xərc növü",
      selector: "expense_type_id",
      sortable: true,
      cell:expense=>(
        <p>{expense.expense_type_id && expense.expense_type_id.name}</p>
      )
    },
    {
      name: "Tarix",
      selector: "date",
      sortable: true,
    },
    {
      name: "Kontragent",
      sortable: true,
      cell:expense=>(
        <p>{expense.contractor_id.name}</p>
      )
      
    },
    {
      name: "Müqavilə",
      selector: "document_id",
      cell:expense=>(
        <p>{expense.document_id && expense.document_id.document_number}</p>
      ),
      sortable: true,
    },
    {
      name: "Əməliyyat növü",
      selector: "expenseInvoice",
      sortable: true,
      cell:expense => (
        expense.operation_id === 0  ? <span className="badge badge-danger">{expense.faktura}</span> : <span className="badge badge-success">{expense.faktura}</span>
      )
    },
    {
      name: "",
      cell: (expense) => (
        <div className="action-btn">
          <svg
            onClick={() => {
              dispatch(
                openModal({
                  modalType: "ExpensePageModal",
                  modalProps: { expense },
                })
              );
              dispatch(loadCounterparty());
              dispatch(loadExpenseGroup());
              dispatch(loadExpenseType());
              dispatch(loadDocs());
              // dispatch(loadEmployees());
            }}
            data-name="edit"
            id={expense.id}
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
                target.id === `${expense.id}` &&
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
            id={expense.id}
            onClick={() => {
              dispatch(deleteExpense(expense.id));
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
                target.id === `${expense.id}` &&
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
                title="Gəlir-Xərc"
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
                actions={actions}
              />
            </div>
          </div>
        </div>
      </div>
      {/* END ORDERPAGE CONTAINER */}
    </React.Fragment>
  );
}
