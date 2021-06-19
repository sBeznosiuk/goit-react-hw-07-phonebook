import { createAction } from '@reduxjs/toolkit';

export const addContact = createAction('contact/Add');

export const removeContact = createAction('contact/Remove');

export const filterContacts = createAction('contact/Filter');
