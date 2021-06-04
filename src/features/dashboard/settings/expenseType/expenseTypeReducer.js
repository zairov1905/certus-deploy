import { CREATE_EXPENSE_TYPE, DELETE_EXPENSE_TYPE, FETCH_EXPENSE_TYPE, UPDATE_EXPENSE_TYPE } from "./expenseTypeConstants";


const initialState = {
  expenseTypes: []
};

export default function expenseTypeReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_EXPENSE_TYPE:
      return {
        ...state,
        expenseTypes: [...state.expenseTypes, payload],
      };
    case UPDATE_EXPENSE_TYPE:
      return {
        ...state,
        expenseTypes: [
          ...state.expenseTypes.filter((expenseType) => expenseType.id !== payload.id),
          payload,
        ],
      };

    case DELETE_EXPENSE_TYPE:
      return {
        ...state,
        expenseTypes: [...state.expenseTypes.filter((expenseType) => expenseType.id !== payload)],
      };
    case FETCH_EXPENSE_TYPE:
      return {
        ...state,
        expenseTypes: payload,
      };
    default:
      return state;
  }
}
