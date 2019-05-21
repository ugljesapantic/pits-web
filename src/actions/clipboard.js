import {
  CLIPBOARD_UPDATED,
  CLIPBOARD_LOADED_ALL,
  CLIPBOARD_LOADED_ALL_LABELS,
  CLIPBOARD_ITEM_UPDATED,
  CLIPBOARD_ITEM_ADDED,
  CLIPBOARD_ITEM_REMOVED,
  CLIPBOARD_LABEL_ADDED,
  CLIPBOARD_LABEL_REMOVED,
  CLIPBOARD_CREATED,
  CLIPBOARD_REMOVED
} from '../types';
import api from '../api';

export const clipboardLoadedAll = clipboards => ({
  type: CLIPBOARD_LOADED_ALL,
  clipboards
});

export const clipboardUpdated = clipboard => ({
  type: CLIPBOARD_UPDATED,
  clipboard
});

export const clipboardCreated = clipboard => ({
  type: CLIPBOARD_CREATED,
  clipboard
});

export const clipboardRemoved = id => ({
  type: CLIPBOARD_REMOVED,
  id
});

export const clipboardLabelsLoadedAll = labels => ({
  type: CLIPBOARD_LOADED_ALL_LABELS,
  labels
});

export const itemUpdated = (item, id) => ({
  type: CLIPBOARD_ITEM_UPDATED,
  item,
  id
});

// todo maybe everywhere id should go first
export const itemRemoved = (id, itemId) => ({
  type: CLIPBOARD_ITEM_REMOVED,
  itemId,
  id
});

export const itemAdded = (item, id) => ({
  type: CLIPBOARD_ITEM_ADDED,
  item,
  id
});

export const labelAdded = label => ({
  type: CLIPBOARD_LABEL_ADDED,
  label
});

export const labelRemoved = id => ({
  type: CLIPBOARD_LABEL_REMOVED,
  id
});

export const loadAllClipboards = () => dispatch =>
  api.clipboard.loadAll().then(clipboards => {
    dispatch(clipboardLoadedAll(clipboards));
  });

export const loadAllClipboardLabels = () => dispatch =>
  api.clipboard.loadAllLabels().then(labels => {
    dispatch(clipboardLabelsLoadedAll(labels));
  });

// maybe make them the same, updateItem method + updatedItem action
export const updateClipboardItem = (id, itemId, body) => dispatch =>
  api.clipboard.updateItem(id, itemId, body).then(item => {
    dispatch(itemUpdated(item, id));
  });

export const removeClipboardItem = (id, itemId) => dispatch =>
  api.clipboard.removeItem(id, itemId).then(() => {
    dispatch(itemRemoved(id, itemId));
  });

export const addClipboardItem = (id, title) => dispatch =>
  api.clipboard.addItem(id, title).then(item => dispatch(itemAdded(item, id)));

export const addClipboardLabel = body => dispatch =>
  api.clipboard.addLabel(body).then(label => dispatch(labelAdded(label)));

export const removeClipboardLabel = id => dispatch =>
  api.clipboard.removeLabel(id).then(() => dispatch(labelRemoved(id)));

export const updateClipboard = (id, body) => dispatch =>
  api.clipboard
    .update(id, body)
    .then(clipboard => dispatch(clipboardUpdated(clipboard)));

export const createClipboard = body => dispatch =>
  api.clipboard
    .create(body)
    .then(clipboard => dispatch(clipboardCreated(clipboard)));

export const removeClipboard = id => dispatch =>
  api.clipboard.remove(id).then(() => dispatch(clipboardRemoved(id)));
