const fs = require("fs");
const path = require("path");
const FsPromises = fs.promises;
const { v4: uuidv4 } = require("uuid");

// Раскомментируй и запиши значение
const contactsPath = path.join(__dirname, "./db/contacts.json");

// TODO: задокументировать каждую функцию
async function listContacts() {
  // ...твой код
  try {
    const contacts = await FsPromises.readFile(contactsPath, "utf-8");
    return JSON.parse(contacts);
  } catch (error) {
    console.error(error.message);
  }
}

async function getContactById(contactId) {
  // ...твой код
  try {
    const contacts = await listContacts();
    const getContact = contacts.find((contact) => contact.id === contactId);
    return getContact;
  } catch (error) {
    console.error(error.message);
  }
}

async function removeContact(contactId) {
  // ...твой код
  try {
    const contacts = await listContacts();
    const deleteContact = contacts.filter(
      (contact) => contact.id !== contactId
    );
    const stringifiedDeletedContact = JSON.stringify(deleteContact);
    await FsPromises.writeFile(contactsPath, stringifiedDeletedContact);
    return deleteContact;
  } catch (error) {
    console.error(error.message);
  }
}

async function addContact(name, email, phone) {
  // ...твой код
  try {
    const contacts = await listContacts();
    const createContact = { id: uuidv4(), name, email, phone };
    const newListContacts = [...contacts, createContact];
    const stringifiedCreatedContact = JSON.stringify(newListContacts);
    await FsPromises.writeFile(contactsPath, stringifiedCreatedContact);
    return newListContacts;
  } catch (error) {
    console.error(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
