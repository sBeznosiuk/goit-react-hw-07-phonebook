import PropTypes from 'prop-types';
import React from 'react';

const ContactListItem = ({ id, name, number, onClickRemove }) => (
  <li id={id}>
    {name}: {number}
    <button type="button" id={id} onClick={onClickRemove}>
      delete
    </button>
  </li>
);

ContactListItem.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  onClickRemove: PropTypes.func,
};

export default ContactListItem;
