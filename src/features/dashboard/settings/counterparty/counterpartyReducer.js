import { CREATE_COUNTERPARTY, DELETE_COUNTERPARTY, FETCH_COUNTERPARTY, UPDATE_COUNTERPARTY } from "./counterpartyConstants";


const initialState = {
  counterparties: []
};

export default function counterpartyReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_COUNTERPARTY:
      return {
        ...state,
        counterparties: [...state.counterparties, payload],
      };
    case UPDATE_COUNTERPARTY:
      return {
        ...state,
        counterparties: [
          ...state.counterparties.filter((counterparty) => counterparty.id !== payload.id),
          payload,
        ],
      };

    case DELETE_COUNTERPARTY:
      return {
        ...state,
        counterparties: [...state.counterparties.filter((counterparty) => counterparty.id !== payload)],
      };
    case FETCH_COUNTERPARTY:
      return {
        ...state,
        counterparties: payload,
      };
    default:
      return state;
  }
}
