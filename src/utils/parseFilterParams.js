import { contactTypeList } from "../constants/contacts.js";

const parseType = type => {
  if (typeof type !== 'string') return;
  if (contactTypeList.includes(type)) return type;
};

const parseBoolean = isFavorite => {  
  if (typeof isFavorite !== 'string') return;
  if (isFavorite === 'true') return Boolean(1);
  if (isFavorite === 'false') return Boolean(0);
};


export const parseFilterParams = ({ type, isFavorite }) => {
  const parsedType = parseType(type);
  const parsedIsFavorite = parseBoolean(isFavorite);
  return {
    type: parsedType,
    isFavorite: parsedIsFavorite,
  };
  
};