import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";

const contactsPath = resolve("./db/contacts.json");

export async function listContacts() {
  try {
    const contactsList = await readFile(contactsPath, "utf8");
    return JSON.parse(contactsList);
  } catch (error) {
    console.error("error", error);
  }
}

export async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const contactById = contacts.find(
      (contact) => contact.id === String(contactId)
    );

    return contactById;
  } catch (error) {
    console.error("error", error);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const deletedContact = await getContactById(contactId);
    let newContactList;
    if (deletedContact) {
      newContactList = contacts.filter(
        (contact) => contact.id !== String(contactId)
      );
    } else return "Contact is not found";

    await writeFile(contactsPath, JSON.stringify(newContactList), "utf8");

    return deletedContact;
  } catch (error) {
    console.error("error", error);
  }
}

export async function addContact(name, email, phone) {
  try {
    const contacts = await listContacts();
    const newContact = { id: String(Date.now()), name, email, phone };
    contacts.push(newContact);

    await writeFile(contactsPath, JSON.stringify(contacts), "utf8");
    return newContact;
  } catch (error) {
    console.log("error", error);
  }
}
