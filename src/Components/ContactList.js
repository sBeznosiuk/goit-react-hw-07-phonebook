import PropTypes from 'prop-types';
import React, { Component } from 'react';
import ContactListItem from './ContactListItem';
import { StyledList } from './styles';
import { connect } from 'react-redux';
import { removeContact, fetchContacts } from '../redux/operations';
import Loader from 'react-loader-spinner';
import {
  getLoading,
  getContacts,
  getFilter,
} from '../redux/contacts-selectors';

class ContactList extends Component {
  componentDidMount() {
    this.props.onLoadingFetchContacts();
  }

  render() {
    const renderItems = () => {
      if (this.props.filter) {
        return this.props.contacts.map(
          contact =>
            contact.name.toLowerCase().includes(this.props.filter) && (
              <ContactListItem
                onClickRemove={this.props.onRemoveContact}
                key={contact.id}
                id={contact.id}
                name={contact.name}
                number={contact.number}
              />
            ),
        );
      } else {
        return this.props.contacts.map(contact => (
          <ContactListItem
            onClickRemove={this.props.onRemoveContact}
            key={contact.id}
            id={contact.id}
            name={contact.name}
            number={contact.number}
          />
        ));
      }
    };
    return (
      <>
        {this.props.isLoading && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        )}
        <StyledList>{renderItems()}</StyledList>
      </>
    );
  }
}
ContactList.propTypes = {
  filter: PropTypes.string,
  onClickRemove: PropTypes.func,
};

const mapStateToProps = state => ({
  contacts: getContacts(state),
  filter: getFilter(state),
  isLoading: getLoading(state),
});

const mapDispatchToProps = dispatch => ({
  onRemoveContact: e => dispatch(removeContact(e.target.id)),
  onLoadingFetchContacts: () => dispatch(fetchContacts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ContactList);
