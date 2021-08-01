import { sampleDataLab } from "../../../app/api/sampleDataLab";
import {
  CREATE_LAB,
  DELETE_LAB,
  FETCH_LAB,
  UPDATE_LAB,
} from "./labConstants";

const initialState = {
  labs: []
};

export default function labReducer(state = initialState, { type, payload,totalCount}) {
  switch (type) {
    case CREATE_LAB:
      return {
        ...state,
        labs: [...state.labs, payload],
      };
    case UPDATE_LAB:
      return {
        ...state,
        labs: [
          ...state.labs.filter((lab) => lab.id !== payload.id),
          payload,
        ],
      };

    case DELETE_LAB:
      return {
        ...state,
        labs: [...state.labs.filter((lab) => lab.id !== payload)],
      };
    case FETCH_LAB:
      return {
        ...state,
        labs: payload,
        totalCount:totalCount
      };
    default:
      return state;
  }
}
