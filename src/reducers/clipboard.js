import { CLIPBOARD_LOADED_ALL, CLIPBOARD_LOADED_ALL_LABELS, CLIPBOARD_ITEM_UPDATED } from '../types';

const initialState = {
  clipboards: [],
  labels: []
}

export default (state = initialState, action) => {
  console.log(state, action)
  switch (action.type) {
     
  case CLIPBOARD_LOADED_ALL:
    return {...state, clipboards: [...action.clipboards]};

  case CLIPBOARD_LOADED_ALL_LABELS:
    return {...state, labels: [...action.labels]};

  case CLIPBOARD_ITEM_UPDATED:
    return {...state, clipboards: state.clipboards.map(clipboard => 
        clipboard._id === action.id ? 
        {...clipboard, items: clipboard.items.map(item => 
          item._id === action.item._id ?
          {...item, ...action.item} 
          : item)} 
        : clipboard
      )}

  default:
    return state
  }
}
