import { CREATE_SIGN_OF_LEGAL_ACT, DELETE_SIGN_OF_LEGAL_ACT, FETCH_SIGN_OF_LEGAL_ACT, UPDATE_SIGN_OF_LEGAL_ACT } from "./signOfLegalActConstants";


const initialState = {
  signOfLegalActs: []
};

export default function signOfLegalActReducer(state = initialState, { type, payload,totalCount }) {
  switch (type) {
    case CREATE_SIGN_OF_LEGAL_ACT:
      return {
        ...state,
        signOfLegalActs: [...state.signOfLegalActs, payload],
      };
    case UPDATE_SIGN_OF_LEGAL_ACT:
      return {
        ...state,
        signOfLegalActs: [
          ...state.signOfLegalActs.filter((signOfLegalAct) => signOfLegalAct.id !== payload.id),
          payload,
        ],
      };

    case DELETE_SIGN_OF_LEGAL_ACT:
      return {
        ...state,
        signOfLegalActs: [...state.signOfLegalActs.filter((signOfLegalAct) => signOfLegalAct.id !== payload)],
      };
    case FETCH_SIGN_OF_LEGAL_ACT:
      return {
        ...state,
        signOfLegalActs: payload,
        totalCount:totalCount
      };
    default:
      return state;
  }
}
