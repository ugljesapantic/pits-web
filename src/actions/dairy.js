import {
  DAIRY_UPDATED,
  DAIRY_LOADED_ALL,
  DAIRY_CREATED,
  DAIRY_REMOVED,
  DAIRY_LOAD
} from '../types';
import api from '../api';

export const dairyLoadedAll = dairies => ({
  type: DAIRY_LOADED_ALL,
  dairies
});

export const dairyLoad = () => ({
  type: DAIRY_LOAD
});

export const dairyUpdated = dairy => ({
  type: DAIRY_UPDATED,
  dairy
});

export const dairyCreated = dairy => ({
  type: DAIRY_CREATED,
  dairy
});

export const dairyRemoved = id => ({
  type: DAIRY_REMOVED,
  id
});

export const loadAllDairies = date => dispatch => {
  dispatch(dairyLoad());
  return api.dairy
    .loadAll(date)
    .then(dairies => dispatch(dairyLoadedAll(dairies)));
};

export const updateDairy = (id, body) => dispatch =>
  api.dairy.update(id, body).then(dairy => dispatch(dairyUpdated(dairy)));

export const createDairy = body => dispatch =>
  api.dairy.create(body).then(dairy => dispatch(dairyCreated(dairy)));

export const removeDairy = id => dispatch =>
  api.dairy.remove(id).then(() => dispatch(dairyRemoved(id)));
