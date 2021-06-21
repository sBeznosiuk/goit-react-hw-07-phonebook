import { createAction } from '@reduxjs/toolkit';

export const fetchContactsRequest = createAction(
  'contact/fetchContactsRequest',
);
export const fetchContactsSuccess = createAction(
  'contact/fetchContactsSuccess',
);
export const fetchContactsError = createAction('contact/fetchContactsError');

export const addContactRequest = createAction('contact/addContactRequest');
export const addContactSuccess = createAction('contact/addContactSuccess');
export const addContactError = createAction('contact/addContactError');

export const removeContactRequest = createAction(
  'contact/removeContactRequest',
);
export const removeContactSuccess = createAction(
  'contact/removeContactSuccess',
);
export const removeContactError = createAction('contact/removeContactError');

export const filterContacts = createAction('contact/Filter');
