import {
  CREATE_TRAINING,
  DELETE_TRAINING,
  FETCH_TRAINING,
  UPDATE_TRAINING,
} from "./trainingConstants";

const initialState = {
  trainings: [],
};

export default function trainingReducer(
  state = initialState,
  { type, payload, totalCount }
) {
  switch (type) {
    case CREATE_TRAINING:
      return {
        ...state,
        trainings: [...state.trainings, payload],
      };
    case UPDATE_TRAINING:
      return {
        ...state,
        trainings: [
          ...state.trainings.filter((training) => training.id !== payload.id),
          payload,
        ],
      };

    case DELETE_TRAINING:
      return {
        ...state,
        trainings: [
          ...state.trainings.filter((training) => training.id !== payload),
        ],
      };
    case FETCH_TRAINING:
      return {
        ...state,
        trainings: payload,
        totalCount: totalCount,
      };
    default:
      return state;
  }
}
