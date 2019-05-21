import {
  SHOPPING_LIST_LOADED_ALL,
  SHOPPING_LIST_ITEM_UPDATED,
  SHOPPING_LIST_ITEM_ADDED,
  SHOPPING_LIST_ITEM_REMOVED,
  SHOPPING_LIST_UPDATED,
  SHOPPING_LIST_CREATED,
  SHOPPING_LIST_REMOVED
} from '../types';

export default (state = [], action) => {
  switch (action.type) {
    case SHOPPING_LIST_UPDATED:
      return [
        ...state.map(shoppingList =>
          shoppingList._id === action.shoppingList._id
            ? { ...action.shoppingList }
            : shoppingList
        )
      ];

    case SHOPPING_LIST_REMOVED:
      return [...state.filter(c => c._id !== action.id)];

    case SHOPPING_LIST_CREATED:
      return [...state, action.shoppingList];

    case SHOPPING_LIST_LOADED_ALL:
      return [...action.shoppingLists];

    case SHOPPING_LIST_ITEM_UPDATED:
      return [
        ...state.map(shoppingList =>
          shoppingList._id === action.id
            ? {
                ...shoppingList,
                items: shoppingList.items.map(item =>
                  item._id === action.item._id
                    ? { ...item, ...action.item }
                    : item
                )
              }
            : shoppingList
        )
      ];

    case SHOPPING_LIST_ITEM_ADDED:
      return [
        ...state.map(shoppingList =>
          shoppingList._id === action.id
            ? { ...shoppingList, items: [...shoppingList.items, action.item] }
            : shoppingList
        )
      ];

    case SHOPPING_LIST_ITEM_REMOVED:
      return [
        ...state.map(shoppingList =>
          shoppingList._id === action.id
            ? {
                ...shoppingList,
                items: shoppingList.items.filter(i => i._id !== action.itemId)
              }
            : shoppingList
        )
      ];

    default:
      return state;
  }
};
