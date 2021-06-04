import React from "react";
import { useDispatch } from "react-redux";
import { closeModal } from "./modalReducer";

export default function ModalWrapper({ children, size, header, footer }) {
  const dispatch = useDispatch();

  return (
    <div
      className="modal fade"
      id="exampleModal"
      // tabIndex={-1}
      // role="dialog"
      aria-labelledby="exampleModalLabel"
      // aria-hidden="true"
      onClose={() =>
        setTimeout(function () {
          dispatch(closeModal());
        }, 0)
      }
      data-backdrop="static"
      data-keyboard="false"
    >
      <div
        className={`modal-dialog ${size} modal-dialog-centered`}
        role="document"
      >
        <div className="modal-content">
          <div className="modal-header">
            {header && (
              <h5 className="modal-title" id="exampleModalLabel">
                {header}
              </h5>
            )}
            <button
              onClick={() => {
                dispatch(closeModal());
              }}
              type="button"
              className="close"
              data-dismiss="modal"
              aria-label="Close"
              form="emp"
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
                className="feather feather-x-circle"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            </button>
          </div>
          <div className="modal-body">{children}</div>
          {/* <div className="modal-footer">
            <button onClick={()=>{dispatch(closeModal())}} className="btn" data-dismiss="modal">
              <i className="flaticon-cancel-12" /> Ləğv et
            </button>
            <button type="button" className="btn btn-primary">
              Yadda saxla 
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
}
