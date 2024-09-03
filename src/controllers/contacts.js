import * as contactsServices from '../services/contacts.js';
import createHttpError from 'http-errors';


export const getAllContactsController = async (req, res) => {
  const data = await contactsServices.getAllContacts();
  res.json({
    status: 200,
    message: 'Successfuly found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactsServices.getContactById(id);
  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};
