import {
  CREATE_CRM,
  DELETE_CRM,
  FETCH_CRM,
  UPDATE_CRM,
} from "./crmConstants";

const initialState = {
  crms: []
};

export default function crmReducer(state = initialState, { type, payload,totalCount }) {
  switch (type) {
    case CREATE_CRM:
      return {
        ...state,
        crms: [...state.crms, payload],
      };
    case UPDATE_CRM:
      return {
        ...state,
        crms: [
          ...state.crms.filter((crm) => crm.id !== payload.id),
          payload,
        ],
      };

    case DELETE_CRM:
      return {
        ...state,
        crms: [...state.crms.filter((crm) => crm.id !== payload)],
      };
    case FETCH_CRM:
      return {
        ...state,
        crms: payload,
        totalCount:totalCount
      };
    default:
      return state;
  }
}
