import axios from 'axios';
import {
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

axios.defaults.baseURL = 'http://localhost:4040';

export const fetchContacts = () => async dispatch => {
  dispatch(fetchContactsRequest());

  try {
    const { data } = await axios.get('/items');

    dispatch(fetchContactsSuccess(data));
  } catch (error) {
    dispatch(fetchContactsError(error));
  }

  // axios
  //   .get('/items')
  //   .then(({ data }) => dispatch(fetchContactsSuccess(data)))
  //   .catch(error => dispatch(fetchContactsError(error)));
};

export const addContact = contact => dispatch => {
  dispatch(addContactRequest());

  axios
    .post('/items', contact)
    .then(({ data }) => dispatch(addContactSuccess(data)))
    .catch(error => dispatch(addContactError(error)));
};

export const removeContact = contactId => dispatch => {
  dispatch(removeContactRequest());

  axios
    .delete(`/items/${contactId}`)
    .then(() => dispatch(removeContactSuccess(contactId)))
    .catch(error => removeContactError(error));
};
