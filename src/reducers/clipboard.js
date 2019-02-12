import { CLIPBOARD_LOADED_ALL } from '../types';

const initialState = {
  clipboards: []
}

export default (state = initialState, action) => {
  switch (action.type) {
     
  case CLIPBOARD_LOADED_ALL:

    return {clipboards: [...action.clipboards]};

  default:
    return state
  }
}
