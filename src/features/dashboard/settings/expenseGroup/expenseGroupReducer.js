import { CREATE_EXPENSE_GROUP, DELETE_EXPENSE_GROUP, FETCH_EXPENSE_GROUP, UPDATE_EXPENSE_GROUP } from "./expenseGroupConstants";


const initialState = {
  expenseGroups: []
};

export default function expenseGroupReducer(state = initialState, { type, payload,totalCount }) {
  switch (type) {
    case CREATE_EXPENSE_GROUP:
      return {
        ...state,
        expenseGroups: [...state.expenseGroups, payload],
      };
    case UPDATE_EXPENSE_GROUP:
      return {
        ...state,
        expenseGroups: [
          ...state.expenseGroups.filter((expenseGroup) => expenseGroup.id !== payload.id),
          payload,
        ],
      };

    case DELETE_EXPENSE_GROUP:
      return {
        ...state,
        expenseGroups: [...state.expenseGroups.filter((expenseGroup) => expenseGroup.id !== payload)],
      };
    case FETCH_EXPENSE_GROUP:
      return {
        ...state,
        expenseGroups: payload,
        totalCount:totalCount
      };
    default:
      return state;
  }
}
