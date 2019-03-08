import { 
    SHOPPING_LIST_UPDATED,
    SHOPPING_LIST_LOADED_ALL,
    SHOPPING_LIST_ITEM_UPDATED,
    SHOPPING_LIST_ITEM_ADDED,
    SHOPPING_LIST_ITEM_REMOVED,
    SHOPPING_LIST_CREATED,
    SHOPPING_LIST_REMOVED
 } from "../types";
import api from "../api";

export const loadedAll = shoppingLists => ({
    type: SHOPPING_LIST_LOADED_ALL,
    shoppingLists,
})

export const updated = shoppingList => ({
    type: SHOPPING_LIST_UPDATED,
    shoppingList,
})

export const created = shoppingList => ({
    type: SHOPPING_LIST_CREATED,
    shoppingList,
})

export const removed = id => ({
    type: SHOPPING_LIST_REMOVED,
    id,
})

export const itemUpdated = (item, id) => ({
    type: SHOPPING_LIST_ITEM_UPDATED,
    item,
    id
})

// todo maybe everywhere id should go first
export const itemRemoved = (id, itemId) => ({
    type: SHOPPING_LIST_ITEM_REMOVED,
    itemId,
    id
})

export const itemAdded = (item, id) => ({
    type: SHOPPING_LIST_ITEM_ADDED,
    item,
    id
})

export const shoppingListLoadAll = () => dispatch => api.shoppingList.loadAll().then(shoppingLists => {
    dispatch(loadedAll(shoppingLists));
})

// maybe make them the same, updateItem method + updatedItem action
export const shoppingListUpdateItem = (id, itemId, body) => dispatch => api.shoppingList.updateItem(id, itemId, body).then(item => {
    dispatch(itemUpdated(item, id));
})

export const shoppingListRemoveItem = (id, itemId) => dispatch => api.shoppingList.removeItem(id, itemId).then(() => {
    dispatch(itemRemoved(id, itemId));
})

export const shoppingListAddItem = (id, title) => dispatch => api.shoppingList.addItem(id, title).then(item => dispatch(itemAdded(item, id)))

export const shoppingListUpdate = (id, body) => dispatch => api.shoppingList.update(id, body).then(shoppingList => dispatch(updated(shoppingList)))

export const shoppingListCreate = (body) => dispatch => api.shoppingList.create(body).then(shoppingList => dispatch(created(shoppingList)))

export const shoppingListRemove = (id) => dispatch => api.shoppingList.remove(id).then(() => dispatch(removed(id)))
