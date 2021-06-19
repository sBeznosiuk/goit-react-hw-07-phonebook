import {
  combineReducers,
  configureStore,
  createReducer,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import logger from 'redux-logger';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { addContact, removeContact, filterContacts } from './actions';

const persistConfig = {
  key: 'Contacts',
  storage,
};

const contactsReducer = createReducer(
  {
    items: [],
    filter: '',
  },
  {
    [addContact]: (state, { payload }) => doesExist(state, payload),
    [removeContact]: (state, { payload }) => ({
      items: [...state.items.filter(i => i.id !== payload)],
    }),

    [filterContacts]: (state, { payload }) => ({
      ...state,
      filter: payload,
    }),
  },
);

// const itemsReducer = createReducer([], {
//   [addContact]: (state, { payload }) => doesExist(state, payload),
//   [removeContact]: (state, { payload }) => [
//     ...state.filter(i => i.id !== payload),
//   ],
// });

// const filterReducer = createReducer('', {
//   [filterContacts]: (_, { payload }) => payload,
// });

function doesExist(state, payload) {
  const doesExist = state.items.some(item => item.name === payload.name);

  if (doesExist) {
    alert(`${payload.name} is already in contacts.`);
  } else {
    return {
      ...state,
      items: [...state.items, payload],
    };
  }
}

const rootReducer = combineReducers({
  contacts: contactsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV === 'development',
  middleware,
});

const persistor = persistStore(store);

export { store, persistor };
