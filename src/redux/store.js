import {
  combineReducers,
  configureStore,
  createReducer,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import axios from 'axios';
import logger from 'redux-logger';
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {
  filterContacts,
  addContactError,
  addContactSuccess,
  addContactRequest,
  removeContactError,
  removeContactRequest,
  removeContactSuccess,
  fetchContactsError,
  fetchContactsRequest,
  fetchContactsSuccess,
} from './actions';

// const contactsReducer = createReducer(
//   {
//     items: [],
//     filter: '',
//   },
//   {
//     [addContactSuccess]: (state, { payload }) => doesExist(state, payload),
//     [removeContactSuccess]: (state, { payload }) => ({
//       ...state,
//       items: state.items.filter(({ id }) => id !== payload),
//     }),

//     [filterContacts]: (state, { payload }) => ({
//       ...state,
//       filter: payload,
//     }),
//   },
// );

const itemsReducer = createReducer([], {
  [fetchContactsSuccess]: (state, { payload }) => payload,
  [addContactSuccess]: (state, { payload }) => doesExist(state, payload),
  [removeContactSuccess]: (state, { payload }) =>
    state.filter(({ id }) => id !== Number(payload)),
});

const filterReducer = createReducer('', {
  [filterContacts]: (_, { payload }) => payload,
});

const loading = createReducer(false, {
  [addContactRequest]: () => true,
  [addContactSuccess]: () => false,
  [addContactError]: () => false,
  [removeContactRequest]: () => true,
  [removeContactSuccess]: () => false,
  [removeContactError]: () => false,
  [fetchContactsRequest]: () => true,
  [fetchContactsSuccess]: () => false,
  [fetchContactsError]: () => false,
});

function doesExist(state, payload) {
  const doesExist = state.some(item => item.name === payload.name);

  if (doesExist) {
    alert(`${payload.name} is already in contacts.`);
  } else {
    return [...state, payload];
  }
}

const contactsReducer = combineReducers({
  items: itemsReducer,
  filter: filterReducer,
});

const rootReducer = combineReducers({
  contacts: contactsReducer,
  loading,
});

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);

export default store;
