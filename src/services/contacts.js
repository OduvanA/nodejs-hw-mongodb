import { SORT_ORDER } from "../constants/index.js";
import ContactsCollection from "../db/models/Contact.js";
import calculatePaginationData from "../utils/calculatePaginationData.js";

export const getContacts = async ({
  page, perPage, sortBy = '_id', sortOrder = SORT_ORDER[0], filter = {},
  }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const contactsQuery = ContactsCollection.find();

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  };
  if (filter.isFavorite) {
    contactsQuery.where('isFavourite').equals(filter.isFavorite);
  };
 
  const [contactsCount, contacts] = await Promise.all([
    ContactsCollection.find().merge(contactsQuery).countDocuments(),
    contactsQuery.skip(skip).limit(limit).sort({ [sortBy]: sortOrder }).exec()]);
  
  const paginationData = calculatePaginationData(contactsCount, perPage, page);
  return {
    data: contacts,
    ...paginationData,
  };
};

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