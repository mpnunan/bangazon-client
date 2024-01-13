import bangarang from '../axiosConfig';

const getAllItems = async () => {
  const items = await bangarang.get('/items');
  return Object.values(items.data);
};

const getSingleItem = async (id) => {
  const item = await bangarang.get(`/items/${id}`);
  return item.data;
};

const createItem = async (payload) => {
  const newItem = await bangarang.post('/items', payload);
  return newItem.data;
};

const updateItem = async (id, payload) => {
  const updatedItem = await bangarang.put(`/items/${id}`, payload);
  return updatedItem.data;
};

const deleteItem = async (id) => {
  const deletedItem = await bangarang.delete(`/items/${id}`);
  return deletedItem.data;
};

export {
  getAllItems,
  getSingleItem,
  createItem,
  updateItem,
  deleteItem,
};
