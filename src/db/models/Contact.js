import { model, Schema, SchemaTypes } from "mongoose";
import { contactTypeList } from "../../constants/contacts.js";

const contactSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: String,
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      required: true,
      enum: contactTypeList,
      default: 'personal',
    },
    userId: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
      required: true,
    },
    photo: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ContactsCollection = model('contact', contactSchema);

export const sortFields = ['name', 'phoneNumber', 'email', 'isFavourite', 'contactType'];

export default ContactsCollection;