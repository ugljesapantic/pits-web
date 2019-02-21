import {
  CLIPBOARD_LOADED_ALL,
   CLIPBOARD_LOADED_ALL_LABELS,
   CLIPBOARD_ITEM_UPDATED,
   CLIPBOARD_ITEM_ADDED,
  CLIPBOARD_ITEM_REMOVED,
  CLIPBOARD_LABEL_ADDED,
CLIPBOARD_LABEL_REMOVED } from '../types';

const initialState = {
  clipboards: [],
  labels: []
}

export default (state = initialState, action) => {
  switch (action.type) {

  case CLIPBOARD_LABEL_ADDED:
    return {...state, labels: [...state.labels, action.label]};

  case CLIPBOARD_LABEL_REMOVED:
    return {...state, labels: state.labels.filter(l => l._id !== action.id)};
     
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

  case CLIPBOARD_ITEM_ADDED:
    return {...state, clipboards: state.clipboards.map(clipboard => 
        clipboard._id === action.id ? 
        {...clipboard, items: [...clipboard.items, action.item]} 
        : clipboard
      )}

      // TODO consider using 
  case CLIPBOARD_ITEM_REMOVED:
    return {...state, clipboards: state.clipboards.map(clipboard => 
        clipboard._id === action.id ? 
        {...clipboard, items: clipboard.items.filter(i => i._id !== action.itemId)} 
        : clipboard
      )}

  default:
    return state
  }
}
