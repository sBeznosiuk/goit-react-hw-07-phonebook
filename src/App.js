import React, { Component } from 'react';
import ContactList from './Components/ContactList';
import Filter from './Components/Filter';
import ContactForm from './Components/ContactForm';

class App extends Component {
  render() {
    return (
      <>
        <ContactForm />
        <h2>Contacts</h2>
        <Filter />
        <ContactList />
      </>
    );
  }
}

export default App;
