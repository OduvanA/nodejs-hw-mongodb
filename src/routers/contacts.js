import { Router } from "express";
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController, upsertContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import { addContactSchema, updateContactSchema } from "../validation/contacts.js";

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));
contactsRouter.get('/contacts/:id', isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.post('/contacts', validateBody(addContactSchema), ctrlWrapper(addContactController));
contactsRouter.delete('/contacts/:id', isValidId, ctrlWrapper(deleteContactController));
contactsRouter.put('/contacts/:id', isValidId,
  // validateBody(addContactSchema),
  ctrlWrapper(upsertContactController));
contactsRouter.patch('/contacts/:id', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));


export default contactsRouter;