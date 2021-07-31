import { CREATE_DOC, DELETE_DOC, FETCH_DOC, UPDATE_DOC } from "./docConstants";
const initialState = {
  docs: [],
};

export default function docReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case CREATE_DOC:
      return {
        ...state,
        docs: [...state.docs, payload],
      };
    case UPDATE_DOC:
      return {
        ...state,
        docs: [...state.docs.filter((doc) => doc.id !== payload.id), payload],
      };

    case DELETE_DOC:
      return {
        ...state,
        docs: [...state.docs.filter((doc) => doc.id !== payload)],
      };
    case FETCH_DOC:
      return {
        ...state,
        docs: payload,
        totalCount: totalCount,
      };
    default:
      return state;
  }
}
