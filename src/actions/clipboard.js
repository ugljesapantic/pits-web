import { 
    CLIPBOARD_UPDATED,
    CLIPBOARD_LOADED_ALL,
    CLIPBOARD_LOADED_ALL_LABELS,
    CLIPBOARD_ITEM_UPDATED,
    CLIPBOARD_ITEM_ADDED,
    CLIPBOARD_ITEM_REMOVED,
    CLIPBOARD_LABEL_ADDED,
    CLIPBOARD_LABEL_REMOVED
 } from "../types";
import api from "../api";

export const clipboardLoadedAll = clipboards => ({
    type: CLIPBOARD_LOADED_ALL,
    clipboards,
})

export const clipboardUpdated = clipboard => ({
    type: CLIPBOARD_UPDATED,
    clipboard,
})

export const clipboardLabelsLoadedAll = labels => ({
    type: CLIPBOARD_LOADED_ALL_LABELS,
    labels,
})

export const itemUpdated = (item, id) => ({
    type: CLIPBOARD_ITEM_UPDATED,
    item,
    id
})

// todo maybe everywhere id should go first
export const itemRemoved = (id, itemId) => ({
    type: CLIPBOARD_ITEM_REMOVED,
    itemId,
    id
})

export const itemAdded = (item, id) => ({
    type: CLIPBOARD_ITEM_ADDED,
    item,
    id
})

export const labelAdded = (label) => ({
    type: CLIPBOARD_LABEL_ADDED,
    label
})

export const labelRemoved = (id) => ({
    type: CLIPBOARD_LABEL_REMOVED,
    id
})

export const loadAll = () => dispatch => api.clipboard.loadAll().then(clipboards => {
    dispatch(clipboardLoadedAll(clipboards));
})

export const loadAllLabels = () => dispatch => api.clipboard.loadAllLabels().then(labels => {
    dispatch(clipboardLabelsLoadedAll(labels));
})

// maybe make them the same, updateItem method + updatedItem action
export const updateItem = (id, itemId, body) => dispatch => api.clipboard.updateItem(id, itemId, body).then(item => {
    dispatch(itemUpdated(item, id));
})

export const removeItem = (id, itemId) => dispatch => api.clipboard.removeItem(id, itemId).then(() => {
    dispatch(itemRemoved(id, itemId));
})

export const addItem = (id) => dispatch => api.clipboard.addItem(id).then(item => dispatch(itemAdded(item, id)))

export const addLabel = (body) => dispatch => api.clipboard.addLabel(body).then(label => dispatch(labelAdded(label)))

export const removeLabel = (id) => dispatch => api.clipboard.removeLabel(id).then(() => dispatch(labelRemoved(id)))

export const update = (id, body) => dispatch => api.clipboard.update(id, body).then(clipboard => dispatch(clipboardUpdated(clipboard)))


