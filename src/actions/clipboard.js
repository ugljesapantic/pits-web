import { CLIPBOARD_LOADED_ALL, CLIPBOARD_LOADED_ALL_LABELS, CLIPBOARD_ITEM_UPDATED } from "../types";
import api from "../api";

export const clipboardLoadedAll = clipboards => ({
    type: CLIPBOARD_LOADED_ALL,
    clipboards,
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


