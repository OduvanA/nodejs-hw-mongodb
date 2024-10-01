import * as contactsServices from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import parseSortParams from '../utils/parseSortParams.js';
import { sortFields } from '../db/models/Contact.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';
import saveFileToCloudinary from '../utils/saveFileToCloudinary.js';


export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams({ ...req.query, sortFields });
  const filter = parseFilterParams(req.query);

  const { _id: userId } = req.user;

  const data = await contactsServices.getContacts({
    page, perPage, sortBy, sortOrder, filter: {...filter, userId},
  });
  
  res.json({
    status: 200,
    message: 'Successfuly found contacts!',
    data,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactsServices.getContact({_id: id, userId});
  if (!data) {
    next(createHttpError(404, `Contact with id=${id} not found`));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const addContactController = async (req, res) => {
  let photo;
  if (req.file) {
    photo = await saveFileToCloudinary(req.file, 'photos');
  }
  const { _id: userId } = req.user;
  const data = await contactsServices.createContact({ ...req.body, userId, photo });
  res.status(201).json({
    status: 201,
    message: 'Successfuly createrd a contact!',
    data,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const data = await contactsServices.deleteContact({_id: id, userId});

  if (!data) {
    next(createHttpError(404, `Contact with id=${id} not found`));
    return;
  }

  res.status(204).send();
};

export const upsertContactController = async (req, res) => {
  const { id } = req.params;
  const { _id: userId } = req.user;
  const {isNew, data} = await contactsServices.updateContact({_id: id, userId}, req.body, { upsert: true });

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfuly upserted a contact',
    data,
  });
};

export const patchContactController = async (req, res, next) => {
  let photo;
  if (req.file) {
    photo = await saveFileToCloudinary(req.file, 'photos');
  }
  
  const { id } = req.params;
  const { _id: userId } = req.user;
  const result = await contactsServices.updateContact({ _id: id, userId }, { ...req.body, photo });
  
  if (!result) {
    next(createHttpError(404, `Contact with id=${id} not found`));
    return;
  }


  res.json({
    status: 200,
    message: 'Successfuly updated a contact',
    data: result.data,
  });

};
