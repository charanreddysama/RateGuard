import { v4 as uuidv4 } from "uuid";


// generate a unique API key using uuidv4

export const generateApiKey = () => {
  return uuidv4();
};