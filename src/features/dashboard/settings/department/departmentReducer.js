import { CREATE_DEPARTMENT, DELETE_DEPARTMENT, FETCH_DEPARTMENT, UPDATE_DEPARTMENT } from "./departmentConstants";


const initialState = {
  departments: []
};

export default function departmentReducer(state = initialState, { type, payload,totalCount }) {
  switch (type) {
    case CREATE_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments, payload],
      };
    case UPDATE_DEPARTMENT:
      return {
        ...state,
        departments: [
          ...state.departments.filter((department) => department.id !== payload.id),
          payload,
        ],
      };

    case DELETE_DEPARTMENT:
      return {
        ...state,
        departments: [...state.departments.filter((department) => department.id !== payload)],
      };
    case FETCH_DEPARTMENT:
      return {
        ...state,
        departments: payload,
        totalCount:totalCount
      };
    default:
      return state;
  }
}
