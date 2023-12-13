import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { AppWrap } from './GlobalStyled';
import { Filter } from './Filter';
import { ContactsList } from './ContactList/ContactList';

const storageKey = 'storage-key';

export const App = () => {
  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);

  const [filter, setFilter] = useState('');

  useEffect(() => {
    const savedContacts = localStorage.getItem(storageKey);
    if (savedContacts !== null) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(contacts), [contacts]);
  });

  const updateFilter = newFilter => {
    setFilter(newFilter);
  };

  const addContact = newContact => {
    const isNameAdded = contacts.some(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );
    if (isNameAdded) {
      alert(`${newContact.name} is already in your contacts!`);
    } else {
      const contact = {
        ...newContact,
        id: nanoid(),
      };
      setContacts(prevContacts => [...prevContacts, contact]);
    }
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(item => item.id !== contactId)
    );
  };

  const visibleContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <AppWrap>
      <h1>Phonebook</h1>
      <ContactForm onAdd={addContact}></ContactForm>
      <h2>Contacts</h2>
      <Filter filter={filter} onUpdate={updateFilter} />
      {<ContactsList items={visibleContacts} onDelete={deleteContact} />}
    </AppWrap>
  );
};
