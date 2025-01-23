import { v4 as uuidv4 } from 'uuid';

type RefRegistry = Map<string, any>;

const refRegistry: RefRegistry = new Map();

export const registerRef = (ref: any): string => {
  console.log("Creating ref...")
  const id = uuidv4();
  refRegistry.set(id, ref);
  return id;
};

export const getRef = (id: string): any | undefined => {
  return refRegistry.get(id);
};

export const getAllRefs = () => {
  console.log("All refs:");
  refRegistry.forEach((value, key) => {
    console.log(`ID: ${key}, Value:`, value);
  });
};

export const removeRef = (id: string): void => {
  console.log("Removing ref...")
  refRegistry.delete(id);
};