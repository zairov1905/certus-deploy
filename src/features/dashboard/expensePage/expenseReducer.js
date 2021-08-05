import { sampleDataExpense } from "../../../app/api/sampleDataExpense";
import {
  CREATE_EXPENSE,
  DELETE_EXPENSE,
  FETCH_EXPENSE,
  UPDATE_EXPENSE,
} from "./expenseConstants";

const initialState = {
  expenses: []
};

export default function expenseReducer(state = initialState, { type, payload,totalCount}) {
  switch (type) {
    case CREATE_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses, payload],
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        expenses: [
          ...state.expenses.filter((expense) => expense.id !== payload.id),
          payload,
        ],
      };

    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: [...state.expenses.filter((expense) => expense.id !== payload)],
      };
    case FETCH_EXPENSE:
      return {
        ...state,
        expenses: payload,
        totalCount:totalCount
      };
    default:
      return state;
  }
}
