import { CREATE_REFERENCE, DELETE_REFERENCE, FETCH_REFERENCE, UPDATE_REFERENCE } from "./referenceConstants";


const initialState = {
  references: []
};

export default function referenceReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_REFERENCE:
      return {
        ...state,
        references: [...state.references, payload],
      };
    case UPDATE_REFERENCE:
      return {
        ...state,
        references: [
          ...state.references.filter((reference) => reference.id !== payload.id),
          payload,
        ],
      };

    case DELETE_REFERENCE:
      return {
        ...state,
        references: [...state.references.filter((reference) => reference.id !== payload)],
      };
    case FETCH_REFERENCE:
      return {
        ...state,
        references: payload,
      };
    default:
      return state;
  }
}
