import { Router } from "express";
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController, upsertContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import { addContactSchema, updateContactSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.post('/', validateBody(addContactSchema), ctrlWrapper(addContactController));
contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));
contactsRouter.put('/:id', isValidId,
  // validateBody(addContactSchema),
  ctrlWrapper(upsertContactController));
contactsRouter.patch('/:id', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));


export default contactsRouter;