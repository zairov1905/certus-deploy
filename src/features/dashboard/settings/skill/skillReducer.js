import { CREATE_SKILL, DELETE_SKILL, FETCH_SKILL, UPDATE_SKILL } from "./skillConstants";


const initialState = {
  skills: []
};

export default function skillReducer(state = initialState, { type, payload }) {
  switch (type) {
    case CREATE_SKILL:
      return {
        ...state,
        skills: [...state.skills, payload],
      };
    case UPDATE_SKILL:
      return {
        ...state,
        skills: [
          ...state.skills.filter((skill) => skill.id !== payload.id),
          payload,
        ],
      };

    case DELETE_SKILL:
      return {
        ...state,
        skills: [...state.skills.filter((skill) => skill.id !== payload)],
      };
    case FETCH_SKILL:
      return {
        ...state,
        skills: payload,
      };
    default:
      return state;
  }
}
