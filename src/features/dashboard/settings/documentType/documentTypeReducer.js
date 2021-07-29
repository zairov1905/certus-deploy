import { CREATE_DOCUMENTTYPE, DELETE_DOCUMENTTYPE, FETCH_DOCUMENTTYPE, UPDATE_DOCUMENTTYPE } from "./documentTypeConstants";


const initialState = {
  documentTypes: []
};

export default function documentTypesReducer(state = initialState, { type, payload,totalCount }) {
  switch (type) {
    case CREATE_DOCUMENTTYPE:
      return {
        ...state,
        documentTypes: [...state.documentTypes, payload],
      };
    case UPDATE_DOCUMENTTYPE:
      return {
        ...state,
        documentTypes: [
          ...state.documentTypes.filter((documentType) => documentType.id !== payload.id),
          payload,
        ],
      };

    case DELETE_DOCUMENTTYPE:
      return {
        ...state,
        documentTypes: [...state.documentTypes.filter((documentType) => documentType.id !== payload)],
      };
    case FETCH_DOCUMENTTYPE:
      return {
        ...state,
        documentTypes: payload,
        totalCount:totalCount
      };
    default:
      return state;
  }
}
