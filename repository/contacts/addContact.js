import Contact from '../../model/contact'

export const addContact = async (userId, body ) => { 
  console.log(userId, body);
  const result = await Contact.create({ ...body, owner: userId })
  return result
};