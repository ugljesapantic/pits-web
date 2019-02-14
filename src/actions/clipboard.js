import { CLIPBOARD_LOADED_ALL, CLIPBOARD_LOADED_ALL_LABELS } from "../types";
import api from "../api";

export const clipboardLoadedAll = clipboards => ({
    type: CLIPBOARD_LOADED_ALL,
    clipboards,
})

export const clipboardLabelsLoadedAll = labels => ({
    type: CLIPBOARD_LOADED_ALL_LABELS,
    labels,
})

export const loadAll = () => dispatch => api.clipboard.loadAll().then(clipboards => {
    dispatch(clipboardLoadedAll(clipboards));
})

export const loadAllLabels = () => dispatch => api.clipboard.loadAllLabels().then(labels => {
    dispatch(clipboardLabelsLoadedAll(labels));
})


