import axios from "axios";
import { toast } from "react-toastify";
import { fetchSampleDataDepartments } from "../../../../app/api/mockApi";

import {
  APP_LOADED,
  asyncActionError,
  asyncActionFinish,
  asyncActionStart,
} from "../../../../app/async/asyncReducer";
import { delay } from "../../../../app/util/util";
import {
  CREATE_DEPARTMENT,
  DELETE_DEPARTMENT,
  FETCH_DEPARTMENT,
  UPDATE_DEPARTMENT,
} from "./departmentConstants";

export function loadDepartments(data) {
  return async function (dispatch) {
    dispatch(asyncActionStart());

    const departments = await axios.get("/structural_section", {
      params: { ...data },
    });
    if (departments.status === 200) {
      dispatch({
        type: FETCH_DEPARTMENT,
        payload: departments.data.data,
        totalCount: departments.data.message,
      });
      dispatch(asyncActionFinish());
    } else {
      dispatch(asyncActionError());
    }
  };
}
export function listenToDepartment(departments) {
  return {
    type: FETCH_DEPARTMENT,
    payload: departments,
  };
}

export function createDepartment(departments) {
  return async function (dispatch) {
    dispatch(asyncActionStart());
    const data = await axios.post("structural_section/create", departments, {
      withCredentials: true,
    });

    if (data.status === 201) {
      console.log(data.data.data );

      toast.success("Uğurla əlavə edildi");
      dispatch({ type: CREATE_DEPARTMENT, payload: data.data.data });
      dispatch(asyncActionFinish());
    } else {
      toast.danger("Xəta baş verdi, yenidən cəht edin.");
    }
  };
}

export function updateDepartment(department) {
  return async function (dispatch) {
    dispatch(asyncActionStart);

    const departmentUptaded = await axios.put(
      "/structural_section/update",
      department
    );
    console.log(departmentUptaded)
    if (departmentUptaded.status === 200) {
      toast.success("Dəyişiklik uğurlar yerinə yetirildi");
      dispatch({
        type: UPDATE_DEPARTMENT,
        payload: departmentUptaded.data.data,
      });
      dispatch(asyncActionFinish());
    } else {
      asyncActionError();
    }
  };
}

export function deleteDepartment(departmentId) {
    return async function (dispatch) {
        const documentDeleted = await axios.delete(
          `/structural_section/delete?id=${departmentId}`
        );
        console.log(documentDeleted);
        if (documentDeleted.status === 200) {
    
          dispatch({ type: DELETE_DEPARTMENT, payload: departmentId });
          // dispatch(asyncActionFinish())
          toast.info("Uğurla silindi");
        } else {
          dispatch(asyncActionError());
        }
      };
}
