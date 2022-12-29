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
    return contacts.find((contact) => contact.id === String(contactId));
  } catch (error) {
    console.error("error", error);
  }
}

export async function removeContact(contactId) {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex(
      (contact) => contact.id === String(contactId)
    );
    contacts.splice(index, 1);

    await writeFile(contactsPath, JSON.stringify(contacts), "utf8");

    return contactId;
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
