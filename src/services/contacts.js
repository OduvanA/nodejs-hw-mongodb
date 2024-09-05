import ContactsCollection from "../db/models/Contact.js";

export const getAllContacts = () => ContactsCollection.find();

export const getContactById = id => ContactsCollection.findById(id);

export const createContact = payload => ContactsCollection.create(payload);

export const deleteContact = id => ContactsCollection.findOneAndDelete(id);

export const updateContact = async (id, data, options = {}) => {
  const rawResult = await ContactsCollection.findOneAndUpdate(
    id,
    data,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    });
  
  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};