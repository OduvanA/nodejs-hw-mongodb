import { Router } from "express";
import { addContactController, deleteContactController, getAllContactsController, getContactByIdController, patchContactController, upsertContactController } from "../controllers/contacts.js";
import ctrlWrapper from "../utils/ctrlWrapper.js";
import validateBody from "../middlewares/validateBody.js";
import isValidId from "../middlewares/isValidId.js";
import { addContactSchema, updateContactSchema } from "../validation/contacts.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', ctrlWrapper(getAllContactsController));
contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController));
contactsRouter.post('/', upload.single('photo'), validateBody(addContactSchema), ctrlWrapper(addContactController));
contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController));
contactsRouter.put('/:id', isValidId, validateBody(addContactSchema), ctrlWrapper(upsertContactController));
contactsRouter.patch('/:id', upload.single('photo'), isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController));


export default contactsRouter;