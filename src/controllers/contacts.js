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

export const addContactController = async (req, res) => {
  const data = await contactsServices.createContact(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfuly createrd contact',
    data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id } = req.params;
  const data = await contactsServices.deleteContact(id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const {result} = await contactsServices.updateContact({ _id: id }, req.body, { upsert: true });

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfuly upserted a contact',
    data: result.data,
  });
};

export const patchContactController = async (req, res) => {
  const { id } = req.params;
  const { result } = await contactsServices.updateContact({ _id: id }, req.body);
  
  if (!result) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }


  res.json({
    status: 200,
    message: 'Successfuly updated contact',
    data: result.data,
  });

};
