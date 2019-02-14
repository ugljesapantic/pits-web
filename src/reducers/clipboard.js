import { CLIPBOARD_LOADED_ALL, CLIPBOARD_LOADED_ALL_LABELS } from '../types';

const initialState = {
  clipboards: [],
  labels: []
}

export default (state = initialState, action) => {
  switch (action.type) {
     
  case CLIPBOARD_LOADED_ALL:
    return {...state, clipboards: [...action.clipboards]};

  case CLIPBOARD_LOADED_ALL_LABELS:
    return {...state, labels: [...action.labels]};

  default:
    return state
  }
}
