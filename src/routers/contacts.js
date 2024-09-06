import { Router } from "express";
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController, upsertContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";

const contactsRouter = Router();

contactsRouter.get('/contacts', ctrlWrapper(getAllContactsController));
contactsRouter.get('/contacts/:id', ctrlWrapper(getContactByIdController));
contactsRouter.post('/contacts', ctrlWrapper(addContactController));
contactsRouter.delete('/contacts/:id', ctrlWrapper(deleteContactController));
contactsRouter.put('/contacts/:id', ctrlWrapper(upsertContactController));
contactsRouter.patch('/contacts/:id', ctrlWrapper(patchContactController));


export default contactsRouter;