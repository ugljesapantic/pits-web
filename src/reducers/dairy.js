import {
  DAIRY_LOADED_ALL,
  DAIRY_UPDATED,
  DAIRY_CREATED,
  DAIRY_REMOVED,
  DAIRY_LOAD
} from '../types';

export default (state = [], action) => {
  switch (action.type) {
    case DAIRY_UPDATED:
      return [
        ...state.map(dairy =>
          dairy._id === action.dairy._id ? { ...action.dairy } : dairy
        )
      ];

    case DAIRY_REMOVED:
      return [...state.filter(d => d._id !== action.id)];

    case DAIRY_CREATED:
      return [...state, action.dairy];

    case DAIRY_LOAD:
      return [];

    case DAIRY_LOADED_ALL:
      return [...action.dairies];

    default:
      return state;
  }
};
