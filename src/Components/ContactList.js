import PropTypes from 'prop-types';
import React from 'react';
import ContactListItem from './ContactListItem';
import { StyledList } from './styles';
import { connect } from 'react-redux';
import { removeContact } from '../redux/actions';

const ContactList = ({ contacts, filter, onRemoveContact }) => {
  const renderItems = () => {
    if (filter) {
      return contacts.map(
        contact =>
          contact.name.toLowerCase().includes(filter) && (
            <ContactListItem
              onClickRemove={onRemoveContact}
              key={contact.id}
              id={contact.id}
              name={contact.name}
              number={contact.number}
            />
          ),
      );
    } else {
      return contacts.map(contact => (
        <ContactListItem
          onClickRemove={onRemoveContact}
          key={contact.id}
          id={contact.id}
          name={contact.name}
          number={contact.number}
        />
      ));
    }
  };

  return <StyledList>{renderItems()}</StyledList>;
};

ContactList.propTypes = {
  filter: PropTypes.string,
  onClickRemove: PropTypes.func,
};

const mapStateToProps = state => ({
  contacts: state.contacts.items,
  filter: state.contacts.filter && state.contacts.filter.toLowerCase(),
});

const mapDispatchToProps = dispatch => ({
  onRemoveContact: e => dispatch(removeContact(e.target.id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
