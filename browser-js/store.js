import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'redux-logger';
import axios from 'axios'


//types of actions
const LOADED_ALL_FICS_FROM_DATABASE = 'LOADED_ALL_FICS_FROM_DATABASE';
const FIC_LOADED = 'FIC_LOADED';
const ENTRY_ADDED = 'ENTRY_ADDED';
const FIC_EDITED = 'FIC_EDITED';
const FIC_DELETED = 'FIC_DELETED';
const ENTRY_DELETED = 'ENTRY_DELETED';
const CHANGED_FIC_FORM = 'CHANGED_FIC_FORM';

const initialState = {
  fics: [],
  entries: [],
  currentFicBeingAdded: {
    startingWordcount: 0,
    title: '',
    status: 'in-progress'
  }
}

const reducer = (prevState = initialState, action) => {
  const newState = Object.assign({}, prevState);
  let index, id;
  switch (action.type) {
    case CHANGED_FIC_FORM:
      newState.currentFicBeingAdded = action.fic;
      return newState;
    case FIC_LOADED:
      newState.fics = [...prevState.fics, action.fic]
      return newState;
    case ENTRY_ADDED:
      newState.entries = [...prevState.entries, action.entry]
      return newState;
    case FIC_EDITED:
      newState.fics = [...newState.fics];
      id = action.fic.id;
      index = newState.fics.findIndex((fic) => fic.id === id);
      newState.fics[index] = action.fic;
      return newState;
    case FIC_DELETED:
      index = newState.fics.findIndex((fic) => fic.id === action.ficId);
      newState.fics = prevState.slice(0, index);
      newState.fics = newState.fics.concat(prevState.slice(index + 1));
      return newState;
    case LOADED_ALL_FICS_FROM_DATABASE:
      newState.fics = action.fics;
      return newState;
    default:
      return prevState;
  }
}
export const changeFicForm = (fic) => {
  return {
    type: CHANGED_FIC_FORM,
    fic: fic
  }
}
export const loadedAllFics = (fics) => {
  return {
    type: LOADED_ALL_FICS_FROM_DATABASE,
    fics: fics
  }
}
export const ficEdited = (fic) => {
  return {
    type: FIC_EDITED,
    fic: fic
  }
}
export const loadedFic = (fic) => {
  return {
    type: FIC_LOADED,
    fic: fic
  }
}
export const ficDeleted = (ficId) => {
  return {
    type: FIC_DELETED,
    ficId: ficId
  }
}
export const entryAdded = (entry) => {
  return {
    type: ENTRY_ADDED,
    entry: entry
  }
}
export const entryDeleted = (entryId) => {
  return {
    type: ENTRY_DELETED,
    entryId: entryId
  }
}

const store = createStore(reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(loggerMiddleware, thunkMiddleware));
export default store;


export const loadAllFics = () => {

  return (dispatch) => {
      axios.get('/api/fics')
    .then(response => response.data)
    .then(fics => {
      dispatch(loadedAllFics(fics));
    })
    .catch(console.error.bind(console));
  }

}

export const postFic = () => {
  const fic = store.getState().currentFicBeingAdded;
    return (dispatch) => {
        axios.post('/api/fics/add', fic)
      .then(response => response.data)
      .then(ficWeJustLoaded => {
        dispatch(loadedFic(ficWeJustLoaded));
      })
      .catch(console.error.bind(console));
    }

  }
