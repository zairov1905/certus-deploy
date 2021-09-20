import { sampleData } from "../../../app/api/sampleData";
import {
  CREATE_EMPLOYEES,
  DELETE_EMPLOYEES,
  FETCH_EMPLOYEES,
  UPDATE_EMPLOYEES,
} from "./employeesConstants";

const initialState = {
  employees: [],
};

export default function employeesReducer(
  state = initialState,
  { type, payload,totalCount }
) {
  switch (type) {
    case CREATE_EMPLOYEES:
      return {
        ...state,
        employees: [...state.employees, payload],
      };

    case UPDATE_EMPLOYEES:
      return {
        ...state,
        employees: [
          ...state.employees.filter((employee) => employee.id !== payload.id),
          payload,
        ],
      };
    case DELETE_EMPLOYEES:
      // console.log('silindi')
      return {
        ...state,
        employees: [
          ...state.employees.filter((employee) => employee.id !== payload),
        ],
      };
    case FETCH_EMPLOYEES:
      return {
        ...state,
        employees: payload,
        totalCount:totalCount
      };
    default:
      return state;
  }
}
