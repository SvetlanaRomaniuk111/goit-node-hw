const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const res = contacts.find(({ id }) => id === contactId);
  return res || null;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts(); 
  const res = contacts.find(({ id }) => id === contactId);
  res
    && await fs.writeFile(
      contactsPath,
      JSON.stringify(contacts.filter(({ id }) => id !== contactId), null, 2)
    );
  return res || null;
};

const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

module.exports = { listContacts, getContactById, removeContact, addContact }