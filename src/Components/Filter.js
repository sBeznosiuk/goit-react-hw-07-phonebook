import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { filterContacts } from '../redux/actions';

const Filter = ({ onFilter }) => {
  return (
    <input type="text" placeholder="Find contact by name" onChange={onFilter} />
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  onFilter: e => dispatch(filterContacts(e.target.value)),
});

export default connect(null, mapDispatchToProps)(Filter);
